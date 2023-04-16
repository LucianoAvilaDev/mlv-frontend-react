type props = {
  id: string;
  placeholder: string;
  label: string;
  changeAction: (value: string) => void;
};

const InputTextFilter = ({ id, label, placeholder, changeAction }: props) => {
  return (
    <div className="flex items-center w-full text-md space-x-2">
      <label>{label}</label>
      <input
        key={id}
        placeholder={placeholder}
        className="rounded-md text-sm py-0.5 px-2 w-full text-black"
        type="text"
        onChange={(e) => changeAction(e.target.value)}
      />
    </div>
  );
};

export default InputTextFilter;
