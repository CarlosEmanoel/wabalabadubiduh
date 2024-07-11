/* teste */
const InputCheckboxToggle = ({ name, value, onChange }) => {
  return (
    <input
      id={name}
      name={name}
      value={value}
      checked={value}
      onChange={onChange}
      type="checkbox"
      className="
      relative 
      appearance-none 
      inline-block 
      h-[30px] 
      w-[54px]
      cursor-pointer 
      rounded-sm 
      bg-red-200
      shadow-md 
      transition-all 
      after:content-white_check_false
      after:absolute
      after:top-[3px]
      after:left-[3px]
      after:h-6
      after:w-6
      after:rounded-sm
      after:bg-red-500
      after:p-0.5
      after:shadow-sm
      after:transition-all
      checked:bg-green-200
      checked:after:content-white_check_true
      checked:after:translate-x-6
      checked:after:bg-green-500"
    />
  );
};

export default InputCheckboxToggle;
