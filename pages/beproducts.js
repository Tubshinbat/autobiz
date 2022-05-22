import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import Link from "next/link";
import Pagination from "react-js-pagination";

import base from "lib/base";
import { getInfo } from "lib/webinfo";
import TopBar from "components/Header/topBar";
import Header from "components/Header/header";
import Section from "components/generals/section";
import ProductSide from "components/Home-main/productSide";

import getTranslate from "lib/translate";

import css from "styles/product.module.css";

import { useBeproducts } from "hooks/use-beproduct";
import Footer from "components/Footer";
import {
  useGroupBeProduct,
  useGroupFilterBeProduct,
} from "hooks/use-beproduct";
import BeproductSide from "components/Home-main/beproductSide";
import { getRate } from "lib/rate";

export default ({ info }) => {
  const { query, asPath } = useRouter();
  const [usd, setUsd] = useState("");
  const router = useRouter();

  //-- PAGINATION
  const [activePage, setActivePage] = useState(parseInt(query.page) || 1);
  const [limit, setLimit] = useState({});
  const [total, setTotal] = useState();

  //

  const [currentMake, setMake] = useState("");
  const [currentModel, setModel] = useState("");
  const [searchForm, setSearchForm] = useState({});
  const { groups: mark_txt } = useGroupBeProduct(`mark_txt`);
  const { groups: location } = useGroupBeProduct(`country`);
  const { groups: trans } = useGroupBeProduct("trans");
  const { groups: fuels } = useGroupBeProduct("fuel");
  const { filterGroups: models } = useGroupFilterBeProduct(
    `group=model&filed=mark_txt&filter=${currentMake}`
  );
  const { filterGroups: types } = useGroupFilterBeProduct(
    `group=type_txt&filed=model&filter=${currentModel}`
  );

  const { products, pagination } = useBeproducts(
    `status=true&make=${query.make}&model=${query.model}&type=${query.type}&country=${query.country}&fuel=${query.fuel}&minYear=${query.minYear}&maxYear=${query.maxYear}&minEngcc=${query.minEngcc}&maxEngcc=${query.maxEngcc}&trans=${query.trans}&fuel=${query.fuel}&minMil=${query.minMil}&maxMil=${query.maxMil}&sort=${query.sort}&minPrice=${query.minPrice}&title=${query.title}&maxPrice=${query.maxPrice}&page=${query.page}`
  );

  useEffect(() => {
    if (query.make) setMake(query.make);
    if (query.model) setModel(query.model);
    setSearchForm(query);
  }, [query]);

  useEffect(() => {
    if (pagination) {
      setTotal(pagination.total);
      setLimit(pagination.limit);
    }
  }, [pagination]);

  useEffect(async () => {
    const { data } = await getRate();
    const usdIndex = await data.findIndex((x) => x.number === 1);
    setUsd(
      data[usdIndex] && data[usdIndex].sellRate && data[usdIndex].sellRate
    );
  }, []);

  const handlePageChange = (pageNumber) => {
    window.scrollTo(0, 0);
    setActivePage(pageNumber);
    router.replace({
      pathname: router.pathname,
      query: { ...query, page: pageNumber },
    });
  };

  const refresh = () => {
    Object.keys(searchForm).map((key) =>
      setSearchForm((bf) => ({ ...bf, [key]: "" }))
    );
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    if (name === "make") setMake(value);
    if (name === "model") setModel(value);
    setSearchForm((bf) => ({ ...bf, [name]: value }));
  };

  const years = () => {
    const currentYear = new Date().getFullYear();
    let years = [];
    let startYear = 1920;
    while (startYear <= currentYear) {
      years.push(startYear++);
    }
    return years;
  };

  const arrayYears = years();

  const car_motor = [
    { name: "700cc", value: 700 },
    { name: "1000cc", value: 1000 },
    { name: "1500cc", value: 1500 },
    { name: "1800cc", value: 1800 },
    { name: "2000cc", value: 2000 },
    { name: "2500cc", value: 2500 },
    { name: "3000cc", value: 3000 },
    { name: "4000cc", value: 4000 },
  ];

  const mileage = [
    { name: "50,000 km", value: 50000 },
    { name: "80,000 km", value: 80000 },
    { name: "100,000 km", value: 100000 },
    { name: "150000 km", value: 150000 },
    { name: "200,000 km", value: 200000 },
    { name: "300,000 km", value: 300000 },
  ];

  const price = [
    { name: "$500", value: 500 },
    { name: "$750", value: 750 },
    { name: "$1,000", value: 1000 },
    { name: "$1,500", value: 1500 },
    { name: "$2,000", value: 2000 },
    { name: "$2,500", value: 2500 },
    { name: "$3,000", value: 3000 },
    { name: "$3,500", value: 3500 },
    { name: "$4,000", value: 4000 },
    { name: "$4,500", value: 4500 },
    { name: "$5,000", value: 5000 },
    { name: "$6,000", value: 6000 },
    { name: "$7,000", value: 7000 },
    { name: "$8,000", value: 8000 },
    { name: "$9,000", value: 9000 },
    { name: "$10,000", value: 10000 },
    { name: "$15,000", value: 15000 },
    { name: "$20,000", value: 20000 },
  ];

  const handleSort = (event) => {
    Router.replace({
      pathname: router.pathname,
      query: { ...query, sort: event.target.value },
    });
  };

  return (
    <Fragment>
      <Head>
        <title>Ачигдахад бэлэн машинууд | {info.name}</title>
        <meta property="og:url" content={`${base.siteUrl}`} />
        <meta property="og:title" content={`Бэлэн машинууд | ${info.name}`} />
        <meta property="og:description" content={info.siteInfo} />
      </Head>
      <TopBar />
      <Header />
      <Section>
        <div className="container">
          <div className="row ">
            <div className="col-lg-3">
              <BeproductSide active="beproduct" />
            </div>
            <div className="col-lg-9">
              <form style={{ overflow: "hidden" }}>
                <div className={`row ${css.SearchBox}`}>
                  <div className="form-group col-lg-3 col-md-3 col-sm-6 col-6">
                    <select
                      id="inputState"
                      name="make"
                      onChange={handleChange}
                      value={searchForm.make}
                      className={`form-select form-select-sm ${css.InputBox}`}
                    >
                      <option value="" selected>
                        Машины үйлдвэрлэгч
                      </option>
                      {mark_txt &&
                        mark_txt.map((product) => (
                          <option
                            value={product._id}
                            key={`indust_${product._id}`}
                          >
                            {product._id} ({product.count})
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="form-group col-lg-3 col-md-3 col-sm-6 col-6">
                    <select
                      id="inputState"
                      name="model"
                      onChange={handleChange}
                      value={searchForm.model}
                      className={`form-select form-select-sm ${css.InputBox}`}
                    >
                      <option value="" selected>
                        Загвар
                      </option>
                      {models &&
                        models.map((model) => (
                          <option value={model._id} key={model._id}>
                            {model._id} ({model.count})
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="form-group col-lg-3 col-md-3 col-sm-6 col-6">
                    <select
                      id="inputState"
                      name="type"
                      onChange={handleChange}
                      value={searchForm.type}
                      className={`form-select form-select-sm ${css.InputBox}`}
                    >
                      <option value="" selected>
                        Төрөл
                      </option>
                      {types &&
                        types.map((type) => (
                          <option value={type._id} key={type._id}>
                            {type._id} ({type.count})
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="form-group col-lg-3 col-md-3 col-sm-6 col-6">
                    <select
                      id="inputState"
                      name="country"
                      onChange={handleChange}
                      value={searchForm.country}
                      className={`form-select form-select-sm ${css.InputBox}`}
                    >
                      <option value="" selected>
                        Байршил
                      </option>
                      {location &&
                        location.map((location) => (
                          <option value={location._id} key={location._id}>
                            {getTranslate(location._id)}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="form-group col-lg-3 col-md-3 col-sm-6 col-6">
                    <select
                      id="inputState"
                      name="minYear"
                      onChange={handleChange}
                      value={searchForm.minYear}
                      className={`form-select form-select-sm ${css.InputBox}`}
                    >
                      <option value=""> Үйлдвэрлэсэн он доод </option>
                      {arrayYears.map((year) => (
                        <option value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-lg-3 col-md-3 col-sm-6 col-6">
                    <select
                      id="inputState"
                      name="maxYear"
                      onChange={handleChange}
                      value={searchForm.maxYear}
                      className={`form-select form-select-sm ${css.InputBox}`}
                    >
                      <option value=""> Үйлдвэрлэсэн он дээд </option>
                      {arrayYears.reverse().map((year) => (
                        <option value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-lg-3 col-md-3 col-sm-6 col-6">
                    <select
                      id="inputState"
                      name="minMotor"
                      onChange={handleChange}
                      value={searchForm.minMotor}
                      className={`form-select form-select-sm ${css.InputBox}`}
                    >
                      <option value="" selected>
                        Мотор доод
                      </option>
                      {car_motor &&
                        car_motor.map((motor) => (
                          <option value={motor.value}>{motor.name}</option>
                        ))}
                    </select>
                  </div>
                  <div className="form-group col-lg-3 col-md-3 col-sm-6 col-6">
                    <select
                      id="inputState"
                      name="maxMotor"
                      onChange={handleChange}
                      value={searchForm.maxMotor}
                      className={`form-select form-select-sm ${css.InputBox}`}
                    >
                      <option value="" selected>
                        Мотор дээд
                      </option>
                      {car_motor &&
                        car_motor.map((motor) => (
                          <option value={motor.value}>{motor.name}</option>
                        ))}
                    </select>
                  </div>
                  <div className="form-group col-lg-3 col-md-3 col-sm-6 col-6">
                    <select
                      id="inputState"
                      name="trans"
                      onChange={handleChange}
                      value={searchForm.trans}
                      className={`form-select form-select-sm ${css.InputBox}`}
                    >
                      <option value="" selected>
                        Transmission
                      </option>
                      {trans &&
                        trans.map((tran) => (
                          <option value={tran._id}>{tran._id}</option>
                        ))}
                    </select>
                  </div>

                  <div className="form-group col-lg-3 col-md-3 col-sm-6 col-6">
                    <select
                      id="inputState"
                      name="fuel"
                      onChange={handleChange}
                      value={searchForm.fuel}
                      className={`form-select form-select-sm ${css.InputBox}`}
                    >
                      <option value="" selected>
                        Шатахуун
                      </option>
                      {fuels &&
                        fuels.map((fuel) => (
                          <option value={fuel._id}>
                            {getTranslate(fuel._id)}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="form-group col-lg-3 col-md-3 col-sm-6 col-6">
                    <select
                      id="inputState"
                      name="minMil"
                      onChange={handleChange}
                      value={searchForm.minMil}
                      className={`form-select form-select-sm ${css.InputBox}`}
                    >
                      <option value="" selected>
                        Гүйлт доод
                      </option>
                      {mileage &&
                        mileage.map((mil) => (
                          <option value={mil.value}>{mil.name}</option>
                        ))}
                    </select>
                  </div>

                  <div className="form-group col-lg-3 col-md-3 col-sm-6 col-6">
                    <select
                      id="inputState"
                      name="maxMil"
                      onChange={handleChange}
                      value={searchForm.maxMil}
                      className={`form-select form-select-sm ${css.InputBox}`}
                    >
                      <option value="" selected>
                        Гүйлт дээд
                      </option>
                      {mileage &&
                        mileage.map((mil) => (
                          <option value={mil.value}>{mil.name}</option>
                        ))}
                    </select>
                  </div>
                  <div className="form-group col-lg-3 col-md-3 col-sm-6 col-6">
                    <select
                      id="inputState"
                      name="minPrice"
                      onChange={handleChange}
                      value={searchForm.minPrice}
                      className={`form-select form-select-sm ${css.InputBox}`}
                    >
                      <option value="" selected>
                        Үнэ доод
                      </option>
                      {price &&
                        price.map((price) => (
                          <option value={price.value}>{price.name}</option>
                        ))}
                    </select>
                  </div>
                  <div className="form-group col-lg-3 col-md-3 col-sm-6 col-6">
                    <select
                      id="inputState"
                      name="maxPrice"
                      onChange={handleChange}
                      value={searchForm.maxPrice}
                      className={`form-select form-select-sm ${css.InputBox}`}
                    >
                      <option value="" selected>
                        Үнэ дээд
                      </option>
                      {price &&
                        price.map((price) => (
                          <option value={price.value}>{price.name}</option>
                        ))}
                    </select>
                  </div>

                  <div className={css.SearchBoxFooter}>
                    <div className={css.SearchBoxBtns}>
                      <button type="submit" className={css.SearchSubmit}>
                        <i class="fa-solid fa-magnifying-glass"></i> Хайлт хийх
                      </button>
                      <button
                        type="button"
                        onClick={refresh}
                        className={css.Clear}
                      >
                        Цэвэрлэх
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <div className={css.ProductHeader}>
                <span> эрэмбэлэх </span>
                <select className="sort" onChange={handleSort}>
                  <option value="new">Шинэ эхэндээ</option>
                  <option value="old">Хуучин эхэндээ</option>
                  <option value="maxtomin">Үнэ багасах</option>
                  <option value="mintomax">Үнэ ихсэх</option>
                </select>
              </div>
              <div className={`row productsList `}>
                {products &&
                  products.map((product, index) => (
                    <div
                      className="col-lg-3 col-md-3 col-sm-6 col-6 wow animate__animated animate__fadeIn"
                      data-wow-delay={`${0.8}s`}
                      key={`product_${product._id}`}
                    >
                      <Link href={`/beproduct/${product._id}`}>
                        <a>
                          <div className="productItem">
                            <div className="productImage">
                              {product.gallery_images ? (
                                <>
                                  <img
                                    src={`${product.gallery_images[0]}`}
                                    className="productImg1"
                                  />
                                  {product.gallery_images[1] && (
                                    <img
                                      src={`${product.gallery_images[1]}`}
                                      className="productImg2"
                                    />
                                  )}
                                </>
                              ) : (
                                Зураггүй
                              )}
                            </div>
                            <div className="productBody">
                              <div className="productName">
                                {" "}
                                {product.title}
                              </div>
                              <div className="moreInfo">
                                <li>{product.type_txt}</li>
                                <li>{product.mileage} km</li>
                              </div>
                              <div className="productPrice">
                                ${product.price} /
                                <span>
                                  {parseInt(
                                    (parseInt(product.price) * usd) / 1000000
                                  )}
                                  сая
                                </span>
                              </div>
                              <p className="plusInfo">
                                тээвэр, татвар бусад зардал багтаагүй үнэ
                              </p>
                            </div>
                          </div>
                        </a>
                      </Link>
                    </div>
                  ))}
                {total && (
                  <div className={`pagination`}>
                    <Pagination
                      activePage={parseInt(query.page) || 1}
                      itemClass={`page-item`}
                      linkClass={"page-link"}
                      itemsCountPerPage={limit}
                      totalItemsCount={total}
                      pageRangeDisplayed={5}
                      onChange={handlePageChange.bind()}
                    />
                  </div>
                )}
                {products && products.length < 1 && (
                  <div className={"notFound"}>
                    <img src="/images/notfound.png" />
                    <p> "Илэрц олдсонгүй" </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Section>
      <Footer />
    </Fragment>
  );
};

export const getStaticProps = async () => {
  const { info } = await getInfo();

  return {
    props: {
      info,
    },
    revalidate: 40,
  };
};
