import { AxiosError } from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ErrorAlert } from "../../components/alerts/ErrorAlert";
import { SimpleCard } from "../../components/cards/SimpleCard";
import InputTextFilter from "../../components/input/InputTextFilter";
import InputTextSearch from "../../components/input/InputTextSearch";
import Loader from "../../components/loader/Loader";
import Navigation from "../../components/navigation/Navigation";
import FormDetails from "../../components/templates/forms/FormDetails";
import { api } from "../../services/api";

type FiltersType = {
  material: string;
  category: string;
  department: string;
  name: string;
};
const Index = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [modal, setModal] = useState<boolean>();
  const [modalTemplate, setModalTemplate] = useState<JSX.Element>(<></>);
  const [filters, setFilters] = useState<FiltersType>({
    material: "",
    category: "",
    department: "",
    name: "",
  });

  const [loading, setLoading] = useState(true);
  const [filterProducts, setFilterProducts] = useState<any[]>([]);

  const getProducts = async () => {
    await api
      .get("products")
      .then(async ({ data }: any) => {
        await Promise.resolve(setProducts(data));
        await Promise.resolve(
          setFilterProducts(
            data.map((product: any, index: number) => {
              return (
                <SimpleCard
                  key={index}
                  product={product}
                  clickAction={async () => {
                    await Promise.resolve(
                      setModalTemplate(
                        <FormDetails
                          id={index + product.product_id}
                          product={product}
                          setModal={setModal}
                        />
                      )
                    ).then(() => {
                      setModal(true);
                    });
                  }}
                />
              );
            })
          )
        );
        setLoading(false);
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
          product.material.toLowerCase().includes(material.toLowerCase()) &&
          product.name.toLowerCase().includes(name.toLowerCase()) &&
          product.category.toLowerCase().includes(category.toLowerCase()) &&
          product.department.toLowerCase().includes(department.toLowerCase())
        );
      })
    );

    setFilterProducts(
      filteredProducts.map((product: any, index: number) => {
        return (
          <SimpleCard
            key={index}
            product={product}
            clickAction={async () => {
              await Promise.resolve(
                setModalTemplate(
                  <FormDetails
                    id={index + product.product_id}
                    product={product}
                    setModal={setModal}
                  />
                )
              ).then(() => {
                setModal(true);
              });
            }}
          />
        );
      })
    );
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

      {loading && <Loader />}
      <Navigation>
        <div
          className={`flex shadow-md space-x-4 z-10 justify-start items-center px-2 bg-themeMedium h-20 w-full`}
        >
          <div className="flex w-1/4 pl-2 items-start text-themeTextLight ">
            <Image
              className="pt-10 origin-top"
              src="/logo-tr-2.png"
              alt="V-Store Logo"
              width={90}
              height={90}
            />
          </div>
          <div className="flex w-2/4 justify-end">
            <InputTextSearch
              id={"search"}
              placeholder={"Pesquise pelo nome do Produto..."}
              label={""}
              searchAction={async (value: string) => {
                await handleSearch(value);
              }}
            />
          </div>
        </div>

        <div
          className={`flex shadow-md space-x-4 z-10 items-start justify-center py-2 bg-themeDark w-full h-12`}
        >
          <div className="flex items-center space-x-4 justify-between w-2/3 text-themeTextLight">
            <InputTextFilter
              id={"materialFilter"}
              placeholder={"Pesquise o material..."}
              label={"Material"}
              changeAction={function (value: string): void {
                setFilters({ ...filters, material: value });
              }}
            />

            <InputTextFilter
              id={"categoryFilter"}
              placeholder={"Pesquise a categoria..."}
              label={"Categoria"}
              changeAction={function (value: string): void {
                setFilters({ ...filters, category: value });
              }}
            />

            <InputTextFilter
              id={"departmentFilter"}
              placeholder={"Pesquise o departamento..."}
              label={"Departamento"}
              changeAction={function (value: string): void {
                setFilters({ ...filters, department: value });
              }}
            />
          </div>
        </div>
        <div className={`w-full min-h-screen p-2`}>
          <div className="flex flex-col md:space-y-4">
            <div className="flex">
              <div className={`flex flex-wrap justify-center py-4 w-full`}>
                {filterProducts.map((p) => p)}
              </div>
            </div>
          </div>
        </div>
      </Navigation>
      <footer
        className={`flex border-t text-sm flex-col items-center bg-themeDarker justify-center`}
      >
        <div className="w-full font-normal antialiased text-white text-center truncate py-2">
          ©{process.env.NEXT_PUBLIC_OWNER} {new Date().getFullYear()}
        </div>
      </footer>
    </>
  );
};

export default Index;
