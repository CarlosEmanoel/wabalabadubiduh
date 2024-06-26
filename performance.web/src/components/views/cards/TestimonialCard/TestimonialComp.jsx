import React from "react";
import { PFileFetcher } from "../../..";

export default function Testimonial({ name, role, text, image }) {
  return (
    <figure className="md:flex bg-slate-100 rounded-xl p-8 md:p-0 justify-center items-center shadow-lg shadow-black_transparent">
      <div className="flex-shrink-0 flex justify-center items-center">
        <PFileFetcher 
          className="w-44 h-44 xl:w-80 xl:h-80 md:w-60 md:h-60 object-cover mx-auto md:mx-0 md:mr-6 md:rounded-xl rounded-full" 
          fileName={image} 
          alt={name} 
        />
      </div>
      <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
        <blockquote>
          <p className="text-xs lg:text-lg sm:text-sm font-medium text-primary_blue">
            {text}
          </p>
        </blockquote>
        <figcaption className="font-medium text-xs lg:text-lg sm:text-sm">
          <div className="text-secondary_blue">
            {name}
          </div>
          <div className="text-slate-700">
            {role}
          </div>
        </figcaption>
      </div>
    </figure>
  );
}

/* 

import React from "react";
import { PFileFetcher } from "../../..";

export default function Testimonial({ name, role, text, image }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 max-w-md mx-auto">
      <p className="text-gray-700 text-lg">{text}</p>
      <div className="mt-4 flex items-center">
        <PFileFetcher 
          className="w-16 h-16 rounded-full object-cover" 
          fileName={image} 
          alt={name} 
        />
        <div className="ml-4">
          <p className="text-gray-900 font-semibold">{name}</p>
          <p className="text-gray-600">{role}</p>
        </div>
      </div>
    </div>
  );
}



*/