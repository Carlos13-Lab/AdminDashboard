import "./datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { productsColumns } from "../../datatablesourceProduct";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts,getProfiles } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import WarningCloseSession from "../Forms/WarningCloseSession"



const DatatableProfiles = () => {
  const profiles = useSelector((state) => state.profiles );
  const activeModal = useSelector((state) => state.modal);
  const dispatch = useDispatch()
  
  
  const handleDelete = (id) => {

  };
      useEffect(() => {
        dispatch(getProducts()).catch((error) => console.log(error))
        dispatch(getProfiles()).catch((error) => console.log(error))
    }, []);


  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
            >
              Delete
            </div>
                        <div
              className="viewButton"
            >
             Profiles
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
        <Link to="/users/new" className="link">
          Agregar Producto
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={profiles}
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
                </Modal>
            )}
    </div>
    
    
  );
};

export default DatatableProfiles;
