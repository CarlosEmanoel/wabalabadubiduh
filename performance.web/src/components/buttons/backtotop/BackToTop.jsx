import { useState, useEffect } from "react";
import { useScroll } from "../../../hooks";

export default function BackToTop() {
  const isScrolled = useScroll(50);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isScrolled && !isVisible) {
      setIsVisible(true);
    } else if (!isScrolled && isVisible) {
      setIsVisible(false);
    }
  }, [isScrolled, isVisible]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isScrolled && (
        <button
          onClick={() => scrollToTop()}
          className={`fixed hover:scale-105 hover:mb-1 transition-all ease-linear z-50 bottom-10 right-10 p-4 border-0 w-14 h-14 rounded-full text-zinc-50 shadow-lg shadow-black_transparent bg-secondary_blue hover:bg-secondary_blue_hover text-lg font-semibold duration-300 ${isVisible ? "bounce-animation" : ""}`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.4062 15.0864L12.854 7.44011C12.7484 7.31692 12.6174 7.21804 12.4699 7.15025C12.3225 7.08246 12.1622 7.04736 11.9999 7.04736C11.8377 7.04736 11.6773 7.08246 11.5299 7.15025C11.3825 7.21804 11.2515 7.31692 11.1459 7.44011L4.59368 15.0864C3.96836 15.8162 4.4868 16.9435 5.44774 16.9435H18.554C19.5149 16.9435 20.0334 15.8162 19.4062 15.0864Z"
              fill="#FFFFFF"
            />
          </svg>
        </button>
      )}
    </div>
  );
}