/* eslint-disable react-hooks/rules-of-hooks */
import { AxiosInstance } from "axios";
import moment from "moment";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { parseCookies, setCookie } from "nookies";
import { useContext, useEffect, useState } from "react";
import { ErrorAlert } from "../../components/alerts/ErrorAlert";
import { SuccessAlert } from "../../components/alerts/SuccessAlert";
import { ButtonSolid } from "../../components/buttons/ButtonSolid";
import CartItem from "../../components/cards/CartItem";
import PaymentCard from "../../components/cards/PaymentCard";
import Loader from "../../components/loader/Loader";
import Navigation from "../../components/navigation/Navigation";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import { getApiClient } from "../../services/getApiClient";

const Index = () => {
  const { user, isLoading, setIsLoading } = useContext(AuthContext);

  const [modal, setModal] = useState<boolean>(false);
  const [modalTemplate, setModalTemplate] = useState<JSX.Element>(<></>);
  const [purchase, setPurchase] = useState({});
  const [cartList, setCartList] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);

  const router = useRouter();

  const setList = async () => {
    const thisCart = JSON.parse(parseCookies().cartCookie);

    const allItems = thisCart.sort((a: any, b: any) =>
      a.name < b.name ? -1 : 1
    );

    await Promise.resolve(
      setCartList(
        allItems.map((item: any) => {
          return (
            <CartItem
              key={item.id + item.provider}
              product={item}
              setList={setList}
            />
          );
        })
      )
    );
  };

  useEffect(() => {
    setList();
  }, []);

  return (
    <>
      {modal && modalTemplate}
      {isLoading && <Loader />}
      <Navigation>
        <div className="flex justify-center h-screen w-full">
          <div className="absolute justify-center transition-all w-3/4 p-2 animate-showIn">
            <header
              className={`flex flex-col mx-2 items-center border-gray-300 border-b mb-4 justify-center`}
            >
              <div className="p-2 py-4 antialiased truncate w-full text-center text-4xl font-medium text-gray-900">
                Meu Carrinho
              </div>
            </header>
            {cartList.length > 0 ? (
              <div className="flex justify-between w-full">
                <div className="w-2/3 px-2 ">
                  <div className="flex flex-col mb-2 w-full">
                    {cartList.map((item) => item)}
                  </div>
                </div>
                <div className="w-1/3">
                  <div className="flex flex-col p-2 border border-gray-300 h-fit rounded-md shadow-lg">
                    <PaymentCard />
                    <div className="space-y-4 py-4">
                      <ButtonSolid
                        id={"finish"}
                        label={"Finalizar compra"}
                        color={"success"}
                        onClick={async () => {
                          const items = JSON.parse(parseCookies().cartCookie);
                          let itemsTotals: number[] = items.map(
                            (item: any) => item.total
                          );

                          let purchase = {
                            client_id: user?.id,
                            date_time: moment(Date.now()).format(
                              "YYYY-MM-DD HH:mm:ss"
                            ),
                            total: itemsTotals.reduce(
                              (accumulator, value) => accumulator + value,
                              0
                            ),
                            products: items,
                          };

                          await api
                            .post("/purchases", purchase)
                            .then(() => {
                              SuccessAlert("Compra realizada com sucesso!");
                              setCookie(
                                undefined,
                                "cartCookie",
                                JSON.stringify([{}])
                              );
                              router.push("dashboard");
                            })
                            .catch((e) => ErrorAlert(e.toString()));
                        }}
                      />
                      <ButtonSolid
                        id={"keep"}
                        label={"Continuar comprando"}
                        color={"primary"}
                        onClick={() => router.push("dashboard")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center ">
                <div className="text-center text-2xl pt-10">
                  O carrinho está vazio!
                </div>
                <div className="flex py-8 w-1/4">
                  <ButtonSolid
                    id={"buyMore"}
                    label={"Voltar às Compras"}
                    color={"primary"}
                    onClick={() => router.push("dashboard")}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Navigation>
    </>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const apiClient: AxiosInstance = getApiClient(ctx);

  return {
    props: {},
  };
};
