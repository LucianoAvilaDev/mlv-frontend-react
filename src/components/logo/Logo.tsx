import Image from "next/image";
import { useRouter } from "next/router";

const Logo = () => {
  const router = useRouter();

  return (
    <div
      title="Visitar a loja V-Store"
      className={`flex flex-col mx-2 items-center border-b justify-center`}
    >
      <Image
        onClick={() => router.push("dashboard")}
        className="py-4 cursor-pointer origin-top"
        src="/logo-tr.png"
        alt="V-Store Logo"
        width={180}
        height={90}
      />
    </div>
  );
};

export default Logo;
