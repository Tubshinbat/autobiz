import { getProduct, getProducts } from "lib/product";
import { getInfo } from "lib/webinfo";
import Head from "next/head";
import { Fragment, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
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
import Lend from "components/Lend";
import { Modal, Button } from "react-bootstrap";
import { getUser } from "lib/user";
import { useCookies } from "react-cookie";
import UserContext from "context/UserContext";
import { createOrder } from "lib/order";

export default ({ info, product }) => {
  const router = useRouter();
  const { asPath } = useRouter();
  const [image, setImage] = useState([]);
  const [ogUrl, setOgUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showImg, setShowImg] = useState(false);
  const [show, setShow] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["autobiztoken"]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [resOrder, setOrder] = useState(null);

  if (router.isFallback) return <Spinner />;
  if (!router.isFallback && !product?._id) {
    router.push("/404");
  }

  const userCtx = useContext(UserContext);

  useEffect(() => {
    const host = window.location.host;
    const baseUrl = `http://${host}`;
    setOgUrl(`${baseUrl}${asPath}`);
  }, [router.pathname]);

  useEffect(() => {
    !cookies.autobiztoken && userCtx.allClear();
  }, []);

  useEffect(() => {
    !cookies.autobiztoken && userCtx.allClear();
  }, [cookies.autobiztoken]);

  useEffect(() => {
    if (product) {
      let img = [];
      product.pictures.map((picture) =>
        img.push({
          original: base.cdnUrl + "/" + picture,
          thumbnail: base.cdnUrl + "/" + picture,
        })
      );
      setImage(img);
    }
  }, [product]);

  const handleImg = () => {
    setShowImg((bf) => (bf === true ? false : true));
  };

  const handleBuy = async () => {
    if (userCtx.state.userData) {
      const sendData = {
        userId: userCtx.state.userData._id,
        product_id: product._id,
      };
      setLoading(true);
      const { order, error } = await createOrder(sendData);
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
      <Header page={true} />
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
                      className="twitter"
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
                </div>
                <div className={css.Info}>
                  <div className={css.Fetured}>
                    <table className={css.FeturedTable}>
                      <tr>
                        <td>Төрөл: {product.car_type.name}</td>
                        <td>Загвар: {product.car_zagvar.name} </td>
                      </tr>
                      <tr>
                        <td>
                          Хөдөлгүүр:{" "}
                          {new Intl.NumberFormat().format(product.car_motor)}cc{" "}
                        </td>
                        <td>
                          Гүйлт:{" "}
                          {new Intl.NumberFormat().format(product.car_km)}km
                        </td>
                      </tr>
                      <tr>
                        <td>Өнгө: {product.color.name} </td>
                        <td>Жолооны хүрд: {product.car_hurd}</td>
                      </tr>
                      <tr>
                        <td>Үйлдвэрлэгдсэн он: {product.make_date} </td>
                        <td>Орж ирсэн он: {product.import_date}</td>
                      </tr>
                      <tr>
                        <td>Түлшний төрөл: {product.car_shatakhuun} </td>
                        <td>Араа: {product.car_speed_box}</td>
                      </tr>
                      <tr>
                        <td>
                          Моторын багтаамж:{" "}
                          {new Intl.NumberFormat().format(product.car_motor)}{" "}
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div
                    className={`${css.ProductTitle} ${css.ProductInfoTitle}`}
                  >
                    <h5> Нэмэлт мэдээлэл </h5>
                    <div
                      className={css.More}
                      dangerouslySetInnerHTML={{
                        __html: product.description,
                      }}
                    ></div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className={css.PriceInfos}>
                        <div>Зарагдах үнэ:</div>
                        <span>
                          {new Intl.NumberFormat().format(product.price)}₮
                        </span>
                      </div>
                      <p className={css.Linzing}>{product.lizing}</p>
                    </div>
                    <div className="col-lg-12">
                      <div className={css.ProductBtns}>
                        <button
                          className={`${css.ProductBtn} ${css.Buy}`}
                          onClick={handleShow}
                        >
                          <i className="fa fa-cart-shopping"></i>
                          Худалдан авах
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
      <Lend dPrice={product.price} />
      <Footer />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Худалдаж авах </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading && <Spinner />}
          {!userCtx.state.userData && !resOrder && !cookies.autobiztoken && (
            <div className="error-message">
              <p>Уучлаарай та захиалга өгөхийн тулд нэвтэрч орно уу!</p>
            </div>
          )}

          {userCtx.state.userData && !resOrder && cookies.autobiztoken && (
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
              Худалдан авах
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
  const { products } = await getProducts(`status=true&limit=10`);

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
  const { product } = await getProduct(params.id);

  return {
    props: {
      info,
      product,
    },
    revalidate: 10,
  };
};
