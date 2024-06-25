import React, { useEffect, useState } from "react";
import { PFileFetcher } from "../..";

export default function CarouselView({
  children = [],
  indicator = false,
  autoPlay = false,
  autoPlayInterval = 6000
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const childrenArray = React.Children.toArray(children);
  const totalItems = childrenArray.length;
  const [onPlayHover, setOnPlayHover] = useState(autoPlay)

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalItems - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalItems - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    if (onPlayHover) {
      const interval = setInterval(() => {
        handleNextClick();
      }, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [currentIndex, onPlayHover, autoPlayInterval]);

  return (
    <>
      <div
        onMouseEnter={() => setOnPlayHover(false)}
        onMouseLeave={() => setOnPlayHover(autoPlay)}
        className="relative w-full h-auto overflow-hidden mb-4"
      >
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {childrenArray.map((child, index) => (
            <div key={index} className="min-w-full flex-shrink-0">
              {child}
            </div>
          ))}
        </div>
        <button
          onClick={handlePrevClick}
          className="w-12 h-12 absolute top-1/2 left-4 transform -translate-y-1/2 bg-primary_blue hover:bg-primary_blue_hover font-bold py-2 px-4 rounded-full focus:outline-none shadow-xl"
        >
          <PFileFetcher fileName="ic_arrow_caret_left_white_filled" />
        </button>
        <button
          onClick={handleNextClick}
          className="w-12 h-12 absolute top-1/2 right-4 transform -translate-y-1/2 bg-primary_blue hover:bg-primary_blue_hover font-bold py-2 px-4 rounded-full focus:outline-none shadow-xl"
        >
          <PFileFetcher fileName="ic_arrow_caret_right_white_filled" />
        </button>
        {indicator && (
          <div className="flex justify-center mt-auto space-x-2">
            {children.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${index === currentIndex
                  ? "bg-secondary_blue hover:bg-secondary_blue_hover"
                  : "bg-gray-400 hover:bg-gray-300"
                  } focus:outline-none`}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
