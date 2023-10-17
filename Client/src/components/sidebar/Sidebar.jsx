import "./sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { showModal } from "../../redux/actions";
import { useDispatch, useSelector} from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)

  const handleWarnings = (event) => {
        event.preventDefault();
        dispatch(showModal("Warning Close Session"));
    };
    console.log(user)
  return (
    <div className="sidebar">

{user ? (user.role === "seller" ? (
  <div className="top">
    <Link to="/" style={{ textDecoration: "none" }}>
      <span className="logo">Seller</span>
    </Link>
  </div>
) : (
  <div className="top">
    <Link to="/admin" style={{ textDecoration: "none" }}>
      <span className="logo">Admin</span>
    </Link>
  </div>
)) : null}

   
      <hr />
      <div className="center">
        <ul>
      
          
                <p className="title">MAIN</p>
                <Link to="/admin" style={{ textDecoration: "none" }}>
                  <li>
                    <DashboardIcon className="icon" />
                    <span>Dashboard</span>
                  </li>
                </Link>
          
        
          <p className="title">LISTS</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Usuarios</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Productos</span>
            </li>
          </Link>
          <Link to="/sale" style={{ textDecoration: "none" }}>
          <li>
            <CreditCardIcon className="icon" />
            <span>Ventas</span>
          </li>
          </Link>
          <Link to="/services" style={{ textDecoration: "none" }}>   
            <li>
            <LocalShippingIcon className="icon" />
            <span>Servicios</span>
          </li>
          </Link>
      
          <p className="title">USEFUL</p>
          <li>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li>
          <p className="title">SERVICE</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li>
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li onClick={handleWarnings}>
            <ExitToAppIcon className="icon" />
            <span
            >Cerrar sesion</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
