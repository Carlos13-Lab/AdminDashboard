import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideModal, updatedProduct } from "../../redux/actions";
import "../../style/addUsers.css";

const UpdateUser = ({ data }) => {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.services);
  const { params, id } = data;
  const { email, password, service} = params.row;

  const [product, setProduct] = useState({
    email,
    password,
    active: true,
    service: service
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
        let services = prev.service;
        if (checked && !services.includes(value)) {
            services.push(value);
            console.log(value)
        }
        if (!checked) {
            services = services.filter((service) => service !== value);
        }
        console.log(services)
        return {
            ...prev,
            service: services,
        };
    });
};

const _handleSubmit = async (e, data) => {
    e.preventDefault();
    try {
        await dispatch(updatedProduct(id, data));
        dispatch(hideModal());
    } catch (error) {
        console.log(error);
    }
};
 


  const toggleActive = () => {
    setProduct((prev) => ({ ...prev, active: !prev.active }));
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
                          return (   console.log(service.id),
                              <Fragment key={service.id}>
                                  <label htmlFor={service.email}>
                                      <input
                                          type="checkbox"
                                          id={service.email}
                                          name="Producto"
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
        <label htmlFor="active">
          <input
            type="checkbox"
            id="active"
            name="active"
            checked={product.active}
            onChange={toggleActive}
          />
          {product.active ? "Activo" : "Inactivo"}
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

export default UpdateUser;
