import React from "react";
import ReactDOM from "react-dom";
import { ImCross } from "react-icons/im";

const Modal = ({ isOpen, onClose,children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-black opacity-50 absolute inset-0" onClick={onClose}></div>
      <div className="bg-white p-8 rounded-lg z-10 w-[600px]">

        <div className="flex flex-row justify-between">
       <div></div>
        <button onClick={onClose}><ImCross size={25}/>
       </button>
        </div>
        
        {children}

      </div>
    </div>,
    document.body
  );
};

export default Modal;
