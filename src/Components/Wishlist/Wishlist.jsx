import React, { useEffect, useState } from "react";
import styles from "./Wishlist.module.css";
import { useContext } from "react";
import { WishlistContext } from "../../Context/Wishlist";
import { Triangle } from "react-loader-spinner";
import { CartContext } from "../../Context/Cart";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
export default function Wishlist() {
  let { getWishlist, deleteWishlist } = useContext(WishlistContext);
  const [WishlistDetials, setWishlistDetials] = useState({});
  let { addToCart, setnumber } = useContext(CartContext);

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

  async function getWishlistDetaials() {
    let { data } = await getWishlist();
    // console.log(data);
    setWishlistDetials(data);
  }
  async function removeWhislist(id) {
    let { data } = await deleteWishlist(id);
    console.log(data);
    setWishlistDetials(data);
  }

  useEffect(() => {
    getWishlistDetaials();
  }, []);

  return (
    <>
    <Helmet>
        <title>Whislist page</title>
      </Helmet>
      {WishlistDetials?.data ? (
        <div className="container my-5">
          <div className="bg-main-light mx-auto p-5">
            <h2 className="mb-4">My wish List:</h2>
            {WishlistDetials.data.map((ele) => (
              <div
                key={ele._id}
                className="row border-bottom mt-2 mb-3 align-items-center"
              >
                <div className="col-md-2">
                  <img src={ele.imageCover} className="w-100" alt="" />
                </div>
                <div className="col-md-10 d-flex justify-content-between align-align-items-center">
                  <div className="leftside">
                    <h3>{ele.title}</h3>
                    <h4 className="text-main"> {ele.price}EGP</h4>
                    <button
                      onClick={() => removeWhislist(ele._id)}
                      className="btn text-danger "
                    >
                      <i className="fa fa-trash-can  p-0"></i>remove
                    </button>
                  </div>
                  <div className="rightside">
                    <button
                      onClick={() => addCart(ele._id)}
                      className="btn btn-outline-success"
                    >
                      add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Triangle
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClass="justify-content-center mt-5"
        />
      )}
    </>
  );
}
