import React from "react";

export default function SectionContainer({
  title,
  subtitle,
  children,
  className,
  full
}) {
  return (
    <div className={`select-none ${className} flex items-center justify-center flex-col`}>
      <section className="md:h-full flex items-center text-gray-600">
        <div className="container px-5 py-5 mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl text-primary_blue font-semibold">
              {title}
            </h1>
            <h5 className="text-base md:text-lg text-secondary_blue mb-1">
              {subtitle}
            </h5>
          </div>
          {!full && children}
        </div>
      </section>
      {full && children}
    </div>
  );
}
