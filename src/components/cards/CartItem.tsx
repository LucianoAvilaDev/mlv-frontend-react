import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { ButtonSolid } from "../buttons/ButtonSolid";

/* eslint-disable @next/next/no-img-element */
const CartItem = ({ product, setList }: any) => {
  const { cart, editInCart, removeFromCart } = useContext(CartContext);

  var currPrice = `${(
    parseFloat(product.price) - parseFloat(product.discount_value)
  ).toFixed(2)}`;
  return (
    <div
      className="w-full bg-gray-100 rounded-md mb-4 border-b-lg shadow-md"
      key={product.id + product.provider}
    >
      <div className="flex p-2">
        <img src={product.gallery[0]} alt={product.name} className="h-44 p-2" />
        <div className="p-2 text-lg">
          <b>{product.name}</b>
          {product.has_discount && (
            <div className="text-md text-gray-700 line-through">
              De: R$ {product.price.replace(".", ",")}
            </div>
          )}
          <div className="text-2xl div-2 pb-2 text-gray-700">
            Por: R$ {currPrice.replace(".", ",")}
          </div>
          <div className="overflow-ellipsis text-sm text-gray-900">
            <b>Descrição: </b>
            {product.description}
          </div>
          <div className="w-12 py-2 ">
            <input
              className="w-16 border-gray-600 rounded-md text-start border-1 shadow-md text-sm px-2 py-1 "
              type="number"
              min={1}
              defaultValue={product.quantity}
              onClick={async (e) => {
                await editInCart(product, e.currentTarget.value);
                setList();
              }}
            />
          </div>
        </div>
        <div>
          <ButtonSolid
            id={"delete" + product.id}
            label={"Remover"}
            color={"danger"}
            onClick={async () => {
              await removeFromCart(product);
              setList();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
