import React, { useContext, useState } from "react";
import styles from "./Checkout.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CartContext } from "../../Context/Cart";
export default function Checkout() {
  let { onlinePayment } = useContext(CartContext);
  const valdiation = Yup.object({
    details: Yup.string()
      .min(3, "details is too short")
      .max(20, "details is too long")
      .required("details is required"),
    city: Yup.string()
      // .matches(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)$/, "Invalid city")
      .min(3, "details is too short")
      .max(10, "details is too long")
      .required("city is required"),

    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Invalid phone")
      .required("phone is required"),
  });

  async function payment(values) {
    let { data } = await onlinePayment(values);
    console.log(data);
    window.location.href = data.session.url;
  }
  const CheckoutFormik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema: valdiation,
    onSubmit: payment,
  });
  return (
    <>
      <div className="container my-5 ">
        <div className="row">
          <div className="col-md-12 mx-auto bg-main-light p-4">
            <h2>CheckOut:</h2>
            <form onSubmit={CheckoutFormik.handleSubmit}>
              <div className="col-md-12">
                <div className="from-group mb-3">
                  <label htmlFor="details" className="mb-2">
                    details:
                  </label>
                  <input
                    type="text"
                    name="details"
                    id="details"
                    className=" form-control"
                    value={CheckoutFormik.values.details}
                    onChange={CheckoutFormik.handleChange}
                    onBlur={CheckoutFormik.handleBlur}
                  />

                  {CheckoutFormik.errors.details &&
                  CheckoutFormik.touched.details ? (
                    <div className="alert  alert-danger">
                      {CheckoutFormik.errors.details}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="col-md-12">
                <div className="from-group mb-3">
                  <label htmlFor="phone" className="mb-2">
                    phone:
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    className=" form-control"
                    value={CheckoutFormik.values.phone}
                    onChange={CheckoutFormik.handleChange}
                    onBlur={CheckoutFormik.handleBlur}
                  />
                  {CheckoutFormik.errors.phone &&
                  CheckoutFormik.touched.phone ? (
                    <div className="alert  alert-danger">
                      {CheckoutFormik.errors.phone}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="col-md-12">
                <div className="from-group mb-3">
                  <label htmlFor="city" className="mb-2">
                    city:
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    className=" form-control"
                    value={CheckoutFormik.values.city}
                    onChange={CheckoutFormik.handleChange}
                    onBlur={CheckoutFormik.handleBlur}
                  />
                  {CheckoutFormik.errors.city && CheckoutFormik.touched.city ? (
                    <div className="alert  alert-danger">
                      {CheckoutFormik.errors.city}
                    </div>
                  ) : null}
                </div>
              </div>
              <button
                className="btn bg-main text-white w-100 mt-1"
                disabled={!(CheckoutFormik.isValid && CheckoutFormik.dirty)}
              >
                Pay now
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
