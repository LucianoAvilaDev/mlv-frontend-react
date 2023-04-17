import { cpf } from "cpf-cnpj-validator";
import { object, string } from "yup";

export const UsersSchema = () => {
  return object({
    name: string()
      .required("Campo obrigatório!")
      .min(6, "No mínimo 6 caracteres")
      .max(200, "No máximo 200 caracteres"),
    email: string().email(),
    password: string()
      .required("Campo obrigatório!")
      .min(6, "No mínimo 6 caracteres")
      .max(200, "No máximo 200 caracteres"),
    passwordConfirm: string().test(
      "passwords-match",
      "Senhas não são iguais!",
      function (value) {
        return this.parent.password === value;
      }
    ),
    birth_date: string().required(),
    address: string()
      .required("Campo obrigatório!")
      .min(6, "No mínimo 6 caracteres")
      .max(200, "No máximo 200 caracteres"),
    cpf: string()
      .required("Campo obrigatório!")
      .test("is-cnpj", "CPF inválido!", (value?: string) =>
        cpf.isValid(value ?? "")
      ),
    cep: string()
      .required("Campo obrigatório!")
      .test("is-cep", "CEP inválido!", (value?: string) =>
        value ? value.replace("_", "").replace("-", "").length === 8 : false
      ),
    phone: string()
      .required("Campo obrigatório!")
      .test("is-phone", "Telefone inválido!", (value?: string) =>
        value ? value.replace("_", "").length === 16 : false
      ),
  });
};
