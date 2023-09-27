import React, { useState } from "react";
import { useFormik } from "formik";
import "./login.css";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions";

const LoginPage = () => {
  const [forms, setForms] = useState(false);
  const [customForm, setCustomForm] = useState(false);

  const dispatch = useDispatch();

  const handleAdmin = () => {
    setForms(true);
    setCustomForm(false);
  };

  const handleSeller = () => {
    setForms(true);
    setCustomForm(true);
  };

  const handleGoBack = () => {
    setForms(false);
  };

  const FormLogin = () => {
    const formikAdmin = useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: Yup.object({
        email: Yup.string().required("Email required"),
        password: Yup.string().required("Password required"),
      }),
      onSubmit: (values) => {
        const { email, password } = values;
        dispatch(login({ email, password, role: "admin" })).catch((error) => {
          let message =
            error.message === "Network Error" || error.message === "Incorrect role"
              ? error.message
              : error.response.data.error;
          toast.error(`Error ${message} `, {
            style: {
              border: "1px solid tomato",
              padding: "16px",
              color: "black",
            },
            iconTheme: {
              primary: "tomato",
              secondary: "#FFFAEE",
            },
          });
        });
      },
    });

    const formikVendedor = useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: Yup.object({
        email: Yup.string().email().required("Email required"),
        password: Yup.string().required("Password required"),
      }),
      onSubmit: (values) => {
        const { email, password } = values;
        dispatch(login({ email, password, role: "seller" })).catch((error) => {
          let message =
            error.message === "Network Error" || error.message === "Rol incorrecto"
              ? error.message
              : error.response.data.error;
          toast.error(`Error ${message} `, {
            style: {
              border: "1px solid tomato",
              padding: "16px",
              color: "black",
            },
            iconTheme: {
              primary: "tomato",
              secondary: "#FFFAEE",
            },
          });
        });
      },
    });

    if (customForm) {
      return (
        <div className="boxForm">
          <div>
            <Toaster position="top-right" reverseOrder={false} />
          </div>
          <form className="formContent" onSubmit={formikVendedor.handleSubmit}>
            <div className="contentInput">
              <input
                style={{
                  borderLeft: formikVendedor.errors.email
                    ? "3px solid tomato"
                    : "1.5px solid #b9b9b9",
                }}
                className="customInput"
                type="email"
                placeholder="Correo electronico"
                id="email"
                name="email"
                onChange={formikVendedor.handleChange}
              />
              {formikVendedor.errors.email && (
                <div className="formikError">{formikVendedor.errors.email}</div>
              )}
            </div>
            <div className="contentInput">
              <input
                style={{
                  marginTop: "5px",
                  borderLeft: formikVendedor.errors.password
                    ? "3px solid tomato"
                    : "1.5px solid #b9b9b9",
                }}
                className="customInput"
                type="password"
                placeholder="password"
                id="password"
                name="password"
                onChange={formikVendedor.handleChange}
                value={formikVendedor.values.password}
              />
              {formikVendedor.errors.password && (
                <div className="formikError">{formikVendedor.errors.password}</div>
              )}
            </div>
            <input className="choiceFormButton" type="submit" value="Iniciar sessión" />
          </form>
        </div>
      );
    }

    return (
      <div className="boxForm">
        <div>
          <Toaster position="top-right" reverseOrder={false} />
        </div>
        <form className="formContent" onSubmit={formikAdmin.handleSubmit}>
          <div className="contentInput">
            <input
              style={{
                borderLeft: formikAdmin.errors.email
                  ? "3px solid tomato"
                  : "1.5px solid #b9b9b9",
              }}
              className="customInput"
              type="email"
              placeholder="Correo electronico"
              id="email"
              name="email"
              onChange={formikAdmin.handleChange}
            />
            {formikAdmin.errors.email && (
              <div className="formikError">{formikAdmin.errors.email}</div>
            )}
          </div>
          <div  className="contentInput">
            <input
              style={{
                marginTop: "5px",
                borderLeft: formikAdmin.errors.password
                  ? "3px solid tomato"
                  : "1.5px solid #b9b9b9",
              }}
              className="customInput"
              type="password"
              placeholder="password"
              id="password"
              name="password"
              onChange={formikAdmin.handleChange}
              value={formikAdmin.values.password}
            />
            {formikAdmin.errors.password && (
              <div className="formikError">{formikAdmin.errors.password}</div>
            )}
          </div>
          <input className="choiceFormButton" type="submit" value="Iniciar sessión" />
        </form>
      </div>
    );
  };

  return (
    <main className="loginPageContent">
      <article className="imgContent">
        <img className="imgLogin" src="https://usagif.com/wp-content/uploads/2021/4fh5wi/animated-wallpaper-240x320px-acegif-115.gif" alt="imgLogin" />
      </article>
      <article className="formsContent">
        <section className="logoContent">
          {forms ? (
            <div onClick={handleGoBack}>
              <FaArrowLeft className="NOneedToAlign" />
            </div>
          ) : (
            <FaArrowLeft className="needToAlign" />
          )}
          <img className="logo" src="https://media.tenor.com/XG8WXd4R7RYAAAAC/pato-caminando.gif" alt="logo" />
        </section>
        <section className="motivatingPhraseContent">
          <h3>
            El conocimiento te
            <br /> traerá la
            <br /> oportunidad de
            <br /> hacer la diferencia.
          </h3>
          <p>
            <i>Claire Fagin</i>
          </p>
        </section>
        {forms ? (
          <FormLogin />
        ) : (
          <section className="choiceLoginButtons">
            <button onClick={handleAdmin} className="btn_primaryLogin mt-4">
              Admin
            </button>
            <button onClick={handleSeller} className="btn_primaryLogin mt-4">
             Vendedor
            </button>
          </section>
        )}
      </article>
    </main>
  );
};

export default LoginPage;
