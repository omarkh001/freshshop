import React from "react";
import styles from "./Brands.module.css";
import axios from "axios";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import { Modal } from "bootstrap/";
export default function Brands() {
  function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }
  let { data } = useQuery("Brands", getBrands);
  console.log(data);

  return (
    <>
     <Helmet>
        <title>brands page</title>
      </Helmet>
      <div className="container mt-5">
        <div className="row gy-2">
          {data?.data?.data.map((ele) => (
            <div className="col-md-3">
              <div className="card">
                <img
                  data-bs-toggle="modal"
                  data-bs-target={"#" + ele._id}
                  src={ele.image}
                  className="card-img-top rounded-3"
                  alt={ele.name}
                />
                <div className="card-body text-center">
                  <p className="card-text">{ele.name}</p>
                </div>
              </div>
            </div>
          ))}

          {data?.data?.data.map((ele) => (
            <div>
              <div
                className="modal fade"
                id={ele._id}
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content p-0">
                    <div className="modal-body">
                      <img src={ele.image} className="w-100" alt={ele.name} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
