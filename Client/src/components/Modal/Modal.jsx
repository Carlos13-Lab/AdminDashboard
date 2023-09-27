import React from "react";
import "./modal.css";

const Modal = ({ children }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-img">
                    <img src="https://i.gifer.com/XOsX.gif" alt="" width='100px' />
                </div>
                <div className="modal-content__body">{children}</div>
            </div>
        </div>
    );
};

export default Modal;