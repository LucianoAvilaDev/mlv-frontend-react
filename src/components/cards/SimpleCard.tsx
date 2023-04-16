import { useState } from "react";

/* eslint-disable @next/next/no-img-element */
export const SimpleCard = ({ product, clickAction }: any) => {
  const [details, setDetails] = useState(false);

  var currPrice = `${(
    parseFloat(product.price) - parseFloat(product.discount_value)
  ).toFixed(2)}`;
  return (
    <>
      <div
        onClick={clickAction}
        className="max-w-[16rem] rounded-lg m-4 bg-white shadow-md duration-200 hover:cursor-pointer hover:scale-105 hover:shadow-xl"
      >
        <img
          src={product.gallery[0]}
          alt={product.name}
          className="h-auto w-full border-b p-2"
        />
        <div className="p-2">
          {product.has_discount && (
            <div
              className="text-md
           text-gray-700 line-through"
            >
              De: R$ {product.price.replace(".", ",")}
            </div>
          )}
          <div
            className="text-2xl
           div-2 text-gray-700"
          >
            Por: R$ {currPrice.replace(".", ",")}
          </div>
          <div className="p-2 antialiased  w-full text-lg text-gray-900">
            {product.name}
          </div>
        </div>
      </div>
    </>
  );
};
