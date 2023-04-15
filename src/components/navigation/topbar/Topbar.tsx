import { useRouter } from "next/router";
import { useContext } from "react";
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
          <div className="text-themeTextLight">Olá, </div>
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
    </div>
  );
};

export default Navbar;
