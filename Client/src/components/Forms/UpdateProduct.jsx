import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideModal, updateProduct } from "../../redux/actions";
import "../../style/addUsers.css";
import Swal from 'sweetalert2'


const UpdateProduct = ({ data }) => {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.services);
  const { params, id } = data;
  const { email, password, service} = params
  console.log(params.rows)

const [product, setProduct] = useState({
  email,
  password,
  status: true,
  service: Array.isArray(service) ? service : []
});


  const cancel = (event) => {
    event.preventDefault();
    dispatch(hideModal()).catch((error) => console.log(error));
  };

  const handleChange = (name, value) => {
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

const _handleSelect = (event) => {
  const { value, checked } = event.target;
  setProduct((prev) => {
    let services = [...prev.service]; // Crear un nuevo array mediante la propagación del array de servicios anterior

    if (checked) {
      // Reemplazar el valor directamente en el array si está marcado y no existe en el array
      if (!services.includes(value)) {
        services = [...services, value];
      }
    } else {
      // Eliminar el valor del array si no está marcado
      services = services.filter((service) => service !== value);
    }

    // Si no se selecciona nada, dejar el valor que estaba
    if (!checked && services.length === 0) {
      services = [...prev.service];
    }

    return {
      ...prev,
      service: services,
    };
  });
};


const _handleSubmit = async (e, data ) => {
    e.preventDefault();
    try {

        await dispatch(updateProduct( id.id, data));
        dispatch(hideModal());
        Swal.fire(
        'Listooo tu producto esta actualizado!',
        'Pulsa el boton para terminar el proceso!',
        'Terminar',
        )
    } catch (error) {
        console.log(error);
    }
};
 


  const toggleActive = () => {
    setProduct((prev) => ({ ...prev, status: !prev.status }));
  };

  return (
    <form className="addUsers" onSubmit={(e) => _handleSubmit(e, product)}>
      <input
        className="addUsers-input"
        name="email"
        onChange={(e) => handleChange("email", e.target.value)}
        value={product.email}
        placeholder="Email"
      />
      <input
        className="addUsers-input"
        name="password"
        onChange={(e) => handleChange("password", e.target.value)}
        value={product.password}
        placeholder="Contraseña"
      />
      <div className="addUsers-input">
       <span><strong>Services :</strong> </span>
                {services
                    ? services.map((service) => {
                          return (   
                              <Fragment key={service.id}>
                                  <label htmlFor={service.id}>
                                      <input
                                          type="checkbox"
                                          id={service.id}
                                          name="services"
                                          value={service.id}
                                          onChange={_handleSelect}
                                      />
                                      {service.name}
                                  </label>
                              </Fragment>
                           
                          );
                      })
                    : ""}
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
            checked={product.status}
            onChange={toggleActive}
          />
          {product.status ? "Activo" : "Inactivo"}
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

export default UpdateProduct;
