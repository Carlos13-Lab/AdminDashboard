import './style/DatatableSource.css'

export const salesColumns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "saleDate", headerName: "Fecha de Venta", width: 140 },
    {
        field: "status",
        headerName: "Status",
        width: 120,
        renderCell: (params) => {
            return (
                <div className={`cellWithActive ${params.row.status ? 'activeGreen' : 'activeRed'}`}>
                    {params.row.status ? "Activo" : "No Activo"}
                </div>
            );
        },
    },
    {
        field: "Price",
        headerName: "Precio",
        width: 120,
        renderCell: (params) => {
            return (
                <div className={`cellWithActive ${params.row.price ? 'activeGreen' : 'activeRed'}`}>
                    {params.row.price} $
                </div>
            );
        },
    },
    {
        field: "ClientId",
        headerName: "Cliente",
        width: 100,
        renderCell: (params) => {
            return (
                <div >
                    {params.row.clientId ? (
                        params.row.clientId.map((item, index) => {
                            return (
                                <div key={index} className="productItem">
                                    <div><strong>{item.userName}</strong> </div>
                                </div>
                            );
                        })
                    ) : (
                        "No existe el Cliente"
                    )}
                </div>
            );
        },
    },
   {
    field: "Info",
    headerName: "Producto",
    width: 200,
    renderCell: (params) => {
        return (
            <div>
                {params.row.Info ? (
                    params.row.Info.map((item, index) => {
                        return (
                            <div key={index} className="productItem">
                                <div><strong>{item.email}</strong> </div>
                            </div>
                        );
                    })
                ) : (
                    <div>No existe el Producto</div>
                )}
            </div>
        );
    },
},
 {
        field: "ServicioInfo",
        headerName: "Servicio",
        width: 140,
        renderCell: (params) => {
            return (
                <div>
                    {params.row.Info ? (
                        params.row.Info.map((item, index) => {
                            return (
                                <div key={index} className="productItem">
                                    <div><strong>{item.service[0].name}</strong> </div>
                                </div>
                            );
                        })
                    ) : (
                        <div>No existe el Servicio</div>
                    )}
                </div>
            );
        },
    }


];
