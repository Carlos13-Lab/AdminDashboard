import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideModal,updateService  } from "../../redux/actions";
import "../../style/addUsers.css";
import Swal from 'sweetalert2'


const UpdateService = ({ data }) => {
  const dispatch = useDispatch();
  const { params, id } = data;
  const { name , status} = params
  console.log(params.rows)

const [service, setService] = useState({
 name,
 status
});


  const cancel = (event) => {
    event.preventDefault();
    dispatch(hideModal()).catch((error) => console.log(error));
  };

  const handleChange = (name, value) => {
    setService((prev) => ({ ...prev, [name]: value }));
  };


const _handleSubmit = async (e, data ) => {
    e.preventDefault();
    try {

        await dispatch(updateService( id.id, data));
        dispatch(hideModal());
        Swal.fire(
        'Listooo tu servicio esta actualizado!',
        'Pulsa el boton para terminar el proceso!',
        'Terminar',
        )
    } catch (error) {
        console.log(error);
    }
};
 


  const toggleActive = () => {
    setService((prev) => ({ ...prev, status: !prev.status }));
  };

  return (
    <form className="addUsers" onSubmit={(e) => _handleSubmit(e, service)}>
      <input
        className="addUsers-input"
        name="name"
        onChange={(e) => handleChange("name", e.target.value)}
        value={service.name}
        placeholder="Name"
      />
      <div className="addUsers-input">
        <span>
          <strong>Activo:</strong>
        </span>
        <label htmlFor="status">
          <input
            type="checkbox"
            id="status"
            name="status"
            checked={service.status}
            onChange={toggleActive}
          />
          {service.status ? "Activo" : "Inactivo"}
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

export default UpdateService;
