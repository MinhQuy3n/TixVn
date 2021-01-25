import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const wrapper = (Component) => (props) => (
  <>
    <Header />

    <Component {...props} />

    <Footer />
  </>
);
export default wrapper;
