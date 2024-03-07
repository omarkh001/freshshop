import React from "react";
import styles from "./Categories.module.css";
import { useQuery } from "react-query";
import axios from "axios";
import { Helmet } from "react-helmet";
export default function Categories() {
  function getcategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  let { data } = useQuery("categories", getcategories);
  console.log(data);
  return (
    <>
      <Helmet>
        <title>categories page</title>
      </Helmet>
      <div className="container my-5">
        <div className="row gy-5 ">
          {data?.data?.data.map((ele) => (
            <div className="col-md-4">
              <div className="card ">
                <img
                  src={ele.image}
                  height={"400px"}
                  className="card-img-top w-100 rounded-3"
                  alt={ele.name}
                />
                <div className="card-body text-center">
                  <p className="card-text ">{ele.name}.</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
