import React, { useContext, useEffect } from "react";
import styles from "./Details.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Slider from "react-slick";
import { Triangle } from "react-loader-spinner";
import toast, { Toaster } from "react-hot-toast";
import { CartContext } from "../../Context/Cart";

import { WishlistContext } from "../../Context/Wishlist";
import { Helmet } from "react-helmet";
export default function Details() {
  let { addTOWishlist } = useContext(WishlistContext);
  let { addToCart, setnumber } = useContext(CartContext);
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  let pramas = useParams();
  // console.log(pramas);
  const [Details, setDetails] = useState({});
  const [isLoading, SetIsloading] = useState(true);

  async function getDetails(id) {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    setDetails(data.data);
    console.log(data.data);
    SetIsloading(false);
  }

  useEffect(() => {
    getDetails(pramas.id);
  }, []);

  async function addCart(id) {
    let response = await addToCart(id);
    console.log(response);
    if (response.data.status == "success") {
      setnumber(response.data.numOfCartItems);
      toast.success(response.data.message, {
        duration: 4000,
        position: "top-right",
        style: {},
        className: "bg-main text-white mt-5",
      });
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
    <Helmet>
        <title>Details page</title>
      </Helmet>
      <div className="container py-4">
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
          <div className="row align-items-center">
            <div className="col-md-4">
              <Slider {...settings}>
                {Details.images.map((ele, i) => (
                  <img src={ele} key={i} className="w-100" alt={i} />
                ))}
              </Slider>
            </div>
            <div className="col-md-8">
              <p>{Details.description}</p>
              <h3>{Details.title}</h3>

              <div className="d-flex justify-content-between align-items-center">
                <h5>{Details.price + "EGP"}</h5>
                <h6 className="d-flex">
                  <i className="fa fa-star rating-color px-1"></i>
                  <p>{Details.ratingsAverage}</p>
                </h6>
              </div>
              <button onClick={() => addWishitem(Details.id)} className="btn">
                <i className={`fa-solid fa-heart   h3 `}></i>
              </button>
              <button
                onClick={() => addCart(Details.id)}
                className="btn bg-main text-white w-100"
              >
                +add
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
