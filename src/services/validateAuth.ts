import { parseCookies } from "nookies";

const validateAuth = async (ctx: any): Promise<boolean> => {
  const { ["token"]: token } = parseCookies(ctx);

  if (!token) {
    return false;
  }

  return true;
};

export default validateAuth;
