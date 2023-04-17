import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { ErrorAlert } from "../../components/alerts/ErrorAlert";
import { ButtonSolid } from "../../components/buttons/ButtonSolid";
import InputEmail from "../../components/input/InputEmail";
import InputPassword from "../../components/input/InputPassword";
import { Link } from "../../components/input/Link";
import Loader from "../../components/loader/Loader";
import Logo from "../../components/logo/Logo";
import Navigation from "../../components/navigation/Navigation";
import { AuthContext } from "../../contexts/AuthContext";

export default function Index() {
  const { user, signIn } = useContext(AuthContext);

  const schema = object({
    email: string().required("Campo obrigatório!").email("E-mail inválido"),
    password: string().required("Campo obrigatório!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  async function handleSignIn(data: any) {
    try {
      setIsLoading(true);
      await signIn(data);
    } catch (e: any) {
      ErrorAlert(
        e.response?.status == 400
          ? "Usuário ou senha inválido(s)."
          : "Erro! Tente novamente mais tarde."
      );
      setIsLoading(false);
    }
  }

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  return (
    <>
      {isLoading && <Loader />}
      <Navigation>
        <div className="flex justify-center bg-themeBgBody h-screen w-full">
          <div className="absolute top-20 justify-center transition-all maw-w-1.5 w-1/4 p-2 animate-showIn">
            <Logo />
            <form
              className="pt-6 pb-2 space-y-4 px-4"
              onSubmit={handleSubmit(handleSignIn)}
            >
              <div>
                <InputEmail
                  id={"email"}
                  register={register("email")}
                  label={"E-mail:"}
                  placeholder={"Digite seu e-mail"}
                  errorMessage={errors?.email?.message}
                />
              </div>
              <div>
                <InputPassword
                  id={"password"}
                  register={register("password")}
                  name={"password"}
                  placeholder={"Digite a senha"}
                  label={"Senha:"}
                  errorMessage={errors?.password?.message}
                />
              </div>

              <div className="flex flex-col space-y-4 py-4 items-center justify-center">
                <div className="flex w-full space-x-4">
                  <ButtonSolid
                    id={"register"}
                    label={"Cadastrar-se"}
                    color={"primary"}
                    onClick={() => router.push("register")}
                  />
                  <ButtonSolid
                    id={"save"}
                    label={"Entrar"}
                    color={"success"}
                    type={"submit"}
                  />
                </div>
                <Link url="recover" text="Esqueceu sua senha?" />
              </div>
            </form>
          </div>
        </div>
      </Navigation>
    </>
  );
}
