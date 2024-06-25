import React from "react";
import { PFileFetcher } from "../..";
import { buttonIconVariants } from "../../../styles/variants";
import useResponsive from "../../../hooks/layouts/responsivity/useResponsive";

export default function AnimatedIconButton({
  size,
  color,
  children,
  type,
  href,
  icon,
}) {
  const screenSize = useResponsive();
  const finalSize = size || screenSize;

  return (
    <a
      href={href}
      className={buttonIconVariants({
        size: finalSize,
        color,
        text: finalSize,
      })}
    >
      <p className={buttonIconVariants({ type: type })}>
        {!children ? "Saiba Mais" : children}
        {icon && (
          <a className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-2">
            <PFileFetcher fileName={icon} />
          </a>
        )}
      </p>
    </a>
  );
}
