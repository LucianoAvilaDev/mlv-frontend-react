import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/globals.css";

import { AuthProvider } from "../contexts/AuthContext";
import { CartProvider } from "../contexts/CartContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CartProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </CartProvider>
    </AuthProvider>
  );
}
