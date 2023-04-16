/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { ButtonSolid } from "../../buttons/ButtonSolid";
import { BodyCard } from "../../cards/BodyCard";
import Loader from "../../loader/Loader";

type Props = {
  id?: string;
  setModal: Function;
  product: any;
};

export const FormDetails = ({ id, setModal, product }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [animation, setAnimation] = useState<string>("animate-showIn");

  const handleAddCart = (data: any) => {
    setIsLoading(true);
  };

  var currPrice = `${(
    parseFloat(product.price) - parseFloat(product.discount_value)
  ).toFixed(2)}`;

  return (
    <>
      {isLoading && <Loader />}

      <div
        className={`fixed z-40 bg-black/50 scrollbar w-full min-h-full flex space-x-2 justify-center align-center items-center`}
      >
        <div className={`${animation} max-h-screen max-w-[30vw]`}>
          <BodyCard title={product.name}>
            <div className="p-2">
              <div className={`py-2`}>
                <img
                  src={product.gallery[0]}
                  alt={product.name}
                  className="h-auto border-b p-2"
                />
                <div className="p-2">
                  {product.has_discount && (
                    <div className="text-md text-gray-700 line-through">
                      De: R$ {product.price.replace(".", ",")}
                    </div>
                  )}
                  <div className="text-2xl div-2 pb-2 text-gray-700">
                    Por: R$ {currPrice.replace(".", ",")}
                  </div>
                  <div className="px-2 py-1 antialiased w-full text-sm text-gray-900">
                    <b>Descrição: </b>
                    {product.description}
                  </div>
                  <div className="px-2 py-1 antialiased w-full text-sm text-gray-900">
                    <b>Material: </b>
                    {product.material}
                  </div>
                  <div className="px-2 py-1 antialiased w-full text-sm text-gray-900">
                    <b>Categoria: </b>
                    {product.category}
                  </div>
                  <div className="px-2 py-1 antialiased w-full text-sm text-gray-900">
                    <b>Depatamento: </b>
                    {product.department}
                  </div>
                </div>
                <div
                  className={`flex w-full space-x-4 py-2 items-end justify-end`}
                >
                  <ButtonSolid
                    id={"save"}
                    label={"Adicionar ao Carrinho"}
                    color={"success"}
                    onClick={handleAddCart}
                  />
                  <ButtonSolid
                    id={"cancel"}
                    label={"Voltar"}
                    color={"default"}
                    onClick={() => setModal(false)}
                  />
                </div>
              </div>
            </div>
          </BodyCard>
        </div>
      </div>
    </>
  );
};

export default FormDetails;
