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

import css from "styles/product.module.css";
import {
  useCarcolors,
  useCarIndustries,
  useCartypes,
  useCarzagvars,
} from "hooks/use-cartypes";
import { useGroupProduct, useProducts } from "hooks/use-product";
import Footer from "components/Footer";

export default ({ info }) => {
  const { query, asPath } = useRouter();
  const router = useRouter();

  //-- PAGINATION
  const [activePage, setActivePage] = useState(parseInt(query.page) || 1);
  const [limit, setLimit] = useState({});
  const [total, setTotal] = useState();

  //

  const [currentIndustry, setIndustry] = useState("");
  const [searchForm, setSearchForm] = useState({});
  const { products: industry } = useCarIndustries(`limit=100`);
  const { types } = useCartypes(`limit=100`);
  const { zagvars } = useCarzagvars(`limit=100&industry=${currentIndustry}`);
  const { colors } = useCarcolors(`limit=100`);
  const { groupData: car_motor } = useGroupProduct("car_motor");
  const { groupData: car_hurd } = useGroupProduct("car_hurd");
  const { groupData: car_shatakhuun } = useGroupProduct("car_shatakhuun");
  const { groupData: lizing } = useGroupProduct("lizing");
  const { groupData: car_speed_box } = useGroupProduct("car_speed_box");

  const { products, pagination } = useProducts(
    `industry=${query.industry}&zagvar=${query.zagvar}&carType=${query.carType}&color=${query.color}&minYear=${query.minYear}&maxYear=${query.maxYear}&minMotor=${query.minMotor}&maxMotor=${query.maxMotor}&car_hurd=${query.car_hurd}&car_shatakhuun=${query.car_shatakhuun}&car_speed_box=${query.car_speed_box}&lizing=${query.lizing}&sort=${query.sort}&name=${query.title}&page=${query.page}`
  );

  useEffect(() => {
    if (query.industry) setIndustry(query.industry);
    setSearchForm(query);
  }, [query]);

  useEffect(() => {
    if (pagination) {
      setTotal(pagination.total);
      setLimit(pagination.limit);
    }
  }, [pagination]);

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
    if (event.target.name === "industry") setIndustry(event.target.value);
    setSearchForm((bf) => ({ ...bf, [event.target.name]: event.target.value }));
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

  const handleSort = (event) => {
    Router.replace({
      pathname: router.pathname,
      query: { ...query, sort: event.target.value },
    });
  };

  return (
    <Fragment>
      <Head>
        <title>Бэлэн машинууд | {info.name}</title>
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
              <ProductSide active="product" />
            </div>
            <div className="col-lg-9">
              <form style={{ overflow: "hidden" }}>
                <div className={`row ${css.SearchBox}`}>
                  <div className="form-group col-lg-3 col-md-3 col-sm-6 col-6">
                    <select
                      id="inputState"
                      name="industry"
                      onChange={handleChange}
                      value={searchForm.industry}
                      className={`form-select form-select-sm ${css.InputBox}`}
                    >
                      <option value="" selected>
                        Машины үйлдвэрлэгч
                      </option>
                      {industry &&
                        industry.map((product) => (
                          <option
                            value={product._id}
                            key={`indust_${product._id}`}
                          >
                            {product.industry} ({product.industryCount})
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="form-group col-lg-3 col-md-3 col-sm-6 col-6">
                    <select
                      id="inputState"
                      name="zagvar"
                      onChange={handleChange}
                      value={searchForm.zagvar}
                      className={`form-select form-select-sm ${css.InputBox}`}
                    >
                      <option value="" selected>
                        Загвар
                      </option>
                      {zagvars &&
                        zagvars.map((zagvar) => (
                          <option value={zagvar._id} key={zagvar._id}>
                            {zagvar.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="form-group col-lg-3 col-md-3 col-sm-6 col-6">
                    <select
                      id="inputState"
                      name="carType"
                      onChange={handleChange}
                      value={searchForm.carType}
                      className={`form-select form-select-sm ${css.InputBox}`}
                    >
                      <option value="" selected>
                        Төрөл
                      </option>
                      {types &&
                        types.map((type) => (
                          <option value={type._id} key={type._id}>
                            {type.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="form-group col-lg-3 col-md-3 col-sm-6 col-6">
                    <select
                      id="inputState"
                      name="color"
                      onChange={handleChange}
                      value={searchForm.color}
                      className={`form-select form-select-sm ${css.InputBox}`}
                    >
                      <option value="" selected>
                        Өнгө
                      </option>
                      {colors &&
                        colors.map((color) => (
                          <option value={color._id} key={color._id}>
                            {color.name}
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
                          <option value={motor.name}>{motor.name} cc</option>
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
                          <option value={motor.name}>{motor.name} cc</option>
                        ))}
                    </select>
                  </div>
                  <div className="form-group col-lg-3 col-md-3 col-sm-6 col-6">
                    <select
                      id="inputState"
                      name="car_hurd"
                      onChange={handleChange}
                      value={searchForm.car_hurd}
                      className={`form-select form-select-sm ${css.InputBox}`}
                    >
                      <option value="" selected>
                        Хүрд
                      </option>
                      {car_hurd &&
                        car_hurd.map((hurd) => (
                          <option value={hurd.name}>{hurd.name}</option>
                        ))}
                    </select>
                  </div>

                  <div className="form-group col-lg-3 col-md-3 col-sm-6 col-6">
                    <select
                      id="inputState"
                      name="car_shatakhuun"
                      onChange={handleChange}
                      value={searchForm.car_shatakhuun}
                      className={`form-select form-select-sm ${css.InputBox}`}
                    >
                      <option value="" selected>
                        Шатахуун
                      </option>
                      {car_shatakhuun &&
                        car_shatakhuun.map((shatakhuun) => (
                          <option value={shatakhuun.name}>
                            {shatakhuun.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="form-group col-lg-3 col-md-3 col-sm-6 col-6">
                    <select
                      id="inputState"
                      name="car_speed_box"
                      onChange={handleChange}
                      value={searchForm.car_speed_box}
                      className={`form-select form-select-sm ${css.InputBox}`}
                    >
                      <option value="" selected>
                        Хурдны хайрцаг
                      </option>
                      {car_speed_box &&
                        car_speed_box.map((speedBox) => (
                          <option value={speedBox.name}>{speedBox.name}</option>
                        ))}
                    </select>
                  </div>

                  <div className="form-group col-lg-3 col-md-3 col-sm-6 col-6">
                    <select
                      id="inputState"
                      name="lizing"
                      onChange={handleChange}
                      value={searchForm.lizing}
                      className={`form-select form-select-sm ${css.InputBox}`}
                    >
                      <option value="" selected>
                        Линзинг
                      </option>
                      {lizing &&
                        lizing.map((lizing) => (
                          <option value={lizing.name}>{lizing.name}</option>
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
                      <Link href={`/product/${product._id}`}>
                        <a>
                          <div className="productItem">
                            <div className="productImage">
                              {product.pictures ? (
                                <>
                                  <img
                                    src={`${base.cdnUrl}/${product.pictures[0]}`}
                                    className="productImg1"
                                  />
                                  {product.pictures[1] && (
                                    <img
                                      src={`${base.cdnUrl}/${product.pictures[1]}`}
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
                                <li>{product.car_type.name}</li>
                                <li>{product.car_km} km</li>
                              </div>
                              <div className="productPrice">
                                {parseInt(product.price) / 1000000} Сая
                              </div>
                            </div>
                          </div>
                        </a>
                      </Link>
                    </div>
                  ))}

                {products && products.length < 1 && (
                  <div className={`notFound`}>
                    <img src="/images/notfound.png" />
                    <p> "Илэрц олдсонгүй" </p>
                  </div>
                )}
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
