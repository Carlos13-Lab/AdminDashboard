import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideModal, AddProfile } from "../../redux/actions";
import "../../style/addUsers.css";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";



const AddProfiles = () => {
    const {id} = useParams()
    console.log(id)

  const dispatch = useDispatch();
  const [profile, setProfile] = useState({
    name: "",
    pin: "",
    number: "",
    status: true,
    product: [id]
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
    setProfile((prev) => ({ ...prev, [name]: value }));
  };




const _handleSubmit = async (e, data) => {
  e.preventDefault();
  data = {
    ...profile
  };
  try {
    await dispatch(AddProfile(id, data));
    dispatch(hideModal());
    Swal.fire(
      '¡Listo! ¡Tu Perfil ha sido agregada!',
      '¡Pulsa el botón para terminar el proceso!',
      'Terminar'
    );
  } catch (error) {
    console.log(error.message);
  }
};



  return (
    <form className="addUsers" onSubmit={(e) => _handleSubmit(e, profile)}>
      <div className="addUsers-input">
        <span>
          <strong>Nombre Cuenta</strong>
        </span>
      <input
        className="addUsers-input"
        name="name"
        onChange={_handleChange}
        value={profile.name}
        placeholder="Nombre"
        
      />
      </div>
      <div className="addUsers-input">
        <span>
          <strong>Pin Cuenta</strong>
        </span>
      <input
        className="addUsers-input"
        name="pin"
        onChange={_handleChange}
        value={profile.pin}
        placeholder="Pin"
        
      />
      </div>
      <div className="addUsers-input">
        <span>
          <strong>Numero cuenta</strong>
        </span>
      <input
        className="addUsers-input"
        name="number"
        onChange={_handleChange}
        value={profile.number}
        placeholder="Numero"
        
      />
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

export default AddProfiles;
