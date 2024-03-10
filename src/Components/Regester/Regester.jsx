import React, { useState } from "react";
import * as Yup from "yup";
import styles from "./Regester.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function Regester() {
  let navigate = useNavigate();
  const [error, seterror] = useState("");
  const [Isloading, setIsloading] = useState(false);
  async function callRegester(reqBody) {
    console.log(reqBody);
    seterror("");
    setIsloading(true)
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", reqBody)
      .catch((err) =>{ 
        
        setIsloading(false)
        
        
        seterror(err.response.data.message)
      
      
      
      })

    console.log(data);

    if ((data.message = "success")) {
      navigate("/freshshop/login");
    }
  }

  const valdiation = Yup.object({
    name: Yup.string()
      .min(3, "name is too short")
      .max(10, "name is too long")
      .required("name is required"),
    email: Yup.string()
      .email("email is not valid")
      .required("email is required"),
    password: Yup.string()
      .required("password is required")
      .matches(/^[A-z][a-z0-9]{3,8}$/, "Invalidpassword"),
    rePassword: Yup.string()
      .required("repassword is required")
      .oneOf([Yup.ref("password")], "password and repassword should match"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Invalid phone")
      .required("phone is required"),
  });

  const regesterFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: valdiation,
    onSubmit: callRegester,
  });

  return (
    <>
     <Helmet>
               
               <title>Regester page</title>
              
           </Helmet>
      <div className="container my-2">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <h2 className="mb-3 ">register now:</h2>

            {error ? <div className="alert alert-danger">{error}</div> : null}

            <form onSubmit={regesterFormik.handleSubmit}>
              <div className="col-md-12">
                <div className="form-group mb-3">
                  <label htmlFor="fullName" className="mb-2">
                    fullName:
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    className=" form-control"
                    name="name"
                    value={regesterFormik.values.name}
                    onChange={regesterFormik.handleChange}
                    onBlur={regesterFormik.handleBlur}
                  />
                  {regesterFormik.errors.name && regesterFormik.touched.name ? (
                    <div className="alert  alert-danger">
                      {regesterFormik.errors.name}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group mb-3">
                  <label htmlFor="Email" className="mb-2">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="Email"
                    className=" form-control"
                    name="email"
                    value={regesterFormik.values.email}
                    onChange={regesterFormik.handleChange}
                    onBlur={regesterFormik.handleBlur}
                  />
                  {regesterFormik.errors.email &&
                  regesterFormik.touched.email ? (
                    <div className="alert  alert-danger">
                      {regesterFormik.errors.email}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group mb-2">
                  <label htmlFor="password" className="mb-2">
                    password:
                  </label>
                  <input
                    type="password"
                    id="password"
                    className=" form-control"
                    name="password"
                    value={regesterFormik.values.password}
                    onChange={regesterFormik.handleChange}
                    onBlur={regesterFormik.handleBlur}
                  />

                  {regesterFormik.errors.password &&
                  regesterFormik.touched.password ? (
                    <div className="alert  alert-danger">
                      {regesterFormik.errors.password}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group mb-2">
                  <label htmlFor="rePassword" className="mb-2">
                    repassword:
                  </label>
                  <input
                    type="password"
                    id="rePassword"
                    className=" form-control"
                    name="rePassword"
                    value={regesterFormik.values.rePassword}
                    onChange={regesterFormik.handleChange}
                    onBlur={regesterFormik.handleBlur}
                  />
                  {regesterFormik.errors.rePassword &&
                  regesterFormik.touched.rePassword ? (
                    <div className="alert  alert-danger">
                      {regesterFormik.errors.rePassword}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group mb-2">
                  <label htmlFor="phone" className="mb-2">
                    phone:
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className=" form-control"
                    name="phone"
                    value={regesterFormik.values.phone}
                    onChange={regesterFormik.handleChange}
                    onBlur={regesterFormik.handleBlur}
                  />
                  {regesterFormik.errors.phone &&
                  regesterFormik.touched.phone ? (
                    <div className="alert  alert-danger">
                      {regesterFormik.errors.phone}
                    </div>
                  ) : null}
                </div>
              </div>

              <button className="btn bg-main d-block my-1 text-white ms-auto" disabled={!(regesterFormik.isValid&&regesterFormik.dirty)} >
                {Isloading?<i className="fa fa-spinner fa-spin"></i>:"    Regster"}
                      
            
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
