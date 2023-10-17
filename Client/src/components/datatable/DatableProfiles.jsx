import "./datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { profilesColumns } from "../../datatablesourceProfiles";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts,getProfiles, showModal } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import WarningCloseSession from "../Forms/WarningCloseSession"
import AddProfiles from "../Forms/AddProfiles";
import UpdateProfiles from "../Forms/UpdateProfiles";
import DeleteProfiles from "../Forms/DeleteProfiles";


const DatatableProfiles = () => {
  const { id } = useParams();
  const profiles = useSelector((state) => state.profiles);
  const profilesArray = Object.values(profiles);
  const filteredProfiles = profilesArray.filter(item => item.product[0]._id === id) 
  const activeModal = useSelector((state) => state.modal);
  const [itemData, setItemData] = useState({});
  const dispatch = useDispatch()
  console.log(filteredProfiles)
  console.log(profiles)


        const handleModalPost = () => {
        dispatch(showModal("Add Profiles"));
        setItemData();
    }; 
        const handleModalDelete = (id) => {
        dispatch(showModal("Delete Profiles"));
        setItemData({
        
            id
        });
    };

            const handleModalUpdate = (params, id) => {
        dispatch(showModal("Update Profiles"));
        setItemData({
            params,
            id
        });
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
            <div
              className="deleteButton"
               onClick={() => handleModalDelete(params.id,params)}
            >
              Delete
            </div>
            <div
              className="updateButton"
               onClick={() => handleModalUpdate(params.id,params)}
            >
             Update
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Lista de Perfiles
        <Link className="link"  onClick={() => handleModalPost()}>
          Agregar Perfil
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={filteredProfiles}
        columns={profilesColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
            {activeModal.active && (
                  <Modal>
                    {activeModal.name === "Warning Close Session" && (
                        <WarningCloseSession />
                    )}
                        {activeModal.name === "Add Profiles" && (
                        <AddProfiles  data={itemData}/>
                    )}
                        {activeModal.name === "Update Profiles" && (
                        <UpdateProfiles  data={itemData}/>
                    )}
                             {activeModal.name === "Delete Profiles" && (
                        <DeleteProfiles  data={itemData}/>
                    )}
                </Modal>
            )}
    </div>
    
    
  );
};

export default DatatableProfiles;
