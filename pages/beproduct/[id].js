import { getInfo } from "lib/webinfo";
import Head from "next/head";
import { Fragment, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import ImageGallery from "react-image-gallery";
import { ToastContainer } from "react-toastify";
import { toastControl } from "lib/toastControl";

import Header from "components/Header/header";
import TopBar from "components/Header/topBar";
import base from "lib/base";

import css from "/styles/productSingle.module.css";
import Section from "components/generals/section";
import Footer from "components/Footer";
import Spinner from "components/Spinner";
import { getBeProduct, getBeProducts } from "lib/beproduct";
import { getRate } from "lib/rate";
import Lend from "components/Lend";
import translate from "lib/translate";
import Calculator from "components/Calculator";
import { Modal, Button } from "react-bootstrap";
import { useCookies } from "react-cookie";
import UserContext from "context/UserContext";
import { createBeOrder } from "lib/order";
import { useGetBeProduct } from "hooks/use-beproduct";

export default ({ info, product: resProduct, rate }) => {
  const router = useRouter();
  const [ogUrl, setOgUrl] = useState("");
  const [image, setImage] = useState([]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { asPath } = useRouter();
  const [usd, setUsd] = useState("");
  const [jpy, setJpy] = useState("");
  const [showImg, setShowImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["autobiztoken"]);
  const handleClose = () => setShow(false);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [resOrder, setOrder] = useState(null);
  const userCtx = useContext(UserContext);

  if (router.isFallback) return <Spinner />;

  if (!router.isFallback && !resProduct?._id) {
    router.push("/404");
  }

  const { product } = useGetBeProduct(resProduct._id, resProduct);

  useEffect(() => {
    if (rate) {
      const usdIndex = rate.findIndex((x) => x.number === 1);
      const jpyIndex = rate.findIndex((x) => x.number === 3);
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
  // ${base.cdnUrl}/product/${product.id}/product/${product.gallery_images[0]}
  useEffect(() => {
    if (product) {
      let img = [];
      product.gallery_images.map((picture) =>
        img.push({
          original: `${base.cdnUrl}/product/${product.id}/product/${picture}`,
          thumbnail: `${base.cdnUrl}/product/${product.id}/product/${picture}`,
        })
      );
      setImage(img);
    }
  }, [product]);

  useEffect(() => {
    const host = window.location.host;
    const baseUrl = `http://${host}`;
    setOgUrl(`${baseUrl}${asPath}`);
  }, [router.pathname]);

  const handleImg = () => {
    setShowImg((bf) => (bf === true ? false : true));
  };

  const handleBuy = async () => {
    if (userCtx.state.userData) {
      const sendData = {
        userId: userCtx.state.userData._id,
        product_id: product._id,
        price: userCtx.state.price,
      };
      setLoading(true);
      const { order, error } = await createBeOrder(sendData);
      if (error) toastControl("error", error);
      if (order) setOrder(order);
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Head>
        <title>
          {product.title} | {info.name}
        </title>
      </Head>
      <TopBar />
      <Header page={true} text="Захиалгын хуудас" />
      <Section>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div
                className={`imgGallery ${
                  showImg === true ? "whiteSpaceSeen" : "whiteSpaceNone"
                }`}
              >
                <ImageGallery items={image} />
              </div>
              {image.length > 4 && (
                <div className="allPicture" onClick={handleImg}>
                  {" "}
                  Бүх зургийг харах{" "}
                </div>
              )}
              <div className="share-post-box">
                <ul className="share-box">
                  <li>
                    <i className="fa fa-share-alt" />
                    <span>Хуваалцах</span>
                  </li>
                  <li>
                    <a
                      className="facebook"
                      href={`http://www.facebook.com/share.php?u=${ogUrl}`}
                    >
                      <i className="fa-brands fa-facebook-square" />
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a
                      className="pinterest"
                      href={`http://pinterest.com/pin/create/button/?url=${ogUrl}&media=&description=${product.title}`}
                    >
                      <i className="fa-brands fa-twitter-square" />
                      Twitter
                    </a>
                  </li>

                  <li>
                    <a
                      className="linkedin"
                      href={`http://www.linkedin.com/shareArticle?mini=true&url=${ogUrl}&title=${product.title}&summary=&source=${ogUrl}`}
                    >
                      <i className="fa-brands fa-linkedin" />
                      <span />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <div className={css.ProductInfo}>
                <div className={css.ProductTitle}>
                  <h2> {product.title}</h2>
                  <div className={css.ModelRef}>{product.model_ref}</div>
                </div>

                <div className={css.Info}>
                  <div className={css.Fetured}>
                    <table className={css.FeturedTable}>
                      <tr>
                        <th>Төрөл:</th>
                        <td> {product.type_txt}</td>
                        <th>Загвар:</th>
                        <td> {product.model} </td>
                      </tr>
                      <tr>
                        <th> Хөдөлгүүр:</th>
                        <td>
                          {new Intl.NumberFormat().format(product.engine)}cc
                        </td>
                        <th>Гүйлт:</th>
                        <td>
                          {new Intl.NumberFormat().format(product.mileage)}km
                        </td>
                      </tr>
                      <tr>
                        <th>Өнгө:</th>
                        <td> {product.color || "-"}</td>
                        <th>Жолооны хүрд:</th>
                        <td>{translate(product.steering) || "-"}</td>
                      </tr>
                      <tr>
                        <th>Үйлдвэрлэгдсэн он:</th>
                        <td> {product.car_year} </td>
                        <th>Орж ирсэн он:</th>
                        <td> - </td>
                      </tr>
                      <tr>
                        <th>Түлшний төрөл:</th>
                        <td> {translate(product.fuel)} </td>
                        <th>Transmission:</th>
                        <td> {product.trans}</td>
                      </tr>
                      <tr>
                        <th>{translate("Drive")}:</th>
                        <td>{translate(product.drive)}</td>
                        <td></td>
                      </tr>
                    </table>
                  </div>

                  <div
                    className={`${css.ProductTitle} ${css.ProductInfoTitle}`}
                  >
                    <h5> Нэмэлт мэдээлэл </h5>
                  </div>
                  <ul className={css.ListFeatures}>
                    {product.features &&
                      product.features.map((feature) => <li> {feature}</li>)}
                  </ul>

                  <div
                    className={`${css.ProductTitle} ${css.ProductInfoTitle}`}
                  >
                    <h5> Монголд орж ирэх үнэ </h5>
                  </div>

                  <div className={css.PriceInfos}>
                    <div>Зарагдаж буй үнэ:</div>
                    <span>
                      {new Intl.NumberFormat().format(
                        parseInt(parseInt(product.price) * jpy)
                      )}
                      ₮
                    </span>
                  </div>
                  <div className={`${css.PriceInfos} ${css.ConverPirce}`}>
                    <div>Япон иен дүн:</div>
                    <span>
                      ¥{new Intl.NumberFormat().format(product.price)}
                    </span>
                  </div>
                  <p className={css.Linzing}>
                    Тээвэр, татвар бусад зардал багтаагүй болно
                  </p>

                  <Calculator product={product} />

                  <div className="row">
                    <div className="col-lg-12">
                      <div className={css.Location}>
                        Байгаа байршил: {product.country} -{" "}
                        {product.location_fob}
                      </div>
                      <div className={css.ProductBtns}>
                        <button
                          className={`${css.ProductBtn} ${css.Buy}`}
                          onClick={handleShow}
                        >
                          <i className="fa fa-cart-shopping"></i>
                          Захиалга өгөх
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={css.ContactInfo}>
                  Танд асуух зүйл байвал
                  <b> {product.phone || info.phone} </b> утсаар холбогдоно уу
                  мөн цахим шуудангаар мэдээлэл авах боломжтой
                  <b> {product.email || info.email} </b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Lend />
      <Footer />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Худалдаж авах </Modal.Title>
        </Modal.Header>

        {loading && <Spinner />}
        <Modal.Body>
          {loading && <Spinner />}
          {!userCtx.state.userData && !resOrder && (
            <div className="error-message">
              <p>Уучлаарай та захиалга өгөхийн тулд нэвтэрч орно уу!</p>
            </div>
          )}

          {userCtx.state.userData && !resOrder && (
            <div className="answer-message">
              Та захиалга өгөхдөө итгэлтэй байна уу?
            </div>
          )}

          {resOrder && (
            <div className="success-message">
              <i className="fa-solid fa-circle-check"></i>
              Таны захиалгыг хүлээн авлаа тантай манай ажилтан тун удахгүй
              холбогдох болно.
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Болих
          </Button>
          {!userCtx.state.userData && !resOrder && (
            <Button variant="primary" onClick={() => router.push("/login")}>
              Нэвтрэх
            </Button>
          )}
          {userCtx.state.userData && !resOrder && (
            <Button variant="primary" onClick={handleBuy}>
              Захиалга өгөх
            </Button>
          )}
        </Modal.Footer>
      </Modal>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Fragment>
  );
};

export const getStaticPaths = async () => {
  const { products } = await getBeProducts(`status=true&limit=10`);

  return {
    paths: products.map((product) => ({
      params: {
        id: product._id,
      },
    })),
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const { info } = await getInfo();
  const { product } = await getBeProduct(params.id);
  const { data: rate } = await getRate();
  return {
    props: {
      info,
      product,
      rate,
    },
    revalidate: 10,
  };
};
