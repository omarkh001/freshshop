import React, { useEffect, useState } from "react";
import styles from "./CategoriesSlider.module.css";
import axios from "axios";
import Slider from "react-slick";
import { Triangle } from "react-loader-spinner";
export default function CategoriesSlider() {
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
  };
  const [isLoading, SetIsloading] = useState(true);
  const [categories, setCategories] = useState([]);
  async function getCatgories() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    // console.log(data);
    setCategories(data.data);
    SetIsloading(false);
  }

  useEffect(() => {
    getCatgories();
  }, []);
  return (
    <>
      <div className="container py-5">
        <h3 className="mb-3">shop popular Categories</h3>
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
          <Slider {...settings}>
            {categories.map((cat, i) => (
              <div key={i} className="cat">
                <img
                  src={cat.image}
                  height={"200px"}
                  className="w-100 "
                  alt=""
                />
                <h5>{cat.name}</h5>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </>
  );
}
