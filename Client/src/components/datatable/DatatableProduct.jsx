import "./datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { productsColumns } from "../../datatablesourceProduct";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts, GetServices, showModal } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import WarningCloseSession from "../Forms/WarningCloseSession"
import AddProduct from "../Forms/AddProduct"
import UpdateProduct from "../Forms/UpdateProduct"
import DeleteProduct from "../Forms/DeleteProduct"


const DatatableProducts = () => {
  const products = useSelector((state) => state.products);
  const activeModal = useSelector((state) => state.modal);
  const [itemData, setItemData] = useState({});
  const dispatch = useDispatch()
  
        const handleModalProductPost = (token) => {
        dispatch(showModal("Add Product"));
        setItemData({token});
    }; 
        const handleModalDelete = (id,params) => {
        dispatch(showModal("Delete Product"));
        setItemData({
            params,
            id
        });
    };

            const handleModalUpdate = (params, id) => {
        dispatch(showModal("Update Product"));
        setItemData({
            params,
            id
        });
    };

      useEffect(() => {
        dispatch(getProducts()).catch((error) => console.log(error))
        dispatch(GetServices()).catch((error) => console.log(error))
    }, []);


  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
            <div className="cellAction">
               
               <div
              className="viewButton"
            >
                <Link to={`profiles/${params.id}`} style={{ textDecoration: "none" }}>
                  profiles
                </Link>
              </div>
            <div
              className="deleteButton"
              onClick={() => handleModalDelete(params.id, params)}
            >
              Delete
            </div>
            <div
              className="updateButton"
              onClick={() => handleModalUpdate(params.id,params)}
            >
              update
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Lista de Productos
        <Link className="link" onClick={() => handleModalProductPost()}>
          Agregar Producto
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={products}
        columns={productsColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
            {activeModal.active && (
                <Modal>
                    {activeModal.name === "Warning Close Session" && (
                        <WarningCloseSession />
                    )}
                        {activeModal.name === "Add Product" && (
                        <AddProduct  data={itemData}/>
                    )}
                        {activeModal.name === "Update Product" && (
                        <UpdateProduct  data={itemData}/>
                    )}
                        {activeModal.name === "Delete Product" && (
                        <DeleteProduct  data={itemData}/>
                    )}
                </Modal>
            )}
    </div>
    
    
  );
};

export default DatatableProducts;
