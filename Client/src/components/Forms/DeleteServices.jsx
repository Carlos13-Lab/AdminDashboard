import { useDispatch } from "react-redux";
import { deleteServices, hideModal } from "../../redux/actions";
import "../Modal/modalgeneral.css"
import '../../style/deleteUsers.css'


const DeleteServices = ({ data }) => {
    const { id, params } = data;

    const dispatch = useDispatch();

    const handleSubmit = (e, id) => {
        e.preventDefault();
        dispatch(deleteServices(id))
            .then(() => dispatch(hideModal()))
            .catch((error) => console.log(error));

    };
    return (
        <div>
            <div>
                <div>
                    <p className="warningMargin">
                        <strong>¿Querés eliminar este Servicio?</strong>
                    </p>
                    <p className="pSoftColorWarning">
                        Estás por eliminar este servicio <span>{`${params.row.name}`}</span>{" "}
                        de forma permanente.
                    </p>
                </div>
                <form onSubmit={(e) => handleSubmit(e, id)}>
                    <button className="btn_primary mt-2">
                        {" "}
                        <strong>Eliminar Servicio</strong>
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

export default DeleteServices;
