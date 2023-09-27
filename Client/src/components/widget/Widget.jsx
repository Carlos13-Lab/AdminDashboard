import "./widget.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsertotal,getProducttotal } from "../../redux/actions";
import { Link } from "react-router-dom";

const Widget = ({ type }) => {
  let data;
  const amount = 100;

  const usertotal = useSelector((state) => state.usersTotal)
  const productTotal = useSelector((state) => state.productsTotal)


  
  const dispatch = useDispatch()
      useEffect(() => {
        dispatch(getUsertotal()).catch((error) => console.log(error))
        dispatch(getProducttotal()).catch((error) => console.log(error))

    }, []);

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: <Link to={"/users"}>See all users</Link>,
        Total: usertotal,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: <Link to={"/products"}>View all orders</Link>,
        Total: productTotal,
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: <Link>View net earnings</Link> ,
        Total: "",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        Total: "",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          
          />
        ),
      };
      break;
    default:
      break;
  }
 let diff = (parseFloat(data.Total) / 100) * 100;

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} 
          {data.Total || amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
