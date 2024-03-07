import React from "react";
import styles from "./Home.module.css";
import MainSlider from "../MainSlider/MainSlider";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import { Helmet } from "react-helmet";
import Products from "../Products/Products";
import Allorders from "../Allorders/Allorders";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home page</title>
      </Helmet>
      <MainSlider />
      <CategoriesSlider />
      <Products />
    </>
  );
}
