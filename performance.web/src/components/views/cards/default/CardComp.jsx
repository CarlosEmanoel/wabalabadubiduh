import React, { useState, useEffect, useRef } from "react";
import { PDefaultButton, PFileFetcher } from "../../..";
import { cardVariants } from "../../../../styles/variants";
import useResponsive from "../../../../hooks/layouts/responsivity/useResponsive";

export default function CardComp({
  image,
  subtitle,
  title,
  description,
  link,
  size,
  cursor,
  transparent = false,
}) {
  const screenSize = useResponsive();
  const finalSize = size || screenSize;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const descriptionRef = useRef(null);

  useEffect(() => {
    if (descriptionRef.current) {
      const { clientHeight, scrollHeight } = descriptionRef.current;
      // Determine the number of lines by comparing clientHeight with scrollHeight
      const lineHeight = parseFloat(
        window.getComputedStyle(descriptionRef.current).lineHeight
      );
      const lines = Math.ceil(scrollHeight / lineHeight);
      if (lines > 2) {
        setIsTruncated(true);
      }
    }
  }, [description]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={cardVariants({ size: finalSize, cursor })}>
      <div
        className={`h-full flex flex-col border-none border-opacity-60 rounded-lg overflow-hidden bg-gray-200 ${
          transparent
            ? "hover:bg-primary_blue_transparent_hover hover:text-primary_blue"
            : "hover:bg-primary_blue_hover hover:text-white"
        } shadow-xl`}
      >
        <PFileFetcher fileName={image} alt={title} />
        <div className="p-6 flex flex-col flex-grow transition duration-300 ease-in">
          <h1 className="text-2xl font-semibold mb-1">{title}</h1>
          <h2 className="text-base font-medium text-secondary_blue mb-3">
            {subtitle}
          </h2>
          <div className="leading-relaxed mb-3 flex-grow">
            <p
              ref={descriptionRef}
              className={`transition-all duration-300 ease-in-out ${
                isExpanded ? "" : "line-clamp-3"
              }`}
            >
              {description}
            </p>
          </div>
          <div className="mt-auto flex items-center justify-between">
            {isTruncated && (
              <button
                className="text-secondary_blue mt-2"
                onClick={toggleExpand}
              >
                {isExpanded ? "Ver menos" : "Ver mais"}
              </button>
            )}
            {link && <PDefaultButton href={link} />}
          </div>
        </div>
      </div>
    </div>
  );
}
