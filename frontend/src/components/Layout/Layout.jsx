import React from "react";

//imports compnents and Pages
import Header from "../Header/Header";
import Routers from "../../router/Routers";
import Footer from "../Footer/Footer";

const Layout = () => {
  return (
    <div>
      <Header />
      <Routers />
      <Footer />
    </div>
  );
};
export default Layout;
