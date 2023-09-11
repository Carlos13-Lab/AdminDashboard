import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUsers } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const Datatable = () => {
  const users = useSelector((state) => state.users);
  console.log('users',users)
  const [data, setData] = useState(users);
 
  const dispatch = useDispatch()

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
      useEffect(() => {
        dispatch(getUsers()).catch((error) => console.log(error));
        console.log(getUsers)
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
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={users}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
