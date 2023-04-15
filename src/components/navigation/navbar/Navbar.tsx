import UserMenu from "./UserMenu";

const Navbar = () => {
  return (
    <div
      className={`flex shadow-md z-10 items-center justify-start px-2 space-x-2 bg-themeMedium h-24 w-full`}
    >
      <UserMenu />
    </div>
  );
};

export default Navbar;
