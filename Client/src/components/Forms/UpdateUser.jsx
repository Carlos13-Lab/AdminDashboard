import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideModal, updateUser } from "../../redux/actions";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import "../../style/addUsers.css";

const UpdateUser = ({ data }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const { params, id, role } = data;
  const { userName, email, password, phone_Number, product } = params;
  console.log(params.row);

  const [user, setUser] = useState({
    userName,
    email,
    password,
    role,
    phone_Number,
    active: true,
    product: product
  });
  console.log(products);

  const cancel = (event) => {
    event.preventDefault();
    dispatch(hideModal()).catch((error) => console.log(error));
  };

  const handleChange = (name, value) => {
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelect = (event) => {
    const { value, checked } = event.target;
    setUser((prev) => {
      let selectedProducts = prev.product || []; 

      if (checked && selectedProducts && !selectedProducts.includes(value)) {
        selectedProducts = [...selectedProducts, value];
      }

      if (!checked && selectedProducts) {
        selectedProducts = selectedProducts.filter((product) => product !== value);
      }

      return {
        ...prev,
        product: selectedProducts,
      };
    });
  };

  const handleSubmit = (e, data) => {
    e.preventDefault();
    dispatch(updateUser(data, id,))
      .then(() => dispatch(hideModal()))
      .then(() => console.log("actualizado"))
      .catch((error) => console.log(error));
  };

  const toggleActive = () => {
    setUser((prev) => ({ ...prev, active: !prev.active }));
  };

  return (
    <form className="addUsers" onSubmit={(e) => handleSubmit(e, user)}>
      <input
        className="addUsers-input"
        name="userName"
        onChange={(e) => handleChange("userName", e.target.value)}
        value={user.userName}
        placeholder="Nombre"
      />
      <PhoneInput
        className="addUsers-input"
        country="latam"
        value={user.phone_Number}
        onChange={(value) => handleChange("phone_Number", value)}
        placeholder="Número"
      />
      <input
        className="addUsers-input"
        name="email"
        onChange={(e) => handleChange("email", e.target.value)}
        value={user.email}
        placeholder="Email"
      />
      <input
        className="addUsers-input"
        name="password"
        onChange={(e) => handleChange("password", e.target.value)}
        value={user.password}
        placeholder="Contraseña"
      />
      <input
        className="addUsers-input"
        name="role"
        onChange={(e) => handleChange("role", e.target.value)}
        value={user.role}
        placeholder="Role"
      />
      <div className="addUsers-input">
        <span>
          <strong>Productos :</strong>
        </span>
        {products ? (
          products.map((product) => (
            <Fragment key={product.id}>
              <label htmlFor={product.email}>
                <input
                  type="checkbox"
                  id={product.email}
                  name="Producto"
                  value={product.id}
                  onChange={handleSelect}
                />
                {product.email}
              </label>
            </Fragment>
          ))
        ) : (
          ""
        )}
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
            checked={user.active}
            onChange={toggleActive}
          />
          {user.active ? "Activo" : "Inactivo"}
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
