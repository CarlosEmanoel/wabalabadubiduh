import React, { useState, useRef } from 'react';

const Dropdown = ({
    className = 'w-full bg-primary_blue',
    dropdownText = 'SAIBA MAIS',
    position = 'bottom',
    items = [],
    onClick = () => {}
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 300);
    };

    const positionClasses = {
        top: 'bottom-full left-0 mb-2',
        bottom: 'top-full left-0 mt-2',
        left: 'right-full top-0 mr-2',
        right: 'left-full top-0 ml-2'
    };

    const getArrowRotationClass = () => {
        if (position === 'bottom') {
            return isOpen ? 'transform rotate-0' : 'transform rotate-180';
        }
        return isOpen ? arrowRotationClasses[position] : '';
    };

    const arrowRotationClasses = {
        top: 'transform rotate-180',
        bottom: 'transform rotate-0',
        left: 'transform rotate-90',
        right: 'transform -rotate-90'
    };

    return (
        <div className={`relative inline-block select-none ${className}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="flex items-center justify-between">
                <span>{dropdownText}</span>
                <svg
                    className={`w-4 h-4 ml-2 transition-transform duration-300 ease-in-out ${getArrowRotationClass()}`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
            <div
                className={`absolute ${positionClasses[position]} w-full bg-white border border-gray-200 rounded shadow-lg transition-transform duration-300 ease-in-out ${isOpen ? 'transform scale-100 opacity-100' : 'transform scale-95 opacity-0 pointer-events-none'}`}
            >
                {items.map((item, index) => (
                    <button key={index} onClick={() => onClick(item.value)} className="w-full block px-4 py-2 text-gray-800 hover:bg-gray-200">
                        {item.label} {item.icon}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Dropdown;
