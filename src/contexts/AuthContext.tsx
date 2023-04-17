import { AxiosResponse } from "axios";
import Router from "next/router";
import { parseCookies, setCookie } from "nookies";
import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

type SignInType = { email: string; password: string };

type UserType = {
  id: string | number;
  name: string;
  email: string;
  address: string;
  cep: string;
  cpf: string;
  phone: string;
  is_admin: boolean;
  birth_date: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  ref: string;
  setRef: Function;
  isLoading: boolean;
  setIsLoading: Function;
  user: UserType | null;
  signIn: (data: SignInType) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<UserType | null>(null);
  const [ref, setRef] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isAuthenticated = !!user;

  useEffect(() => {
    if (document) {
      setRef(document.location.href);
    }

    const { token } = parseCookies();

    if (token)
      api
        .get("get-auth-user")
        .then(async ({ data }: AxiosResponse<any, any>) => {
          await Promise.resolve(setUser(data));
        });
  }, []);

  const signIn = async (data: SignInType) => {
    const { token, user } = await api
      .post("login", {
        ...data,
      })
      .then((response: AxiosResponse) => response.data);

    setCookie(undefined, "token", token);

    api.defaults.headers["Authorization"] = `Bearer ${token}`;

    setUser(user);

    Router.push("dashboard");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        signIn,
        ref,
        setRef,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
