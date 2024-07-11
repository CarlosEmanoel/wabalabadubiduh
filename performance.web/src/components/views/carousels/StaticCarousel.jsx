import React, { useState, useEffect } from "react";
import { PFileFetcher } from "../..";
const images = [
  "stock_seminar_speaking_girl",
  "stock_blue_puzzle",
  "stock_seminar_speaking_guy",
];

export default function StaticCarousel({ fileNames, className }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      <PFileFetcher
        fileName={"stock_seminar_speaking_girl"}
        alt={`Slide ${"stock_seminar_speaking_girl"}`}
        className="h-auto max-w-lg transition-all duration-300 rounded-lg cursor-pointer filter grayscale hover:grayscale-0"
      />
      {/* <img class="h-auto max-w-lg transition-all duration-300 rounded-lg cursor-pointer filter grayscale hover:grayscale-0" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/content-gallery-3.png" alt="image description" /> */}
    </>
  );
}
