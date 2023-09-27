import "./datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { UserColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts, getUsers, showModal } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import WarningCloseSession from "../Forms/WarningCloseSession"
import AddUsers from "../Forms/AddUser";
import DeleteUser from "../Forms/DeleteUser";
import UpdateUser from "../Forms/UpdateUser";


const Datatable = () => {
  const users = useSelector((state) => state.users );
  const user = useSelector((state) => state.user );
  const usersClients = users.filter((user) => user.role === "client")
  const activeModal = useSelector((state) => state.modal);
  const [itemData, setItemData] = useState({});
  const dispatch = useDispatch()
  
      const handleModalPost = (token) => {
        dispatch(showModal("Add User"));
        setItemData({ token });
    }; 

      const handleModalDelete = (params, id) => {
        dispatch(showModal("Delete User"));
        setItemData({
            params,
            id
        });
    };

        const handleModalUpdate= (params, id) => {
        dispatch(showModal("Update User"));
        setItemData({
            params,
            id
        });
    };

      useEffect(() => {
        dispatch(getUsers()).catch((error) => console.log(error))
        dispatch(getProducts()).catch((error) => console.log(error))
    }, []);



  const actionColumn = [
    {
      field: "Acción",
      width: 200,
      renderCell: (params) => {
        console.log(params.rows)
        return (
          
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleModalDelete(params, params.id)}
            >
              Delete
            </div>
            <div
              className="updateButton"
              onClick={() => handleModalUpdate(params, params.id)}
            >
              Update
            </div>,
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Lista de Usuarios
        <Link
        onClick={() => handleModalPost(user.token)}
        className="link">
          Agregar Usuarios
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={usersClients}
        columns={UserColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
                {activeModal.active && (
                <Modal>
                    {activeModal.name === "Warning Close Session" && (
                        <WarningCloseSession />
                    )},
                    {activeModal.name === "Add User" && (
                        <AddUsers data={itemData} />
                    )}
                        {activeModal.name === "Delete User" && (
                        <DeleteUser data={itemData} />
                    )}
                        {activeModal.name === "Update User" && (
                        <UpdateUser data={itemData} />
                    )}
                </Modal>
            )}
    </div>
    
    
  );
};

export default Datatable;
