import { Outlet } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Header from "./components/Header";

const GlobalStyle = createGlobalStyle`
  a {
    color:red;
  }
`;
function Root() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Outlet />
    </>
  );
}

export default Root;
