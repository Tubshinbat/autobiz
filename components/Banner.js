import Link from "next/link";
import base from "lib/base";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

import {
  Pagination,
  EffectFade,
  Navigation,
  Scrollbar,
  Autoplay,
} from "swiper";

import { useBanners } from "hooks/use-banner";
import {
  useCarIndustries,
  useCartypes,
  useCarzagvars,
} from "hooks/use-cartypes";
import { useState } from "react";

const years = () => {
  const currentYear = new Date().getFullYear();
  let years = [];
  let startYear = 1920;
  while (startYear <= currentYear) {
    years.push(startYear++);
  }
  return years;
};

const arrayYears = years().reverse();

const Banner = () => {
  //FUNCTION
  const [industry, setIndustry] = useState("");
  const { banners } = useBanners();
  const { industries } = useCarIndustries(`limit=100`);
  const { types } = useCartypes(`limit=100`);
  const { zagvars } = useCarzagvars(`limit=100&industry=${industry}`);

  const handleChange = (event) => {
    setIndustry(event.target.value);
  };

  return (
    <div className="banner">
      <div className="container">
        <div className="bannerContainer">
          <Swiper
            modules={[EffectFade, Pagination, Navigation, Scrollbar, Autoplay]}
            effect="fade"
            autoplay={{
              delay: 5000,
            }}
            pagination={{ el: ".homeSlider_pagination" }}
            loop={true}
            className="homeBanner"
          >
            {banners &&
              banners.map((banner) => {
                return (
                  <SwiperSlide className="homeSlide">
                    <div className="homeSlideText">
                      <h4 className="header__title">{banner.name}</h4>
                      <p className="header__text">{banner.details}</p>
                    </div>
                    <div className="homeSlideImage">
                      <img src={`${base.cdnUrl}/${banner.picture}`} />
                    </div>
                  </SwiperSlide>
                );
              })}
            <div className="homeSlider_pagination swiper-pagination"></div>
          </Swiper>
          <form
            action="/products"
            method="GET"
            className="headerSearchBox wow animate__animated animate__fadeInDown"
            data-wow-delay={`1s`}
          >
            <div className="searchItem">
              <label> Үйлдвэрлэгч </label>
              <select name="industry" onChange={handleChange}>
                <option value=""> Сонгох </option>
                {industries &&
                  industries.map((industry) => (
                    <option value={industry._id} key={industry._id}>
                      {industry.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="searchItem ">
              <label> Загвар </label>
              <select name="zagvar">
                <option value=""> Сонгох </option>
                {zagvars &&
                  zagvars.map((zagvar) => (
                    <option value={zagvar._id} key={zagvar._id}>
                      {zagvar.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="searchItem">
              <label> Төрөл </label>
              <select name="carType">
                <option value=""> Сонгох </option>
                {types &&
                  types.map((type) => (
                    <option value={type._id} key={type._id}>
                      {type.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="searchItem">
              <label> Он </label>
              <div className="searchItemGroup">
                <select name="minYear">
                  <option value=""> Сонгох </option>
                  {arrayYears.map((year) => (
                    <option value={year}>{year}</option>
                  ))}
                </select>

                <select name="maxYear">
                  <option value=""> Сонгох </option>
                  {arrayYears.reverse().map((year) => (
                    <option value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
            <button>Хайх</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Banner;
