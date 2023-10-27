const SaleRepository = require("../repository/sale.repository");
const UserService = require("../services/user.service");
const ProductService = require("./product.service");

class SaleService {
  constructor() {
    this.repository = new SaleRepository();
    this.userService = new UserService();
    this.productService = new ProductService();
    this.getSale = this.getSale.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.getById = this.getById.bind(this);
  }

  async update(saleDto) {
    try {
      const update = await this.repository.update(saleDto);
      return update;
    } catch (error) {
      throw error;
    }
  }

  async create(saleDto) {
    try {
      const { client, seller, product } = saleDto;

      const productFound = await this.productService.findById(product.id);
      if (!productFound) {
        throw new Error("Product Not Found");
      }
      const clientFound = await this.userService.find(client);
      if (!clientFound) {
        throw new Error("Client Not Found");
      }
      const sellerFound = await this.userService.find(seller);
      if (!sellerFound) {
        throw new Error("Seller Not Found");
      }

      const sale = {
        ...saleDto,
        client: client.id,
        seller: seller.id,
        product: product.id,
      };

      const saleCreated = await this.repository.create(sale);

      clientFound.product.push(productFound.id);

      sellerFound.sale.push(saleCreated.id);

      await this.userService.update(clientFound);
      await this.userService.update(sellerFound);

      return saleCreated;
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      const sale = await this.repository.findById(id);
      return sale;
    } catch (error) {
      throw error;
    }
  }

  async getSale(page, quantity) {
    try {
      return await this.repository.findPaginated(page, quantity);
    } catch (error) {
      throw error;
    }
  }

  async delete(saleDto) {
    try {
      const clientFound = await this.userService.find(saleDto.client);
      const productFound = await this.productService.findById(saleDto.product);

      if (clientFound) {
        clientFound.product = clientFound.product.filter(
          (InfoId) => InfoId.toString() !== productFound.id.toString()
        );
        await this.userService.update(clientFound);
      }

      const sellerFound = await this.userService.find(saleDto.seller);

      if (sellerFound) {
        sellerFound.sale = sellerFound.sale.filter(
          (sale) => sale.id !== saleDto.id
        );
        await this.userService.update(sellerFound);
      }

      return await this.repository.delete(saleDto.id);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = SaleService;
