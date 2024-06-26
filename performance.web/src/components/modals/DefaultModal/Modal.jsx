import React, { useEffect } from "react";

const Modal = ({ isOpen, children, onClose, title, footer, width }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div
        className={`relative max-w-4xl max-h-full m-4 flex flex-col rounded-lg shadow-lg bg-white overflow-y-auto ${
          width ? width : "w-auto"
        }`}
      >
        {title && (
          <h2 className="text-xl font-semibold text-gray-700 py-2 text-center border-b-2 border-gray-200 rounded-t-lg">
            {title}
          </h2>
        )}
        <div className="overflow-y-auto p-8 flex-1">{children}</div>
        {footer && (
          <div className="flex flex-shrink-0 items-center justify-center rounded-b-lg border-t-2 border-gray-200 p-4">
            {footer}
          </div>
        )}
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
