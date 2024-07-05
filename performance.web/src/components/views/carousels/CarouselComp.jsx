import { useState, useEffect } from "react";
import { PFileFetcher, PSkeleton } from "../..";

export default function CarouselComp({
  images = [],
  className,
  indicator = false,
  autoPlay = true,
  autoPlayInterval = 500,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [onPlayHover, setOnPlayHover] = useState(autoPlay);

  const prevIndex = (currentIndex - 1 + images.length) % images.length;
  const nextIndex = (currentIndex + 1) % images.length;

  const handlePrevClick = () =>
    setCurrentIndex((curr) => (curr === 0 ? images.length - 1 : curr - 1));

  const handleNextClick = () =>
    setCurrentIndex((curr) => (curr === images.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (onPlayHover) {
      const interval = setInterval(() => {
        handleNextClick();
      }, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [currentIndex, onPlayHover, autoPlayInterval]);

  const testLoad = true;
  if (testLoad == false) {
    return (
      <div
        className={`-top-32 select-none w-full h-full flex flex-row justify-center items-center relative`}
      >
        <PSkeleton
          icon
          className={
            "bg-gray-400 w-36 h-[57vh] absolute left-0 rounded-l-xl xl:w-56 xl:h-32 xl:relative"
          }
        />
        <PSkeleton
          icon
          className={"bg-gray-400 w-[100vw] h-[57vh] rounded-xl xl:w-[43vw]"}
        />
        <PSkeleton
          icon
          className={
            "bg-gray-400 w-36 h-[57vh] absolute right-0 rounded-r-xl xl:w-56 xl:h-32 xl:relative"
          }
        />
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setOnPlayHover(false)}
      onMouseLeave={() => setOnPlayHover(autoPlay)}
      className={`${className} select-none w-full h-full flex flex-row justify-center items-center relative`}
    >
      <div
        onClick={handlePrevClick}
        className='rounded-full lg:rounded-l-xl lg:rounded-r-none bg-black opacity-40 lg:opacity-100 hover:opacity-75 shadow-md shadow-black_transparent flex justify-center items-center w-20 h-20 absolute left-0 xl:w-40 xl:h-auto 2xl:w-56 2xl:h-auto lg:relative cursor-pointer group duration-300 ease-in-out transition-transform transform hover:scale-105 z-10'
      >
        <PFileFetcher
          className="w-full h-full lg:hidden rounded-l-xl opacity-75 group-hover:opacity-45 hidden xl:flex"
          fileName={images[prevIndex]}
        />
        <svg
          className="w-8 h-8 text-white xl:hidden"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
      </div>
      <div className='w-[100vw] h-[50vh] rounded-xl xl:w-[43vw] lg:w-[63vw] flex justify-center items-center overflow-hidden'>
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <PFileFetcher
                fileName={image}
                className="w-full h-full rounded-xl"
              />
            </div>
          ))}
        </div>
      </div>
      <div
        onClick={handleNextClick}
        className='rounded-full lg:rounded-r-xl lg:rounded-l-none bg-black opacity-40 lg:opacity-100 shadow-md hover:opacity-75 shadow-black_transparent flex justify-center items-center w-20 h-20 absolute right-0 xl:w-40 xl:h-auto 2xl:w-56 2xl:h-auto lg:relative cursor-pointer group duration-300 ease-in-out transition-transform transform hover:scale-105 z-10'
      >
        <PFileFetcher
          className="w-full h-full lg:hidden rounded-r-xl opacity-75 group-hover:opacity-45 hidden xl:flex"
          fileName={images[nextIndex]}
        />
        <svg
          className="w-8 h-8 text-white xl:hidden"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </div>
      {indicator && (
        <div className="flex justify-center mt-4 space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex
                  ? "bg-secondary_blue hover:bg-secondary_blue_hover"
                  : "bg-gray-400 hover:bg-gray-300"
              } focus:outline-none`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
