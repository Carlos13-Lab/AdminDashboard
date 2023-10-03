import "./datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { ServicesColumns } from "../../datatablesourceServices";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetServices, showModal } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import WarningCloseSession from "../Forms/WarningCloseSession"
import AddServices from "../Forms/AddServices"
import UpdateServices from "../Forms/UpdateServices"
import DeleteServices from "../Forms/DeleteServices"


const DatatableServices = () => {
  const services = useSelector((state) => state.services );
  const activeModal = useSelector((state) => state.modal);
  const [itemData, setItemData] = useState({});
  const dispatch = useDispatch()
  
        const handleModalProductPost = (token) => {
        dispatch(showModal("Add Services"));
        setItemData({ token });
    }; 
        const handleModalDelete = (id,params) => {
        dispatch(showModal("Delete Services"));
        setItemData({
            params,
            id
        });
             console.log(params, id)
    };

            const handleModalUpdate = (params, id) => {
        dispatch(showModal("Update Services"));
        setItemData({
            params,
            id
        });
    };

      useEffect(() => {
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
            <Link handleModalPost>
              <div className="viewButton">View</div>

            </Link>
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
        Lista de Servicio
        <Link className="link" onClick={() => handleModalProductPost()}>
          Agregar Servicio
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={services}
        columns={ServicesColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
            {activeModal.active && (
                <Modal>
                    {activeModal.name === "Warning Close Session" && (
                        <WarningCloseSession />
                    )}
                        {activeModal.name === "Add Services" && (
                        <AddServices  data={itemData}/>
                    )}
                        {activeModal.name === "Update Services" && (
                        <UpdateServices  data={itemData}/>
                    )}
                        {activeModal.name === "Delete Services" && (
                        <DeleteServices  data={itemData}/>
                    )}
                </Modal>
            )}
    </div>
    
    
  );
};

export default DatatableServices;
