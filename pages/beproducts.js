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

import css from "styles/product.module.css";

import { useBeproducts } from "hooks/use-beproduct";
import Footer from "components/Footer";

import BeproductSide from "components/Home-main/beproductSide";
import { getRate } from "lib/rate";
import BeSearch from "components/BeSearch";

export default ({ info, rate }) => {
  const { query, asPath } = useRouter();
  const [usd, setUsd] = useState("");
  const [jpy, setJpy] = useState("");
  const [list, setList] = useState("grip");
  const router = useRouter();

  //-- PAGINATION
  const [activePage, setActivePage] = useState(parseInt(query.page) || 1);
  const [limit, setLimit] = useState({});
  const [total, setTotal] = useState();

  //

  const { products, pagination } = useBeproducts(
    `status=true&make=${query.make}&model=${query.model}&type=${query.type}&country=${query.country}&fuel=${query.fuel}&minYear=${query.minYear}&maxYear=${query.maxYear}&minMotor=${query.minMotor}&maxMotor=${query.maxMotor}&trans=${query.trans}&fuel=${query.fuel}&minMil=${query.minMil}&maxMil=${query.maxMil}&sort=${query.sort}&minPrice=${query.minPrice}&title=${query.title}&steering=${query.steering}&maxPrice=${query.maxPrice}&page=${query.page}`
  );

  useEffect(() => {
    if (pagination) {
      setTotal(pagination.total);
      setLimit(pagination.limit);
    }
  }, [pagination]);

  useEffect(() => {
    const usdIndex = rate.findIndex((x) => x.number === 1);
    const jpyIndex = rate.findIndex((x) => x.number === 3);
    if (rate) {
      setUsd(
        rate[usdIndex] &&
          rate[usdIndex].cashSellRate &&
          rate[usdIndex].cashSellRate
      );
      setJpy(
        rate[jpyIndex] &&
          rate[jpyIndex].cashSellRate &&
          rate[jpyIndex].cashSellRate
      );
    }
  }, [rate]);

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
        <title>Ачигдахад бэлэн машинууд | {info.name}</title>
        <meta property="og:url" content={`${base.siteUrl}`} />
        <meta property="og:title" content={`Бэлэн машинууд | ${info.name}`} />
        <meta property="og:description" content={info.siteInfo} />
      </Head>
      <TopBar />
      <Header page={true} text="Ачигдахад бэлэн" />
      <Section>
        <div className="container">
          <div className="row ">
            <div className="col-lg-3">
              <BeproductSide active="beproduct" />
            </div>
            <div className="col-lg-9">
              <BeSearch />
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
                      className="col-custom-2 col-lg-3 col-md-3 col-sm-6 col-6 "
                      key={`product_${product._id}`}
                    >
                      <Link href={`/beproduct/${product._id}`}>
                        <a>
                          <div className="productItem">
                            <div
                              className="productImage"
                              style={{
                                backgroundImage: `url(${base.cdnUrl}/product/${product.id}/product/${product.gallery_images[0]})`,
                              }}
                            >
                              {product.gallery_images ? <></> : Зураггүй}
                            </div>
                            <div className="productBody">
                              <div className="productName">{product.title}</div>
                              <div className="moreInfo">
                                <li>{product.type_txt}</li>
                                <li>
                                  {new Intl.NumberFormat().format(
                                    product.mileage
                                  )}
                                  km
                                </li>
                              </div>
                              <div className="productPrice">
                                {new Intl.NumberFormat().format(
                                  parseFloat(
                                    (product.price * jpy) / 1000000
                                  ).toFixed(1)
                                )}
                                сая /
                                <span>
                                  ¥
                                  {new Intl.NumberFormat().format(
                                    product.price
                                  )}
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

                {products && products.length < 1 && (
                  <div className={"notFound"}>
                    <img src="/images/notfound.png" />
                    <p> "Илэрц олдсонгүй" </p>
                  </div>
                )}
              </div>

              {/* LIST */}
              <div
                className={`row productsList `}
                style={{ display: list === "list" ? "flex" : "none" }}
              >
                {products &&
                  products.map((product, index) => (
                    <div className="col-lg-12">
                      <div className="row productListItem">
                        <Link href={`/beproduct/${product._id}`}>
                          <div className="col-lg-3">
                            <div
                              className="productListPhoto"
                              style={{
                                backgroundImage: `url(${base.cdnUrl}/product/${product.id}/product/${product.gallery_images[0]})`,
                              }}
                            ></div>
                          </div>
                        </Link>
                        <div className="col-lg-6">
                          <div className="productListMore">
                            <Link href={`/beproduct/${product._id}`}>
                              <h2> {product.title} </h2>
                            </Link>
                            <div className="productListDetails">
                              <li>
                                <div>Гүйлт</div>
                                <p>
                                  {new Intl.NumberFormat().format(
                                    product.mileage
                                  )}
                                  km
                                </p>
                              </li>
                              <li>
                                <div>Он</div>
                                <p> {product.car_year}</p>
                              </li>
                              <li>
                                <div>Мотор</div>
                                <p> {product.engine} cc</p>
                              </li>
                              <li>
                                <div>Drive</div>
                                <p> {product.drive}</p>
                              </li>
                              <p className="productPriceInfo">
                                {" "}
                                тээвэр, татвар бусад зардал багтаагүй үнэ
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
                                  parseFloat(
                                    (product.price * jpy) / 1000000
                                  ).toFixed(1)
                                )}
                                сая
                              </span>
                            </div>
                            <div className="ListMnPrice">
                              <span> Иенээр: </span>
                              <span className="yeanPrice">
                                ¥{new Intl.NumberFormat().format(product.price)}
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
              </div>

              {total && (
                <div className={`pagination`}>
                  <Pagination
                    activePage={parseInt(query.page) || 1}
                    itemClass={`page-item`}
                    linkClass={"page-link"}
                    itemsCountPerPage={limit}
                    totalItemsCount={total}
                    lastPageText={parseInt(total / 25)}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange.bind()}
                  />
                </div>
              )}
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
  const { data: rate } = await getRate();

  return {
    props: {
      info,
      rate,
    },
    revalidate: 40,
  };
};
