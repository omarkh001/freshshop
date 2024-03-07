import React from "react";

import notfound from "../../asessts/images/error.svg";
import styles from "./Notfound.module.css";
export default function Notfound() {
  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12 mx-auto">
             <div className="d-flex justify-content-center align-items-center"> <img src={notfound} className="w-75" alt="notfoudImg" /></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
