import { useRouter } from "next/router";
import { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { AuthContext } from "../../../contexts/AuthContext";
import { CartContext } from "../../../contexts/CartContext";
import TopBarButton from "../../buttons/TopBarButton";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const { cart } = useContext(CartContext);

  const router = useRouter();

  return (
    <>
      <div
        className={`flex z-50 shadow-md items-center space-x-4  justify-end px-2 bg-themeDarker h-12 w-full`}
      >
        {!user?.name ? (
          <>
            <TopBarButton
              label={"Faça login"}
              clickAction={() => {
                router.push("login");
              }}
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
            <div className="text-themeTextLight font-normal">
              Olá, {user.name}
            </div>
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
        <div
          title="Ir para o Carrinho"
          className="flex justify-center cursor-pointer text-themeTextLight pr-4"
          onClick={() => router.push("cart")}
        >
          <FaShoppingCart
            className="flex justify-center text-themeTextLight font-semibold p-1 rounded-md "
            size={38}
          />
          {cart.length > 0 && (
            <div className="flex absolute justify-center text-themeTextLight">
              <div className="flex text-sm ml-4 justify-center w-6 bg-red-600 px-1 rounded-full font-bold">
                {cart.length > 9 ? "9+" : cart.length}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
