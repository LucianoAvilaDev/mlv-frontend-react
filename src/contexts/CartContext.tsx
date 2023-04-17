import { parseCookies, setCookie } from "nookies";
import { createContext, useEffect, useState } from "react";
import { SuccessAlert } from "../components/alerts/SuccessAlert";
import { WarningAlert } from "../components/alerts/WarningAlert ";

type CartContextType = {
  cart: any[];
  addInCart: Function;
  editInCart: Function;
  removeFromCart: Function;
};

export const CartContext = createContext({} as CartContextType);

export function CartProvider({ children }: any) {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const { cartCookie } = parseCookies();

    if (!cartCookie && cart.length === 0) {
      setCookie(undefined, "cartCookie", JSON.stringify(cart));
    } else {
      setCart(JSON.parse(cartCookie));
    }
  }, []);

  const addInCart = (product: any) => {
    const cartItemsFiltered = cart.filter((item) => {
      return item.id === product.id && item.provider === product.provider;
    });
    if (cartItemsFiltered.length > 0) {
      WarningAlert("Produto já presente no carrinho.");
      return;
    }

    const newProduct = {
      ...product,
      quantity: 1,
      total: parseFloat(product.price) - parseFloat(product.discount_value),
    };

    setCart([...cart, newProduct]);
    setCookie(undefined, "cartCookie", JSON.stringify([...cart, newProduct]));
    SuccessAlert("Produto adicionado ao carrinho");
  };

  const editInCart = async (product: any, quantity: number) => {
    const thisCart = JSON.parse(parseCookies().cartCookie);

    const cartItemsFiltered = thisCart.filter((item: any) => {
      if (item.id === product.id && item.provider === product.provider) {
        return false;
      }
      return true;
    });

    const newProduct = {
      ...product,
      quantity: quantity,
      total:
        (parseFloat(product.price) - parseFloat(product.discount_value)) *
        quantity,
    };

    const allItems = [...cartItemsFiltered, newProduct].sort((a: any, b: any) =>
      a.name < b.name ? -1 : 1
    );

    setCart(allItems);

    await Promise.resolve(
      setCookie(undefined, "cartCookie", JSON.stringify(allItems))
    );
  };

  const removeFromCart = (product: any) => {
    const thisCart = JSON.parse(parseCookies().cartCookie);

    const cartItemsFiltered = thisCart.filter((item: any) => {
      if (item.id === product.id && item.provider === product.provider) {
        return false;
      }
      return true;
    });

    setCart(cartItemsFiltered);
    setCookie(undefined, "cartCookie", JSON.stringify(cartItemsFiltered));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addInCart,
        removeFromCart,
        editInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
