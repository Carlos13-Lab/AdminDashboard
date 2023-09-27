import './style/DatatableSource.css'

export const UserColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "userName",
    headerName: "Usuario",
    width: 210,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src='https://img.freepik.com/vector-premium/icono-perfil-personas_718801-114.jpg?w=740' alt="avatar" />
          {params.row.userName}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Correo",
    width: 230,
  },
  {
    field: "active",
    headerName: "Active",
    width: 100,
    renderCell: (params) => {
      return (
        <div className={`cellWithActive ${params.row.active ? 'activeGreen' : 'activeRed'}`}>
          {params.row.active ? "Activo" : "No Activo"}
        </div>
      );
    },
  },
  {
    field: "product",
    headerName: "Productos",
    width: 200,
    renderCell: (params) => {
      let emailCount = 0;
      if (Array.isArray(params.row.product)) {
        emailCount = params.row.product.length;
      }
      return (
        <div className='productContainer'>
          {emailCount > 0 ? (
            params.row.product.map((item, index) => {
              return (
                <div key={index} className="productItem">
                  <div>{item.email}</div>
                </div>
              );
            })
          ) : (
            "No hay productos"
          )}
          <div className="productItem">Numero de Cuentas {emailCount}</div>
        </div>
      );
    },
  },
  {
    field: "phone_Number",
    headerName: "Telefono",
    width: 190,
  }

];
