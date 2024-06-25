import React from "react";
import { FaRegFilePdf } from "react-icons/fa6";

const PDFLink = ({ path }) => {
  const openPDF = () => {
    window.open(path, "_blank");
  };

  return (
    <div>
      <FaRegFilePdf
        size={70}
        color="red"
        onClick={openPDF}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};

export default PDFLink;
