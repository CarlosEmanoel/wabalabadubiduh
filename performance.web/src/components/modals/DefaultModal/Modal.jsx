import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";

const Modal = ({
  isOpen,
  children,
  onClose,
  title = null,
  footer = null,
  width = null,
}) => {
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center"
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`relative max-w-4xl max-h-[85vh] m-4 flex flex-col rounded-lg shadow-lg bg-white overflow-y-auto ${
          width ? width : "w-auto"
        }`}
      >
        {title && (
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-700 py-2 text-center border-b-2 border-gray-200 rounded-t-lg">
            {title}
          </h2>
        )}
        <div className="overflow-y-auto p-8 flex-1">{children}</div>
        {footer && (
          <div className="flex flex-shrink-0 items-center justify-center rounded-b-lg border-t-2 border-gray-200 p-4">
            {footer}
          </div>
        )}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-2 w-6 h-6 flex justify-center items-center text-2xl text-gray-400 hover:text-gray-900"
          aria-label="Close modal"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  footer: PropTypes.node,
  width: PropTypes.string,
};

export default Modal;
