import Content from "./content/Content";
import Topbar from "./topbar/Topbar";

const Navigation = ({ children }: any) => {
  return (
    <>
      <div className={`flex w-full`}>
        <div className={`flex flex-col  justify-center w-full`}>
          <Topbar />
          <Content className={`h-full`}>{children}</Content>
        </div>
      </div>
    </>
  );
};

export default Navigation;
