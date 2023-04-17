import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorAlert } from "../../components/alerts/ErrorAlert";
import { SuccessAlert } from "../../components/alerts/SuccessAlert";
import { ButtonSolid } from "../../components/buttons/ButtonSolid";
import InputDate from "../../components/input/InputDate";
import InputEmail from "../../components/input/InputEmail";
import InputPassword from "../../components/input/InputPassword";
import InputText from "../../components/input/InputText";
import InputTextMasked from "../../components/input/InputTextMasked";
import Loader from "../../components/loader/Loader";
import Navigation from "../../components/navigation/Navigation";
import { AuthContext } from "../../contexts/AuthContext";
import { UsersSchema } from "../../schemas/UsersSchema";
import { api } from "../../services/api";

export default function Index() {
  const { signIn } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UsersSchema()),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSave = (data: any) => {
    data.cpf = data.cpf.replace(/\D/g, "");
    data.cep = data.cep.replace(/\D/g, "");
    data.phone = data.phone.replace(/\D/g, "");

    setIsLoading(true);
    api
      .post(`register`, data)
      .then(async () => {
        SuccessAlert("Usuário cadastrado com sucesso!");
        await signIn({ email: data.email, password: data.password });
        setIsLoading(false);
        return;
      })
      .catch(({ response }: AxiosError) => {
        ErrorAlert(
          (response?.data as string) ??
            "Houve um erro! Tente novamente mais tarde."
        );
        setIsLoading(false);
        return;
      });
  };

  useEffect(() => {
    if (parseCookies().token) {
      router.push("dashboard");
    }
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <Navigation>
        <div className="flex justify-center bg-themeBgBody h-screen w-full">
          <div className="absolute justify-center transition-all maw-w-1.5 w-1/3 p-2 animate-showIn">
            <header
              className={`flex mx-2 items-center border-b justify-center`}
            >
              <div className="p-2 py-6 antialiased truncate w-full text-center text-4xl font-medium text-gray-900">
                Criar conta
              </div>
            </header>
            <form onSubmit={handleSubmit(handleSave)}>
              <div className={`grid grid-cols-12 pt-2 pb-8`}>
                <div className="p-2 col-span-8">
                  <InputText
                    register={register("name")}
                    id={`name`}
                    name={"name"}
                    placeholder={"Digite o nome..."}
                    label={"Nome"}
                    errorMessage={errors?.name?.message}
                  />
                </div>
                <div className="p-2 col-span-4">
                  <InputDate
                    register={register("birth_date")}
                    id={`birth_date`}
                    name={"birth_date"}
                    label={"Nome"}
                    errorMessage={errors?.date?.message}
                  />
                </div>
                <div className="p-2 col-span-6">
                  <InputTextMasked
                    register={register("cpf")}
                    id={"cpf"}
                    name={"cpf"}
                    placeholder={"Digite o CPF..."}
                    label={"CPF"}
                    mask={"000.000.000-00"}
                    errorMessage={errors?.cpf?.message}
                  />
                </div>
                <div className="p-2 sm:col-span-6 col-span-12">
                  <InputEmail
                    register={register("email")}
                    id={`email`}
                    placeholder={"Digite o e-mail..."}
                    label={"E-mail"}
                    errorMessage={errors?.email?.message}
                  />
                </div>
                <div className="p-2 col-span-6">
                  <InputPassword
                    register={register("password")}
                    id={`password`}
                    name={`password`}
                    placeholder={"Digite a senha..."}
                    label={"Senha"}
                    errorMessage={errors?.password?.message}
                  />
                </div>
                <div className="p-2 col-span-6">
                  <InputPassword
                    register={register("passwordConfirm")}
                    id={`passwordConfirm`}
                    name={`passwordConfirm`}
                    placeholder={"Repita a senha..."}
                    label={"Confirmar Senha"}
                    errorMessage={errors?.passwordConfirm?.message}
                  />
                </div>
                <div className="p-2 col-span-12">
                  <InputText
                    register={register("address")}
                    id={`address`}
                    name={"address"}
                    placeholder={"Digite o endereço..."}
                    label={"Endereço"}
                    errorMessage={errors?.address?.message}
                  />
                </div>
                <div className="p-2 col-span-6">
                  <InputTextMasked
                    register={register("cep")}
                    id={"cep"}
                    name={"cep"}
                    placeholder={"Digite o CEP..."}
                    label={"CEP"}
                    mask={"00000-000"}
                    errorMessage={errors?.cep?.message}
                  />
                </div>
                <div className="p-2 col-span-6">
                  <InputTextMasked
                    register={register("phone")}
                    id={"phone"}
                    name={"phone"}
                    placeholder={"Digite o Telefone..."}
                    label={"Telefone"}
                    mask={"(00) 0 0000-0000"}
                    errorMessage={errors?.phone?.message}
                  />
                </div>
              </div>
              <div
                className={`flex w-full space-x-4 items-center justify-center`}
              >
                <div className={`w-full`}>
                  <ButtonSolid
                    id={"save"}
                    label={"Cadastrar"}
                    color={"success"}
                    type={"submit"}
                  />
                </div>
                <div className={`w-full`}>
                  <ButtonSolid
                    id={"cancel"}
                    label={"Cancelar"}
                    color={"default"}
                    onClick={() => router.push("dashboard")}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </Navigation>
    </>
  );
}
