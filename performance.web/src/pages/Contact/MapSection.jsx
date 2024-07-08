import React from "react";

const MapSection = () => {
  return (
    <div className="w-full h-96 -mb-4">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.5823441324633!2d-49.227367974021604!3d-16.697770695849595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ef1b62f8100d3%3A0x4769baf8de8a6d19!2sPerformance!5e0!3m2!1spt-BR!2sbr!4v1720190598350!5m2!1spt-BR!2sbr"
        width="100%"
        height="100%"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default MapSection;
