import React, { useContext, useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { CartContext } from "../../Context/Cart";
import { Triangle } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function Cart() {
  let { getCart, deleteFromCart, updateCart, setnumber, removeCart } =
    useContext(CartContext);
  const [isloading, setisloading] = useState(true);
  const [CartDetails, SetCartDetails] = useState({});

  async function getCartDetails() {
    let { data } = await getCart();
    console.log(data);
    SetCartDetails(data);
    setnumber(data?.numOfCartItems);
  }

  async function deleteCart(id) {
    let { data } = await deleteFromCart(id);
    console.log(data);
    setnumber(data?.numOfCartItems);
    SetCartDetails(data);
  }
  async function CartQuntity(id, count) {
    let { data } = await updateCart(id, count);
    console.log(data);
    data?.data?.products.map((ele) => {
      if (ele.count == 0) {
        deleteCart(ele.product._id);
      }
    });
    SetCartDetails(data);
  }

  async function removeall() {
    let { data } = await removeCart();
    console.log(data);
    setisloading(data);
    SetCartDetails(data);
  }

  useEffect(() => {
    getCartDetails();
  }, []);

  return (
    <>
    <Helmet>
        <title>Cart page</title>
      </Helmet>
      {CartDetails?.data ? (
        <div className="container my-5 ">
          <div className=" mx-auto bg-main-light p-5">
            <h3 className="mb-4 h1 ">Cart Shop:</h3>
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="h5 mb-3">
                total price:
                <span className="text-main">
                  {CartDetails.data.totalCartPrice} EGP
                </span>
              </h3>

              <h3 className="h5 mb-3">
                total number of items:{" "}
                <span className="text-main">{CartDetails.numOfCartItems}</span>
              </h3>
            </div>
            {CartDetails.data.products.map((ele) => (
              <div className="row  border-bottom mb-2">
                <div className="col-md-1">
                  <img
                    src={ele.product.imageCover}
                    className="w-100"
                    alt={ele.product.title}
                  />
                </div>
                <div className="col-md-11 d-flex justify-content-between align-items-center">
                  <div className="left-side">
                    <h4>{ele.product.title}</h4>
                    <h5>{ele.price}EGP</h5>

                    <button
                      onClick={() => deleteCart(ele.product._id)}
                      className="btn text-danger"
                    >
                      <i className="fa fa-trash-can  p-0"></i>remove
                    </button>
                  </div>
                  <div className="right-side">
                    <button
                      onClick={() =>
                        CartQuntity(ele.product._id, ele.count - 1)
                      }
                      className=" btn text-white bg-primary"
                    >
                      -
                    </button>
                    <span className="mx-1 ">{ele.count}</span>
                    <button
                      onClick={() =>
                        CartQuntity(ele.product._id, ele.count + 1)
                      }
                      className=" btn text-white   bg-primary"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={() => removeall()}
              className="btn btn-danger w-100 d-block mt-2"
            >
              clearall
            </button>
            <Link
              className="btn bg-main text-white mt-3 d-block ms-auto "
              to={"/freshshop/checkout"}
            >
              Checkout
            </Link>
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
