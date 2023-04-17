import { NextRouter, useRouter } from "next/router";

type Props = {
  text: string;
  url: string;
};

export const Link = ({ text, url }: Props) => {
  const router: NextRouter = useRouter();
  return (
    <>
      <div className="text-md">
        <span
          onClick={() => {
            router.push(url);
          }}
          className="font-medium cursor-pointer text-cyan-500 focus:text-cyan-700 hover:text-cyan-300"
        >
          {text}
        </span>
      </div>
    </>
  );
};
