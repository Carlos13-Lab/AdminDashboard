import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideModal, AddProduct  } from "../../redux/actions";
import "../../style/addUsers.css";
import { Fragment } from "react";
import Swal from "sweetalert2";




const AddProducts = () => {  
    const  services = useSelector((state) => state.services);
    const dispatch = useDispatch();
    const [product, setProduct] = useState({
        email: '',
        password: '',
        active: true,
        service: [],
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
        const selectedServices = services.filter(service => data.service.includes(service.id));
        const serviceIds = selectedServices.map(service => service.id);
        await dispatch(AddProduct(serviceIds, data));
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
 



    return (
        <form
            className="addUsers"
            onSubmit={(e) => _handleSubmit(e, product)}
        >
            <input
                className="addUsers-input"
                name="email"
                onChange={_handleChange}
                value={product.email}
                placeholder="Email"
            />
            <input
                className="addUsers-input"
                name="password"
                onChange={_handleChange}
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
            

            <button className="addUsers-button" type="submit">
                <strong>Crear</strong>
            </button>
            <button className="addUsers-button cancel-button" onClick={cancel}>
                <strong>Cancelar</strong>
            </button>
        </form>
    );
};

export default AddProducts;
