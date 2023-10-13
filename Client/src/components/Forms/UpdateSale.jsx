import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideModal, updateSale } from "../../redux/actions";
import "../../style/addUsers.css";
import { Fragment } from "react";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



const UpdateSales = ({data,}) => {
  const user = useSelector((state) => state.user);

  console.log(user);
  const dispatch = useDispatch();
    const {  id } = data;
  const [sale, setSale] = useState({
    saleDate: data.params.saleDate,
    price: data.params.price,
    status: true,
  });

  const cancel = (event) => {
    event.preventDefault();
    try {
      dispatch(hideModal());
    } catch (error) {
      console.log(error);
    }
  };

const _handleChange = ({ target: { name, value } }) => {
  setSale((prev) => ({ ...prev, [name]: value }));
};

    const _handleDateChange = (date) => {
    setSale((prev) => ({ ...prev, saleDate: date }));
  };




const _handleSubmit = async (e, data) => {
  e.preventDefault();
  data = {
    ...sale,
  };
  try {
    await dispatch(updateSale(id.id, data));
    dispatch(hideModal());
    Swal.fire(
      '¡Listo! ¡Tu venta ha sido agregada!',
      '¡Pulsa el botón para terminar el proceso!',
      'Terminar'
    );
  } catch (error) {
    console.log(error.message);
  }
};

  const toggleActive = () => {
    setSale((prev) => ({ ...prev, status: !prev.status }));
  };

  return (
    <form className="addUsers" onSubmit={(e) => _handleSubmit(e, sale)}>
      <div className="addUsers-input">
                    <span>
          <strong>Precio de venta:</strong>
        </span>
      <input
        className="addUsers-input"
        name="price"
        onChange={_handleChange}
        value={sale.price}
        placeholder="price"
        
      />
      </div>
      <div  className="addUsers-input">
            <span>
          <strong>Fecha de venta:</strong>
        </span>
        <DatePicker
          showIcon
          selected={sale.saleDate}
          onChange={_handleDateChange}
          className="addUsers-input"
          placeholderText="Fecha"
        />
      </div>
    
            <div className="addUsers-input">
        <span>
          <strong>Activo:</strong>
        </span>
        <label htmlFor="status">
          <input
            type="checkbox"
            id="status"
            name="status"
            checked={sale.status}
            onChange={toggleActive}
          />
          {sale.status ? "Activo" : "Inactivo"}
        </label>
      </div>

      <button className="addUsers-button" type="submit">
        <strong>Actualizar</strong>
      </button>
      <button className="addUsers-button cancel-button" onClick={cancel}>
        <strong>Cancelar</strong>
      </button>
    </form>
  );
};

export default UpdateSales;
