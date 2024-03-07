import React from "react";
import styles from "./Restpassword.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Restpassword() {
  let navigate = useNavigate();
  async function restpassword(values) {
    let { data } = await axios.put(
      "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
      values
    );

    console.log(data);
    if (data.token) {
      navigate("/login");
    }
  }

  const valdiation = Yup.object({
    email: Yup.string()
      .email("email is not valid")
      .required("email is required"),
    newPassword: Yup.string()
      .required("password is required")
      .matches(/^[A-z][a-z0-9]{3,8}$/, "Invalidpassword"),
  });

  const restpasswordFormoik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: restpassword,
    validationSchema: valdiation,
  });

  return (
    <>
      <div className="container">
        <form
          onSubmit={restpasswordFormoik.handleSubmit}
          className=" mx-auto w-75 mt-4"
        >
          <h2 className="text-main mb-3">Rest your Password:</h2>
          <label className="mb-2" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            value={restpasswordFormoik.values.email}
            onChange={restpasswordFormoik.handleChange}
            id="email"
            name="email"
            className=" form-control"
            onBlur={restpasswordFormoik.handleBlur}
          />
          {restpasswordFormoik.errors.email &&
          restpasswordFormoik.touched.email ? (
            <div className="alert alert-danger">
              {restpasswordFormoik.errors.email}
            </div>
          ) : null}

          <label className="my-3" htmlFor="newPassword">
            NewPassword:
          </label>
          <input
            type="password"
            value={restpasswordFormoik.values.newPassword}
            onChange={restpasswordFormoik.handleChange}
            id="newPassword"
            name="newPassword"
            className=" form-control"
            onBlur={restpasswordFormoik.handleBlur}
          />
          {restpasswordFormoik.errors.newPassword &&
          restpasswordFormoik.touched.newPassword ? (
            <div className="alert alert-danger">
              {restpasswordFormoik.errors.newPassword}
            </div>
          ) : null}
          <button
            disabled={
              !(restpasswordFormoik.isValid && restpasswordFormoik.dirty)
            }
            className="btn bg-main text-white mt-2"
          >
            Rest password
          </button>
        </form>
      </div>
    </>
  );
}
