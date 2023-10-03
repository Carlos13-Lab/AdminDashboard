import React from "react";
import "./style/DatatableSource.css"               

export const productsColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "email",
    headerName: "Email",
    width: 230,renderCell: (params) => {
      console.log(params)
      return (
        <div className="cellWithImg">
          <img className="cellImg" src='https://cdn-icons-png.flaticon.com/512/4129/4129437.png' alt="avatar" />
          {params.row.email}
        </div>
      );
    },
  },
  {
    field: "password",
    headerName: "Password",
    width: 260,
    renderCell: (params) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [showPassword, setShowPassword] = React.useState(false);

      const handleClick = () => {
        setShowPassword(!showPassword);
      };

      console.log(params);
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src="https://w7.pngwing.com/pngs/897/894/png-transparent-computer-icons-password-password-black-and-white-padlock-login.png"
            alt="password"
          />
          <div className="passwordContainer">
            {showPassword ? (
              <div>
                <div>{params.row.password}</div>
                <button onClick={handleClick}>Ocultar</button>
              </div>
            ) : (
              <div>
                <div>
                  {params.row.password.replace(/./g, "*")} {/* Replacing each character with asterisks */}
                </div>
                <button onClick={handleClick}>Mostrar</button>
              </div>
            )}
          </div>
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
    {  field: "services",
    headerName: "Services",
    width: 230,
    renderCell: (params) => {
      return (
        <div className='productContainer'>
          {params.row.service ? (
            params.row.service.map((item, index) => {
              return (
                <div key={index} className="productItem">
                  <div> <strong>{item.name}</strong> </div>
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

