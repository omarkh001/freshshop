import React, { useContext, useState } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { TokenContext } from "../../Context/Token";
export default function Login() {
  let { token } = useContext(TokenContext);
  let { setToken } = useContext(TokenContext);

  let navigate = useNavigate();
  const [error, seterror] = useState("");
  const [Isloading, setIsloading] = useState(false);
  async function callLogin(reqBody) {
    console.log(reqBody);
    seterror("");
    setIsloading(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", reqBody)
      .catch((err) => {
        setIsloading(false);

        seterror(err.response.data.message);
      });

    console.log(data);

    if ((data.message = "success")) {
      localStorage.setItem("userToken", data.token);
      setToken(data.token);
      navigate("/freshshop/home");
    }
  }

  const valdiation = Yup.object({
    email: Yup.string()
      .email("email is not valid")
      .required("email is required"),
    password: Yup.string()
      .required("password is required")
      .matches(/^[A-z][a-z0-9]{3,8}$/, "Invalidpassword"),
  });

  const LoginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: valdiation,
    onSubmit: callLogin,
  });

  return (
    <>
      <div className="container my-2">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <h2 className="mb-3 ">Login now:</h2>

            {error ? <div className="alert alert-danger">{error}</div> : null}

            <form onSubmit={LoginFormik.handleSubmit}>
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
                    value={LoginFormik.values.email}
                    onChange={LoginFormik.handleChange}
                    onBlur={LoginFormik.handleBlur}
                  />
                  {LoginFormik.errors.email && LoginFormik.touched.email ? (
                    <div className="alert  alert-danger">
                      {LoginFormik.errors.email}
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
                    value={LoginFormik.values.password}
                    onChange={LoginFormik.handleChange}
                    onBlur={LoginFormik.handleBlur}
                  />

                  {LoginFormik.errors.password &&
                  LoginFormik.touched.password ? (
                    <div className="alert  alert-danger">
                      {LoginFormik.errors.password}
                    </div>
                  ) : null}
                </div>
              </div>

              <Link id="forgetpassword" className="text-main" to={"/freshshop/forgetpassword"}>
                forgetpassword.....
              </Link>

              <button
                className="btn bg-main d-block my-1 text-white ms-auto"
                disabled={!(LoginFormik.isValid && LoginFormik.dirty)}
              >
                {Isloading ? (
                  <i className="fa fa-spinner fa-spin"></i>
                ) : (
                  "Login"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
