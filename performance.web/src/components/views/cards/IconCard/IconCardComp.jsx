import React from "react";
import { PFileFetcher } from "../../..";
import { Link } from "react-router-dom";

export default function IconCardComp({
  image,
  subtitle,
  title,
  description,
  link,
  size,
  cursor,
  buttonTitle
}) {

  return (
    <div className="group relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10 flex">
      <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-secondary_blue transition-all duration-300 group-hover:scale-[15]"></span>
      <div className="relative z-10 mx-auto max-w-md flex flex-col justify-between">
        <span className="grid h-20 w-20 place-items-center rounded-full bg-sky-300 transition-all duration-300 group-hover:bg-gray-200">
          <PFileFetcher width={40} height={40} fileName={image} alt={title} />
        </span>
        <div>
          <h1 className="text-2xl font-semibold mb-1 text-primary_blue">{title}</h1>
          <div className="my-2">
            <h2 className="text-base font-medium text-secondary_blue">
              {subtitle}
            </h2>
          </div>
          <div
            className="text-base leading-7 text-primary_blue transition-all duration-300 group-hover:text-white/90">
            <p>{description}</p>
          </div>
        </div>
        <div className="pt-5 text-base font-bold leading-7">
          <p>
            <Link to={link} className="flex text-secondary_blue transition-all duration-300 group-hover:text-white">{buttonTitle}
              <p className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-2">&rarr;</p>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
