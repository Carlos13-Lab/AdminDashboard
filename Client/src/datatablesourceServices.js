import './style/DatatableSource.css'
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

export const ServicesColumns = [
    { field: "id", headerName: "ID", width: 100 },
    {
        field: "name",
        headerName: "Name",
        width: 210,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <LocalShippingIcon className="cellWithnicon" />
                    {params.row.name}
                </div>
            );
        },
    },
    {
        field: "status",
        headerName: "Status",
        width: 200,
        renderCell: (params) => {
            return (
                <div className={`cellWithActive ${params.row.status ? 'activeGreen' : 'activeRed'}`}>
                    {params.row.status ? "Activo" : "No Activo"}
                </div>
            );
        },
    },


];
