import { useDispatch } from "react-redux";
import { deleteProfile, hideModal } from "../../redux/actions";
import "../Modal/modalgeneral.css"
import '../../style/deleteUsers.css'
import Swal from "sweetalert2";


const DeleteProfiles = ({ data }) => {
    const { id  } = data;
    const dispatch = useDispatch();

    const handleSubmit = (e, id) => {
        e.preventDefault();
        dispatch(deleteProfile(id))
            .then(() => dispatch(hideModal()))
            .catch((error) => console.log(error));
                    Swal.fire(
        'Listooo!! tu Perfil a sido eliminado!',
        'Pulsa el boton para terminar el proceso!',
        'Terminar',
        )
    };
    return (
        <div>
            <div>
                <div>
                    <p className="warningMargin">
                        <strong>¿Querés eliminar este Perfil?</strong>
                    </p>
                    <p className="pSoftColorWarning">
                        Estás por eliminar este Perfil
                        de forma permanente!!
                    </p>
                </div>
                <form onSubmit={(e) => handleSubmit(e, id)}>
                    <button className="btn_primary mt-2">
                        {" "}
                        <strong>Eliminar Perfil</strong>
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

export default DeleteProfiles;
