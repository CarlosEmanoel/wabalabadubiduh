import React from "react";

const AccordionItem = ({ index, title, content, isOpen, onToggle }) => {
  return (
    <div
      onClick={() => onToggle(index)}
      className="accordion-item cursor-pointer text-primary_blue"
    >
      <div className="accordion-title p-4 hover:bg-slate-100 bg-slate-200 flex justify-between items-center font-semibold">
        {title}
        <span
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </div>
      <div
        className={`bg-white accordion-content overflow-hidden transition-all duration-300 border rounded-br-2xl rounded-bl-2xl border-slate-800 ${
          isOpen ? "max-h-max border-b" : "max-h-0"
        }`}
      >
        <div
          className="pt-4 px-4 w-[96%] pb-4"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

export default AccordionItem;
