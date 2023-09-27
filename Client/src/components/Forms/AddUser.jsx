import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';


import { hideModal, AddUser  } from "../../redux/actions";
import "../../style/addUsers.css";
import { Fragment } from "react";




const AddUsers = () => {  
    const products = useSelector((state) => state.products);
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        userName: '',
        email: '',
        password: '',
        role: '',
        phone_Number: '',
        active: true,
        product: [],
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
    setUser((prev) => ({ ...prev, [name]: value }));
};

const _handleSelect = (event) => {
    const { value, checked } = event.target;
    setUser((prev) => {
        let products = prev.product;
        if (checked && !products.includes(value)) {
            products.push(value);
            console.log(value)
        }
        if (!checked) {
            products = products.filter((product) => product !== value);
        }
        console.log(products)
        return {
            ...prev,
            product: products,
        
        };
    });
};


const _handleSubmit = async (e, data) => {
    e.preventDefault();
    try {
        await dispatch(AddUser(data));
        dispatch(hideModal());
    } catch (error) {
        console.log(error);
    }
};



    return (
        <form
            className="addUsers"
            onSubmit={(e) => _handleSubmit(e, user)}
        >
            <input
                className="addUsers-input"
                name="userName"
                onChange={_handleChange}
                value={user.userName}
                placeholder="Nombre"
            />
            <PhoneInput
            className="addUsers-input"
            country={'latam'} // Establece el país predeterminado o déjalo en blanco para detectar automáticamente el país
            value={user.phone_Number}
            onChange={(value) => setUser((prev) => ({ ...prev, phone_Number: value }))} // Actualiza el valor del estado cuando cambia el número de teléfono
            placeholder="Número"
            />
            <input
                className="addUsers-input"
                name="email"
                onChange={_handleChange}
                value={user.email}
                placeholder="Email"
            />
            <input
                className="addUsers-input"
                name="password"
                onChange={_handleChange}
                value={user.password}
                placeholder="Contraseña"
            />
            <input
                className="addUsers-input"
                name="role"
                onChange={_handleChange}
                value={user.role}
                placeholder="Role"
            />
             <div className="addUsers-input">
                <span><strong>Productos :</strong> </span>
                {products
                    ? products.map((product) => {
                          return (
                              <Fragment key={product.id}>
                                  <label htmlFor={product.email}>
                                      <input
                                          type="checkbox"
                                          id={product.email}
                                          name="Producto"
                                          value={product.id}
                                          onChange={_handleSelect}
                                      />
                                      {product.email}
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

export default AddUsers;
