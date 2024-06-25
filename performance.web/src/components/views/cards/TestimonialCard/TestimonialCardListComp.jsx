import React from "react";
import Testimonial from "./TestimonialComp";

export default function TestimonialList({ size, cursor, testimonials = [] }) {
  return (
    <div className="flex flex-wrap justify-center items-center">
      {testimonials.map((testimonial, index) => (
        <div key={index} className="p-4 w-full 2xl:w-1/2">
          <Testimonial
            size={size}
            cursor={cursor}
            name={testimonial.name}
            role={testimonial.role}
            text={testimonial.text}
            image={testimonial.image}
          />
        </div>
      ))}
    </div>
  );
}