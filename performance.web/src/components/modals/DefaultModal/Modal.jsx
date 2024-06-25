import React from "react";

const Modal = ({ isOpen, children, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto w-full bg-gray-500 bg-opacity-75 flex">
      <div className="relative p-8 bg-white w-max max-w-4xl m-auto flex-col flex rounded-lg shadow-lg shadow-black">
        {children}
        <span className="absolute top-0 right-0 m-2 w-6 h-6 flex justify-center items-center">
          <button
            onClick={onClose}
            className="text-2xl text-gray-400 hover:text-gray-900"
          >
            &times;
          </button>
        </span>
      </div>
    </div>
  );
};

export default Modal;
