import { useDispatch } from "react-redux";
import { deleteUser, hideModal } from "../../redux/actions";
import "../Modal/modalgeneral.css"
import '../../style/deleteUsers.css'


const DeleteUser = ({ data }) => {
    const {params, id  } = data;

    const dispatch = useDispatch();

    const handleSubmit = (e, id) => {
        e.preventDefault();
        dispatch(deleteUser(id))
            .then(() => dispatch(hideModal()))
            .catch((error) => console.log(error));
    };
    return (
        <div>
            <div>
                <div>
                    <p className="warningMargin">
                        <strong>¿Querés eliminar este usuario?</strong>
                    </p>
                    <p className="pSoftColorWarning">
                        Estás por eliminar a <span>{`${params.row.userName}`}</span>{" "}
                        de forma permanente y ya no tendrá acceso a la
                        plataforma
                    </p>
                </div>
                <form onSubmit={(e) => handleSubmit(e, id)}>
                    <button className="btn_primary mt-2">
                        {" "}
                        <strong>Eliminar Usuario</strong>
                    </button>
                    <button
                        onClick={() => dispatch(hideModal())}
                        className="cancelarWarningButton btn_primary mt-2"
                        type="submit"
                    >
                        <strong>Cancelar </strong>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DeleteUser;
