import { GetServerSideProps } from "next";

export default function Home() {
  return <></>;
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    redirect: {
      destination: "dashboard",
      permanent: false,
    },
  };
};
