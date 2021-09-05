import type { AppProps } from "next/app";
import Container from "@material-ui/core/Container";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container maxWidth="sm">
      <Component {...pageProps} />
    </Container>
  );
}
export default MyApp;
