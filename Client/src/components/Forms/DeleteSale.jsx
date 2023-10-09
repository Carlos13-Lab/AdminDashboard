import { useDispatch } from "react-redux";
import { deleteSale, hideModal } from "../../redux/actions";
import "../Modal/modalgeneral.css"
import '../../style/deleteUsers.css'
import Swal from "sweetalert2";


const DeleteSale = ({ data }) => {
    const { id  } = data;
    console.log(id)
    const dispatch = useDispatch();

    const handleSubmit = (e, id) => {
        e.preventDefault();
        dispatch(deleteSale(id))
            .then(() => dispatch(hideModal()))
            .catch((error) => console.log(error));
                    Swal.fire(
        'Listooo tu Usuario a sido eliminado!',
        'Pulsa el boton para terminar el proceso!',
        'Terminar',
        )
    };
    return (
        <div>
            <div>
                <div>
                    <p className="warningMargin">
                        <strong>¿Querés eliminar este usuario?</strong>
                    </p>
                    <p className="pSoftColorWarning">
                        Estás por eliminar 
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

export default DeleteSale;
