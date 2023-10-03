import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideModal, addServices  } from "../../redux/actions";
import "../../style/addUsers.css";
import Swal from "sweetalert2";




const AddService = () => {  
    const services = useSelector((state) => state.services);
    const dispatch = useDispatch();
    const [service, setservice] = useState({
        name: '',
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
    setservice((prev) => ({ ...prev, [name]: value }));
};


const _handleSubmit = async (e, data) => {
    e.preventDefault();
    try {
        await dispatch(addServices(data));
        dispatch(hideModal());
            Swal.fire(
        'Listooo tu producto esta agregado!!',
        'Pulsa el boton para terminar el proceso!',
        'Terminar',
        )
    } catch (error) {
        console.log(error);
    }
};
 

  const toggleActive = () => {
    setservice((prev) => ({ ...prev, status: !prev.status }));
  };

    return (
        <form
            className="addUsers"
            onSubmit={(e) => _handleSubmit(e, service)}
        >
            <input
                className="addUsers-input"
                name="name"
                onChange={_handleChange}
                value={service.name}
                placeholder="name"
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
                <strong>Crear</strong>
            </button>
            <button className="addUsers-button cancel-button" onClick={cancel}>
                <strong>Cancelar</strong>
            </button>
        </form>
    );
};

export default AddService;
