import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

import styles from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Toaster />
      {/* <Footer />*/}
    </>
  );
}
