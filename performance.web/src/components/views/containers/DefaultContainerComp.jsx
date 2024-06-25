import { useScroll } from "../../../hooks";

export default function DefaultContainer({ children, className }) {
  const isShrunk = useScroll(50);
  return (
    <div
      className={`${
        isShrunk ? "" : "pt-[8vh] transition-all duration-300"
      } ${className}`}
    >
      {children}
    </div>
  );
}
