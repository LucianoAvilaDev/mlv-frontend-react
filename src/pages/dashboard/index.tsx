import { AxiosError } from "axios";
import { GetServerSideProps } from "next";
import { useContext, useEffect, useState } from "react";
import { ErrorAlert } from "../../components/alerts/ErrorAlert";
import InputTextSearch from "../../components/input/InputTextSearch";
import Navigation from "../../components/navigation/Navigation";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import { getApiClient } from "../../services/getApiClient";

type ProductType = {};

type FiltersType = {
  material: string;
  category: string;
  department: string;
  name: string;
};
const Index = () => {
  const { user } = useContext(AuthContext);

  const [products, setProducts] = useState<any[]>([]);
  const [modal, setModal] = useState<boolean>();
  const [modalTemplate, setModalTemplate] = useState<JSX.Element>(<></>);
  const [filters, setFilters] = useState<FiltersType>({
    material: "",
    category: "",
    department: "",
    name: "",
  });
  const [filterProducts, setFilterProducts] = useState<any[]>([]);

  const getProducts = async () => {
    await api
      .get("products")
      .then(({ data }: any) => {
        console.log(data);
        setProducts(data);
        setFilterProducts(data);
      })
      .catch((e: AxiosError) => ErrorAlert(e.response?.data as string));
  };

  const getProductsWithFilters = async ({
    material,
    category,
    department,
    name,
  }: FiltersType) => {
    var filteredProducts = await Promise.resolve(
      products.filter((product) => {
        return (
          product.material.includes(material) &&
          product.name.includes(name) &&
          product.category.includes(category) &&
          product.department.includes(department)
        );
      })
    );

    setFilterProducts(filteredProducts);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleSearch = async (searchText: string) => {
    const newFilters = { ...filters, name: searchText };
    await getProductsWithFilters(newFilters);
    setFilters(newFilters);
  };

  return (
    <>
      {modal && modalTemplate}
      <Navigation>
        <div
          className={`flex shadow-md z-10 items-center justify-start px-2 space-x-2 bg-themeMedium h-20 w-full`}
        >
          <InputTextSearch
            id={"search"}
            placeholder={"Faça aqui a sua busca..."}
            label={""}
            searchAction={async (value: string) => {
              await handleSearch(value);
            }}
          />
        </div>
        <div className={`w-full min-h-screen P-2`}>
          <div className="flex flex-col md:space-y-4">
            <div className="flex">
              <div className={`px-3 space-y-4  w-full`}>
                {filterProducts.map((p) => p.name)}
              </div>
            </div>
          </div>
        </div>
      </Navigation>
    </>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient: any = getApiClient(ctx);
  return {
    props: {},
  };
};
