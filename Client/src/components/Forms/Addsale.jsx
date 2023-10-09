import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideModal, addSale } from "../../redux/actions";
import "../../style/addUsers.css";
import { Fragment } from "react";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



const AddSales = () => {
  const products = useSelector((state) => state.products);
  const productActive = products.filter((product) => product.status === true)
  const users = useSelector((state) => state.users);
  const userClient = users.filter((user) => user.role === "client");
  const userClientActive = userClient.filter((user) => user.active === true);
  const user = useSelector((state) => state.user);
  console.log(productActive)

  console.log(user);
  const dispatch = useDispatch();
  const [sale, setSale] = useState({
    saleDate: "",
    price: "",
    status: true,
    Info: [],
    clientId: [], 
    sellerId: []
  });

  const cancel = (event) => {
    event.preventDefault();
    try {
      dispatch(hideModal());
    } catch (error) {
      console.log(error);
    }
  };

  const _handleChange = ({ target: { name, value } }) => {
    setSale((prev) => ({ ...prev, [name]: value }));
  };
    const _handleDateChange = (date) => {
    setSale((prev) => ({ ...prev, saleDate: date }));
  };


const _handleSelectInfo = (event) => {
  const { value, checked } = event.target;
  setSale((prev) => {
    let info = prev.Info;
    if (checked && !info.includes(value)) {
      info.push(value);
      console.log(value)
    }
    if (!checked) {
      info = info.filter((item) => item !== value);
    }
    return {
      ...prev,
      Info: info,
    };
  });
};

const _handleSelect = (event) => {
  const { value, checked } = event.target;
  setSale((prev) => {
    let client = prev.clientId;
    if (checked && !client.includes(value)) {
      client.push(value);
      console.log(value)
    }
    if (!checked) {
      client = client.filter((item) => item !== value);
    }
    return {
      ...prev,
      clientId: client,
    };
  });
};



const _handleSubmit = async (e, data) => {
  e.preventDefault();
  data = {
    ...sale,
    sellerId: [...sale.sellerId, user.user.id] // Add user.user.id to the seller array
  };
  console.log(data.sellerId)
  try {
    await dispatch(addSale(data));
    dispatch(hideModal());
    Swal.fire(
      '¡Listo! ¡Tu venta ha sido agregada!',
      '¡Pulsa el botón para terminar el proceso!',
      'Terminar'
    );
  } catch (error) {
    console.log(error.message);
  }
};



  return (
    <form className="addUsers" onSubmit={(e) => _handleSubmit(e, sale)}>
      <div className="addUsers-input">
                    <span>
          <strong>Precio de venta:</strong>
        </span>
      <input
        className="addUsers-input"
        name="price"
        onChange={_handleChange}
        value={sale.price}
        placeholder="Precio"
        
      />
      </div>
      <div  className="addUsers-input">
            <span>
          <strong>Fecha de venta:</strong>
        </span>
        <DatePicker
          showIcon
          selected={sale.saleDate}
          onChange={_handleDateChange}
          className="addUsers-input"
          placeholderText="Fecha"
        />
      </div>
    
      <div className="addUsers-input">
        <span>
          <strong>Productos :</strong>{" "}
        </span>
        {productActive
          ? productActive.map((product) => {
              return (
                <Fragment key={product.id}>
                  <label htmlFor={product.email}>
                    <input
                      type="checkbox"
                      id={product.id}
                      name="Producto"
                      value={product.id}
                      onChange={_handleSelectInfo}
                    />
                    {product.email}
                  </label>
                </Fragment>
              );
            })
          : ""}
      </div>
      <div className="addUsers-input">
        <span>
          <strong>Clientes :</strong>{" "}
        </span>
        {userClientActive
          ? userClientActive.map((user) => {
              return (
                <Fragment key={user.id}>
                  <label htmlFor={user.userName}>
                    <input
                      type="checkbox"
                      id={user.id}
                      name="Producto"
                      value={user.id}
                      onChange={_handleSelect}
                    />
                    {user.userName}
                  </label>
                </Fragment>
              );
            })
          : ""}
      </div>

      <button className="addUsers-button" type="submit">
        <strong>Crear</strong>
      </button>
      <button className="addUsers-button cancel-button" onClick={cancel}>
        <strong>Cancelar</strong>
      </button>
    </form>
  );
};

export default AddSales;
