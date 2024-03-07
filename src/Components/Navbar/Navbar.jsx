import React, { useContext } from "react";
import logo from "../../asessts/images/freshcart-logo.svg";
import styles from "./Navbar.module.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { TokenContext } from "../../Context/Token";
import { CartContext } from "../../Context/Cart";
export default function Navbar() {
  let navigate = useNavigate();
  let { number } = useContext(CartContext);
  let { token, setToken } = useContext(TokenContext);
  // console.log(token, "tokentokentokentokentoken");

  function Logout() {
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/Login");
  }

  return (
    <>
      <nav className="navbar  navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to={"/Home"}>
            <img src={logo} alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {token ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link  " aria-current="page" to={"/Home"}>
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link "
                    aria-current="page"
                    to={"/Products"}
                  >
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link "
                    aria-current="page"
                    to={"/Categories"}
                  >
                    Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link "
                    aria-current="page"
                    to={"/Brands"}
                  >
                    Brands
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link "
                    aria-current="page"
                    to={"/wishlist"}
                  >
                    Wishlist
                  </Link>
                </li>
              </ul>
            ) : null}

            <ul className="navbar-nav  ms-auto">
              <li className="nav-item align-self-center">
                <i className="fa-brands mx-2 fa-facebook"></i>
                <i className="fa-brands  mx-2 fa-twitter"></i>
                <i className="fa-brands  mx-2 fa-instagram"></i>
                <i className="fa-brands  mx-2 fa-linkedin"></i>
              </li>

              {token ? (
                <>
                  <li className="nav-item">
                    <button className="nav-link  " onClick={Logout}>
                      Log out
                    </button>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link "
                      aria-current="page"
                      to={"/Cart"}
                    >
                      <i className="fa fa-shopping-cart text-main"></i>
                      <span className="bg-main mx-1 text-white rounded px-1">
                        {number}
                      </span>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link  "
                      aria-current="page"
                      to={"/Regester"}
                    >
                      Regester
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link  "
                      aria-current="page"
                      to={"/Login"}
                    >
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
