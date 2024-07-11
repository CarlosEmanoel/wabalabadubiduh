import React, { useEffect } from "react";

export default function SuccessModal({
  isOpen,
  setIsOpen,
  title = "Sucesso",
  message = "Operação Realizada com Sucesso!",
  autoCloseTime = 2500,
}) {
  useEffect(() => {
    let timer;
    if (isOpen) {
      timer = setTimeout(() => {
        setIsOpen(false);
      }, autoCloseTime);
    }
    return () => clearTimeout(timer);
  }, [isOpen, setIsOpen, autoCloseTime]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 w-full bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 select-none"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative max-w-xl max-h-[85vh] bg-white p-6 rounded-lg shadow-lg overflow-y-auto">
            <div className="flex flex-col items-center">
              <svg
                className="w-16 h-16 text-green-500 mb-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="path-circle"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                  className="path-check"
                />
              </svg>
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-2">
                {title}
              </h2>
              <p>{message}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
