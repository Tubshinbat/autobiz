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
import { useProducts } from "hooks/use-product";
import Footer from "components/Footer";
import ProductSearch from "components/ProductSearch";

export default ({ info }) => {
  const { query, asPath } = useRouter();
  const router = useRouter();
  const [list, setList] = useState("grip");

  //-- PAGINATION
  const [activePage, setActivePage] = useState(parseInt(query.page) || 1);
  const [limit, setLimit] = useState({});
  const [total, setTotal] = useState();

  //

  const { products, pagination } = useProducts(
    `industry=${query.industry}&zagvar=${query.zagvar}&carType=${query.carType}&color=${query.color}&minYear=${query.minYear}&maxYear=${query.maxYear}&minMotor=${query.minMotor}&maxMotor=${query.maxMotor}&car_hurd=${query.car_hurd}&car_shatakhuun=${query.car_shatakhuun}&car_speed_box=${query.car_speed_box}&lizing=${query.lizing}&sort=${query.sort}&name=${query.title}&page=${query.page}`
  );

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

  const handleSort = (event) => {
    Router.replace({
      pathname: router.pathname,
      query: { ...query, sort: event.target.value },
    });
  };

  const handleList = () => {
    setList((bl) => {
      if (bl === "list") return "grip";
      else return "list";
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
      <Header page={true} text="Бэлэн машинууд" />

      <Section>
        <div className="container">
          <div className="row ">
            <div className="col-lg-3">
              <ProductSide active="product" />
            </div>
            <div className="col-lg-9">
              <ProductSearch />
              <div className={css.ProductHeader}>
                <span> эрэмбэлэх </span>
                <select className="sort" onChange={handleSort}>
                  <option value="new">Шинэ эхэндээ</option>
                  <option value="old">Хуучин эхэндээ</option>
                  <option value="maxtomin">Ихээс бага</option>
                  <option value="mintomax">Багаас их</option>
                </select>
                <div className="lists">
                  <div className="list" onClick={handleList}>
                    <i
                      className="fa-solid fa-list-ul"
                      style={{ display: list === "grip" ? "block" : "none" }}
                    ></i>
                  </div>
                  <div className="list" onClick={handleList}>
                    <i
                      className="fa-solid fa-grip"
                      style={{ display: list === "list" ? "block" : "none" }}
                    ></i>
                  </div>
                </div>
              </div>
              <div
                className={`row productsGrip `}
                style={{ display: list === "grip" ? "flex" : "none" }}
              >
                {products &&
                  products.map((product, index) => (
                    <div
                      className="col-custom-2 col-lg-3 col-md-3 col-sm-6 col-6 wow animate__animated animate__fadeIn"
                      data-wow-delay={`${0.8}s`}
                      key={`product_${product._id}`}
                    >
                      <Link href={`/product/${product._id}`}>
                        <a>
                          <div className="productItem">
                            <div
                              className="productImage"
                              style={{
                                backgroundImage: `url(${base.cdnUrl}/${product.pictures[0]})`,
                              }}
                            >
                              {product.pictures ? <></> : Зураггүй}
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
              <div
                className={`row productsList `}
                style={{ display: list === "list" ? "flex" : "none" }}
              >
                {products &&
                  products.map((product, index) => (
                    <div className="col-lg-12">
                      <div className="row productListItem">
                        <Link href={`/product/${product._id}`}>
                          <div className="col-lg-3">
                            <div
                              className="productListPhoto"
                              style={{
                                backgroundImage: `url(${base.cdnUrl}/${product.pictures[0]})`,
                              }}
                            ></div>
                          </div>
                        </Link>
                        <div className="col-lg-6">
                          <div className="productListMore">
                            <Link href={`/product/${product._id}`}>
                              <h2> {product.title} </h2>
                            </Link>
                            <div className="productListDetails">
                              <li>
                                <div>Гүйлт</div>
                                <p>
                                  {new Intl.NumberFormat().format(
                                    product.car_km
                                  )}
                                  km
                                </p>
                              </li>
                              <li>
                                <div>Он</div>
                                <p> {product.make_date}</p>
                              </li>
                              <li>
                                <div>Мотор</div>
                                <p> {product.car_km} cc</p>
                              </li>
                              <li>
                                <div>Хүрд</div>
                                <p> {product.car_hurd}</p>
                              </li>
                              <p className="productPriceInfo">
                                {product.lizing}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="productListPrices">
                            <div className="ListJapanPrice">
                              <span> Үнэ: </span>
                              <span>
                                {new Intl.NumberFormat().format(
                                  parseFloat(product.price / 1000000).toFixed(1)
                                )}
                                сая
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                {products && products.length < 1 && (
                  <div className={"notFound"}>
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
