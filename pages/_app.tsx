import "../styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { Store } from "../redux/store/store";
import Theme from "../theme";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={Store}>
      <ChakraProvider theme={Theme}>
        <Component {...pageProps} />
        <ToastContainer />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
