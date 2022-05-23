import { getInfo } from "lib/webinfo";
import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import Header from "components/Header/header";
import TopBar from "components/Header/topBar";
import base from "lib/base";

import css from "/styles/productSingle.module.css";
import Section from "components/generals/section";
import Footer from "components/Footer";
import Spinner from "components/Spinner";
import { getBeProduct, getBeProducts } from "lib/beproduct";
import { getRate } from "lib/rate";

export default ({ info, product }) => {
  const router = useRouter();
  const [ogUrl, setOgUrl] = useState("");
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { asPath } = useRouter();
  const [usd, setUsd] = useState("");

  if (router.isFallback) return <Spinner />;

  if (!router.isFallback && !product?._id) {
    router.push("/404");
  }

  useEffect(async () => {
    const { data } = await getRate();
    const usdIndex = await data.findIndex((x) => x.number === 1);
    setUsd(
      data[usdIndex] && data[usdIndex].sellRate && data[usdIndex].sellRate
    );
  }, []);

  useEffect(() => {
    const host = window.location.host;
    const baseUrl = `http://${host}`;

    setOgUrl(`${baseUrl}${asPath}`);
  }, [router.pathname]);

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
              <Swiper
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="productSlide "
              >
                {product.gallery_images &&
                  product.gallery_images.map((el, index) => (
                    <SwiperSlide
                      className="product__slide"
                      key={`product_image_${index}`}
                    >
                      <div className="productCrop"> autobiz.mn</div>
                      <img key={`image_${index}`} src={`${el}`} />
                    </SwiperSlide>
                  ))}
              </Swiper>
              <Swiper
                onSwiper={setThumbsSwiper}
                slidesPerView={4}
                spaceBetween={10}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="productThumbs"
              >
                {product.gallery_images &&
                  product.gallery_images.map((el, index) => (
                    <SwiperSlide
                      className="productThumbs__slide"
                      key={`thumbs__${index}`}
                    >
                      <img key={`image_${index}`} src={el} />
                    </SwiperSlide>
                  ))}
              </Swiper>
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
                  <div className={css.ModelRef}>{product.model_ref}</div>
                </div>

                <div className={css.Info}>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className={css.PriceInfos}>
                        <div>Зарагдаж буй үнэ:</div>
                        <span>
                          ${new Intl.NumberFormat().format(product.price)}
                        </span>
                      </div>
                      <div className={`${css.PriceInfos} ${css.ConverPirce}`}>
                        <div>Хөрвүүлсэн дүн:</div>
                        <span>
                          {parseInt((parseInt(product.price) * usd) / 1000000)}
                          сая ₮
                        </span>
                      </div>
                      <p className={css.Linzing}>
                        Тээвэр, татвар бусад зардал багтаагүй болно
                      </p>
                    </div>
                    <div className="col-lg-6">
                      <div className={css.Location}>
                        Байгаа байршил: {product.country} -{" "}
                        {product.location_fob}
                      </div>
                      <div className={css.ProductBtns}>
                        {/* <button className={`${css.ProductBtn} ${css.Cal}`}>
                          <i class="fa fa-calculator"></i>
                          Тооцоолуур
                        </button> */}
                        <Link href={`/order/${product._id}`}>
                          <button className={`${css.ProductBtn} ${css.Buy}`}>
                            <i className="fa fa-cart-shopping"></i>
                            Захиалга өгөх
                          </button>
                        </Link>
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
                <div className={`${css.ProductTitle} ${css.ProductInfoTitle}`}>
                  <h5> Ерөнхий мэдээлэл </h5>
                </div>
                <div className={css.Fetured}>
                  <table className={css.FeturedTable}>
                    <tr>
                      <td>Төрөл: {product.type_txt}</td>
                      <td>Загвар: {product.model} </td>
                    </tr>
                    <tr>
                      <td>
                        Хөдөлгүүр:{" "}
                        {new Intl.NumberFormat().format(product.engine)}{" "}
                      </td>
                      <td>
                        Гүйлт: {new Intl.NumberFormat().format(product.mileage)}
                      </td>
                    </tr>
                    <tr>
                      <td>Өнгө: {product.color || "-"}</td>
                      <td>Жолооны хүрд: {product.hurd || "-"}</td>
                    </tr>
                    <tr>
                      <td>Үйлдвэрлэгдсэн он: {product.car_year} </td>
                      <td>Орж ирсэн он: - </td>
                    </tr>
                    <tr>
                      <td>Түлшний төрөл: {product.fuel} </td>
                      <td>Transmission: {product.trans}</td>
                    </tr>
                  </table>
                </div>
                <div className={`${css.ProductTitle} ${css.ProductInfoTitle}`}>
                  <h5> Нэмэлт мэдээлэл </h5>
                </div>
                <ul className={css.ListFeatures}>
                  {product.features &&
                    product.features.map((feature) => <li> {feature}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>
      <Footer />
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

  return {
    props: {
      info,
      product,
    },
    revalidate: 10,
  };
};
