type TopBarButtonType = {
  label: string;
  clickAction: () => void;
};

const TopBarButton = ({ label, clickAction }: TopBarButtonType) => {
  return (
    <div className="flex justify-center cursor-pointer text-themeTextLight font-semibold p-1 rounded-md hover:bg-themeLighter active:bg-transparent  hover:text-themeDarker active:text-themeTextLight">
      <div onClick={clickAction}>{label}</div>
    </div>
  );
};

export default TopBarButton;
