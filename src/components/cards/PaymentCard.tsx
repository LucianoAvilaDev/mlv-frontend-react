import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ButtonSolid } from "../buttons/ButtonSolid";

const PaymentCard = () => {
  const { user } = useContext(AuthContext);

  const router = useRouter();

  return (
    <div className="px-2 w-full space-y-2">
      <div className="font-bold text-2xl border-b py-2 border-gray-300 w-full">
        Meus Dados
      </div>
      <div className="py-2 space-y-2">
        <div className="text-lg">
          <b>Nome: </b>
          {user?.name}
        </div>
        <div className="text-lg">
          <b>E-mail: </b>
          {user?.email}
        </div>
        <div className="text-lg">
          <b>Endereço: </b>
          {user?.address}
        </div>
        <div className="text-lg">
          <b>CEP: </b>
          {user?.cep}
        </div>
        <div className="text-lg">
          <b>Telefone: </b>
          {user?.phone}
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
