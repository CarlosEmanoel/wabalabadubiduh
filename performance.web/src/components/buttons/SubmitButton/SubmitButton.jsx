export default function SubmitButton({
  condition,
  color = "white",
  onClick,
  bgColor = "secondary_blue",
  bgHoverColor = "secondary_blue_hover",
  buttonCursor,
  buttonTitle,
  _buttonTitle,
  buttonIcon,
  disabled,
  href,
  width,
}) {
  return (
    <button
      disabled={disabled}
      href={href}
      onClick={onClick}
      className={`
        w-full ${width} select-none inline-flex cursor-pointer items-center px-3 py-2 text-sm font-medium justify-center ${buttonCursor} 
        text-${color} bg-${bgColor} hover:bg-${bgHoverColor} rounded-md disabled:opacity-60 transition-all ease-in-out duration-500
      `}
    >
      {condition ? _buttonTitle : buttonTitle}
      {buttonIcon && buttonIcon}
    </button>
  );
}
