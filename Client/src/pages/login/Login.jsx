import React, { useState } from "react";
import { useFormik } from "formik";
import "./login.scss"
import * as Yup from "yup";
// import bgLoginPage from "../assets/images/bgLoginPage.png";
// import logo from "../assets/images/logo.png";
 import toast, { Toaster } from "react-hot-toast";
 import { FaArrowLeft } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions";
// import Modal from "../components/Modal";
// import ForgetPassword from "../components/Forms/ForgetPassword";

// Render Login page-
const LoginPage = () => {
    // const activeModal = useSelector((state) => state.modal);
    const [forms, setForms] = useState(false); // SHow form or button to select user.
    const [customForm, setCustomForm] = useState(false); // Use to select what form render.

    const dispatch = useDispatch();

    // User click in "soy Admin".
    const handleAdmin = () => {
        setForms(true);
        setCustomForm(false);
    };

    // User click in "soy Vendedor"
    const handleSeller = () => {
        setForms(true);
        setCustomForm(true);
    };

    // Arrow go back
    const handleGoBack = () => {
        setForms(false);
    };

    // const handleModal = () => {
    //     dispatch(showModal("Forget Password"));
    // };

    // Custom fomrs
    const FormLogin = () => {
        // Initial values form Students
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
                console.log(login)
                dispatch(login({ email, password, role: "admin" })).catch(
                    (error) => {
                        let message =
                            error.message == "Network Error" ||
                            error.message == "Incorrect role"
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
                    }
                );
            },
        });

        // Initial values form Teacher
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
                dispatch(login({ email, password, role: "seller" })).catch(
                    (error) => {
                        let message =
                            error.message == "Network Error" ||
                            error.message == "Rol incorrecto"
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
                    }
                );
            },
        }); 

        // custom form is true, render teacher form.
        if (customForm) {
          return (
              <div className="boxForm" >
                    <div>
                        <Toaster position="top-right" reverseOrder={false} />
                    </div>
                    <form
                        onSubmit={formikVendedor.handleSubmit}
                    >
                        <div className="contentInput" >
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
                            {formikVendedor.errors.email ? (
                                <div className="formikError">
                                    {" "}
                                    {formikVendedor.errors.email}{" "}
                                </div>
                            ) : null}
                        </div>
                        <div >
                            <input
                                style={{
                                    marginTop: "5px",
                                    borderLeft: formikVendedor.errors.password
                                        ? "3px solid tomato"
                                        : "1.5px solid #b9b9b9",
                                }}
                                // className={style.customInput}
                                type="password"
                                placeholder="password"
                                id="password"
                                name="password"
                                onChange={formikVendedor.handleChange}
                                value={formikVendedor.values.password}
                            />
                            {formikVendedor.errors.password ? (
                                <div >
                                    {" "}
                                    {formikVendedor.errors.password}{" "}
                                </div>
                            ) : null}
                        </div>
{/* 
                        <div>
                            {activeModal.active && (
                                <Modal>
                                    {activeModal.name === "Forget Password" && (
                                        <ForgetPassword />
                                    )}
                                </Modal>
                            )}
                            <p
                                onClick={handleModal}
                                className={style.resetPassword}
                            >
                                ¿Olvidaste tu Contraseña?
                            </p>
                        </div> */}

                        <input
                            // className={style.choiceFormButton}
                            type="submit"
                            value="Iniciar sessión"
                        />
                    </form>
                </div>
            );
        }

        // custom form is false, render student form
        return (
            <div >
                <div>
                    <Toaster position="top-right" reverseOrder={false} />
                </div>
                <form
                    // className={style.formContent}
                    onSubmit={formikAdmin.handleSubmit}
                >
                    <div >
                        <input
                            style={{
                                borderLeft: formikAdmin.errors.email
                                    ? "3px solid tomato"
                                    : "1.5px solid #b9b9b9",
                            }}
                            // className={style.customInput}
                            type="email"
                            placeholder="Correo electronico"
                            id="email"
                            name="email"
                            onChange={formikAdmin.handleChange}
                        />
                        {formikAdmin.errors.email ? (
                            <div >
                                {" "}
                                {formikAdmin.errors.email}{" "}
                            </div>
                        ) : null}
                    </div>
                    <div >
                        <input
                            style={{
                                marginTop: "5px",
                                borderLeft: formikAdmin.errors.password
                                    ? "3px solid tomato"
                                    : "1.5px solid #b9b9b9",
                            }}
                            // className={style.customInput}
                            type="password"
                            placeholder="password"
                            id="password"
                            name="password"
                            onChange={formikAdmin.handleChange}
                            value={formikAdmin.values.password}
                        />
                        {formikAdmin.errors.password ? (
                            <div >
                                {" "}
                                {formikAdmin.errors.password}{" "}
                            </div>
                        ) : null}
                    </div>
                    {/* {activeModal.active && (
                        <Modal>
                            {activeModal.name === "Forget Password" && (
                                <ForgetPassword />
                            )}
                        </Modal>
                    )} */}
                    {/* <p onClick={handleModal} className={style.resetPassword}>
                        ¿Olvidaste tu Contraseña?
                    </p> */}
                    <input
                        // className={style.choiceFormButton}
                        type="submit"
                        value="Iniciar sessión"
                    />
                </form>
            </div>
        );
    };

    return (
        <main >
            {/* <article className={style.imgContent}>
                <img
                    className={style.imgLogin}
                    src={bgLoginPage}
                    alt="imgLogin"
                />
            </article> */}
            <article >
                <section >
                    {forms ? (
                         <div onClick={handleGoBack}>
                            <FaArrowLeft  />
                        </div>
                    ) : (
                        "x"
                    )}
                    {/* <img className={style.logo} src={logo} alt="logo" /> */}
                </section>
                <section >
                    <h3>
                        El conocimiento te <br /> traerá la
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
                    <section >
                        <button
                            onClick={handleAdmin}
                            className="btn_primary mt-4"
                        >
                            Soy Admin
                        </button>
                        <button
                            onClick={handleSeller}
                            className="btn_primary mt-4"
                        >
                            Soy Vendedor
                        </button>
                    </section>
                )}
            </article>
        </main>
    );
};

export default LoginPage;