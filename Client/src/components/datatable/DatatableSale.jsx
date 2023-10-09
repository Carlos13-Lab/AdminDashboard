import "./datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { salesColumns } from "../../datatablesourceSale";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSales, getUsers, showModal } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import WarningCloseSession from "../Forms/WarningCloseSession"
import AddSale from "../Forms/Addsale"
import UpdateSale from "../Forms/UpdateServices"
import DeleteSale from "../Forms/DeleteServices"


const DatatableSale = () => {
const sale = useSelector((state) => state.sales);
const userSeller = useSelector((state) => state.user.user);
const saleArray = Object.values(sale);
const filteredSale = saleArray.filter((item) => item.sellerId.id === userSeller._id);


  const activeModal = useSelector((state) => state.modal);
  const [itemData, setItemData] = useState({});
  const dispatch = useDispatch()
  
        const handleModalPost = (token) => {
        dispatch(showModal("Add Sale"));
        setItemData({ token });
    }; 
        const handleModalDelete = (id,params) => {
        dispatch(showModal("Delete Sale"));
        setItemData({
            params,
            id
        });
    };

            const handleModalUpdate = (params, id) => {
        dispatch(showModal("Update Sale"));
        setItemData({
            params,
            id
        });
    };

      useEffect(() => {
        dispatch(getSales()).catch((error) => console.log(error))
          dispatch(getUsers()).catch((error) => console.log(error))
    }, []);


  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        
    
        return (
          <div className="cellAction">
            <Link >
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
        Lista de Ventas
        <Link className="link" onClick={() => handleModalPost()}>
          Agregar Ventas
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={filteredSale}
        columns={salesColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
            {activeModal.active && (
                <Modal>
                    {activeModal.name === "Warning Close Session" && (
                        <WarningCloseSession />
                    )}
                        {activeModal.name === "Add Sale" && (
                        <AddSale  data={itemData}/>
                    )}
                        {activeModal.name === "Update Sale" && (
                        <UpdateSale  data={itemData}/>
                    )}
                        {activeModal.name === "Delete Sale" && (
                        <DeleteSale  data={itemData}/>
                    )}
                </Modal>
            )}
    </div>
    
    
  );
};

export default DatatableSale;
