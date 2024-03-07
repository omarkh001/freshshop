import React, { useContext, useEffect, useState } from "react";
import styles from "./Products.module.css";
import axios from "axios";
import { Triangle } from "react-loader-spinner";

import { Audio } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/Cart";
import { Toast } from "bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { WishlistContext } from "../../Context/Wishlist";
import { Helmet } from "react-helmet";
export default function Products() {
  let { addToCart, setnumber } = useContext(CartContext);

  // console.log(addToCart,"addToCartaddToCart");
  const [color, setColor] = useState("");
  let { addTOWishlist } = useContext(WishlistContext);
  // console.log(addTOWishlist);
  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let { data, isLoading } = useQuery("products", getProducts);

  async function addCart(id) {
    let response = await addToCart(id);
    console.log(response);
    if (response.data.status == "success") {
      toast.success(response.data.message, {
        duration: 4000,
        position: "top-right",
        style: {},
        className: "bg-main text-white mt-5",
      });
      setnumber(response.data.numOfCartItems);
    } else {
      toast.error(response.data.message, {
        duration: 4000,
        position: "top-right",
        style: {},
        className: "bg-danger text-white",
      });
    }
  }

  async function addWishitem(id) {
    let res = await addTOWishlist(id);
    document.querySelector("#color").classList.add("text-danger");

    if (res.data.status == "success") {
      toast.success(res.data.message, {
        duration: 4000,
        position: "top-right",
        style: {},
        className: "bg-danger text-white mt-5",
        icon: "👏",
      });
    } else {
      toast.error(res.data.message, {
        duration: 4000,
        position: "top-right",
        style: {},
        className: "bg-danger text-white mt-5",
      });
    }
    // console.log(data);
  }

  return (
    <>
      {
        <div className="container py-5">
          {isLoading ? (
            <Triangle
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="triangle-loading"
              wrapperStyle={{}}
              wrapperClass="justify-content-center"
            />
          ) : (
            <div className="row gy-5">
              {data?.data?.data.map((ele) => (
                <div key={ele.id} className="col-md-3 ">
                  <div className=" product p-2">
                    <Link to={"/Details/" + ele.id}>
                      <img
                        src={ele.imageCover}
                        className="w-100"
                        alt={ele.title}
                      />
                      <h5 className=" text-main ">{ele.category.name}</h5>
                      <h6>{ele.title.split(" ").slice(0, 3).join(" ")}</h6>
                      <div className="d-flex justify-content-between align-items-center">
                        <p>{ele.price + "EGP"}</p>

                        <h5 className="d-flex justify-content-center">
                          <i className="fa fa-star rating-color px-1"></i>
                          <p>{ele.ratingsAverage}</p>
                        </h5>
                      </div>
                    </Link>
                    <button
                      id="color"
                      onClick={() => addWishitem(ele.id)}
                      className="btn"
                    >
                      <i className={`fa-solid fa-heart   h3 `}></i>
                    </button>
                    <button
                      onClick={() => addCart(ele.id)}
                      className="btn bg-main text-white w-100"
                    >
                      +add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      }
    </>
  );
}
