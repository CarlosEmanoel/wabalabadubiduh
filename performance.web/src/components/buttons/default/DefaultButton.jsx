import React from "react";
import { buttonVariants } from "../../../styles/variants";
import useResponsive from "../../../hooks/layouts/responsivity/useResponsive";

export default function DefaultButton({ size, color, children, bg, onClick, disabled }) {
  const screenSize = useResponsive();
  const finalSize = size || screenSize;

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={buttonVariants({
        size: finalSize,
        color,
        text: finalSize,
        bg,
      })}
    >
      {!children ? "Saiba Mais" : children}
    </button>
  );
}
