export const profilesColumns = [
  { field: "id", headerName: "ID", width: 70 },
  
  {
    field: "Nombre",
    headerName: "Nombre",
    width: 230,renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src='https://img2.freepng.es/20180320/qcw/kisspng-computer-icons-name-tag-iconfinder-clip-art-security-badge-icon-png-5ab0cc3fa64061.172177691521536063681.jpg' alt="avatar" />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithActive ${params.row.status ? 'activeGreen' : 'activeRed'}`}>
          {params.row.status ? "Activo" : "No Activo"}
        </div>
      );
    },
  },
  { field: "pin", headerName: "Clave", width: 100 },
  { field: "number", headerName: "Cuenta", width: 100},
    {  field: "profiles",
    headerName: "Producto",
    width: 250,
    renderCell: (params) => {
      return (
        <div className='productContainer'>
          {params.row.product ? (
            params.row.product.map((item, index) => {
              return (
                <div key={index} className="productItem">
                  <div> <strong>{item.email}</strong> </div>
                </div>
              );
            })
          ) : (
            "No hay Services"
          )}
        </div>
      );
    },
  },

];

