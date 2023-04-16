import { useRouter } from "next/router";
import { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { AuthContext } from "../../../contexts/AuthContext";
import TopBarButton from "../../buttons/TopBarButton";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const router = useRouter();

  return (
    <div
      className={`flex shadow-md z-10 items-center space-x-4  justify-end px-2 bg-themeDarker h-12 w-full`}
    >
      {!user ? (
        <>
          <TopBarButton
            label={"Faça login"}
            clickAction={() => alert("entrei")}
          />
          <div className="border rounded-md px-2 hover:bg-themeLighter">
            <TopBarButton
              label={"CADASTRE-SE"}
              clickAction={() => alert("entrei")}
            />
          </div>
        </>
      ) : (
        <>
          <TopBarButton
            label={"Meu Cadastro"}
            clickAction={() => alert("entrei")}
          />
          <TopBarButton
            label={"Minhas Compras"}
            clickAction={() => router.push("purchases")}
          />
        </>
      )}
      <div className="text-themeTextLight pr-4">
        <FaShoppingCart
          className="flex justify-center cursor-pointer text-themeTextLight font-semibold p-1 rounded-md hover:bg-themeLighter active:bg-transparent  hover:text-themeDarker active:text-themeTextLight"
          size={38}
        />
      </div>
    </div>
  );
};

export default Navbar;
