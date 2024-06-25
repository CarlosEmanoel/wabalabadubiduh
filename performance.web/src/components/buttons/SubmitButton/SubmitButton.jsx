export default function SubmitButton({
  condition,
  color,
  onClick,
  bgColor,
  bgHoverColor,
  buttonCursor,
  buttonTitle,
  _buttonTitle,
  buttonIcon,
  disabled,
  href,
}) {
  return (
    <button
      disabled={disabled}
      href={href}
      onClick={onClick}
      className={`select-none inline-flex cursor-pointer items-center px-3 py-2 text-sm font-medium text-center ${buttonCursor} ${
        color ? `text-${color}` : "text-white"
      } ${
        bgColor
          ? `bg-${bgColor} hover:bg-${bgHoverColor}`
          : "bg-secondary_blue hover:bg-secondary_blue_hover"
      } rounded-md`}
    >
      {condition ? _buttonTitle : buttonTitle}
      {buttonIcon && buttonIcon}
    </button>
  );
}
