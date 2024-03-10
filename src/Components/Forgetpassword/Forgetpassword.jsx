import React, { useState } from "react";
import styles from "./Forgetpassword.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Forgetpassword() {
  async function getforgetpassword(values) {
    let { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      values
    );
    if (data.statusMsg == "success") {
      document.querySelector(".forgetpassword").classList.add("d-none");
      document.querySelector(".resetCode").classList.remove("d-none");
    }

    console.log(data);
  }

  const valdiation = Yup.object({
    email: Yup.string()
      .email("email is not valid")
      .required("email is required"),
  });

  const frogetFormik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: getforgetpassword,
    validationSchema: valdiation,
  });

  // ============================resetCode======================================================
  let navigate = useNavigate();
  async function getResetCode(values) {
    let { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
      values
    );

    if (data.status == "Success") {
      navigate("restpassword");
    }
    console.log(data);
  }

  const valdiationCode = Yup.object({
    resetCode: Yup.string().required("resetCode is required"),
  });

  const codeFormik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: getResetCode,
    validationSchema: valdiationCode,
  });

  return (
    <>
      <div className="container  mt-4">
        <form
          onSubmit={frogetFormik.handleSubmit}
          className=" forgetpassword mx-auto w-100 "
        >
          <h2 className="text-main mb-3">send your Email :</h2>
          <label className="mb-2" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            value={frogetFormik.values.email}
            onChange={frogetFormik.handleChange}
            id="email"
            name="email"
            className=" form-control"
            onBlur={frogetFormik.handleBlur}
          />
          {frogetFormik.errors.email && frogetFormik.touched.email ? (
            <div className="alert alert-danger">
              {frogetFormik.errors.email}
            </div>
          ) : null}
          <button
            disabled={!(frogetFormik.dirty && frogetFormik.isValid)}
            type=" submit"
            className="btn bg-main text-white  mt-2"
          >
            send Email{" "}
          </button>
        </form>

        {/* ========================codeFormik=============================================== */}

        <form
          onSubmit={codeFormik.handleSubmit}
          className=" resetCode mx-auto w-100 d-none"
        >
          <h2 className="text-main mb-3">send your code :</h2>
          <label className="mb-2" htmlFor="resetCode">
            ResetCode:
          </label>
          <input
            type="text"
            value={codeFormik.values.email}
            onChange={codeFormik.handleChange}
            id="resetCode"
            name="resetCode"
            className=" form-control"
            onBlur={codeFormik.handleBlur}
          />
          {codeFormik.errors.resetCode && codeFormik.touched.resetCode ? (
            <div className="alert alert-danger">
              {codeFormik.errors.resetCode}
            </div>
          ) : null}
          <button
            disabled={!(codeFormik.dirty && codeFormik.isValid)}
            type=" submit"
            className="btn bg-main text-white  mt-2"
          >
            Verify
          </button>
        </form>
      </div>
    </>
  );
}
