import { getProduct, getProducts } from "lib/product";
import { getInfo } from "lib/webinfo";
import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import ImageGallery from "react-image-gallery";

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
import Lend from "components/Lend";

export default ({ info, product }) => {
  const router = useRouter();
  const [image, setImage] = useState([]);
  const [ogUrl, setOgUrl] = useState("");
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { asPath } = useRouter();

  if (router.isFallback) return <Spinner />;

  if (!router.isFallback && !product?._id) {
    router.push("/404");
  }

  useEffect(() => {
    const host = window.location.host;
    const baseUrl = `http://${host}`;

    setOgUrl(`${baseUrl}${asPath}`);
  }, [router.pathname]);

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
              <ImageGallery items={image} />
              {/* <Swiper
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="productSlide"
              >
                {product.pictures &&
                  product.pictures.map((el, index) => (
                    <SwiperSlide
                      className="product__slide"
                      key={`product_image_${index}`}
                    >
                      <img
                        key={`image_${index}`}
                        src={`${base.cdnUrl}/${el}`}
                      />
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
                {product.pictures &&
                  product.pictures.map((el, index) => (
                    <SwiperSlide
                      className="productThumbs__slide"
                      key={`thumbs__${index}`}
                    >
                      <img
                        key={`image_${index}`}
                        src={base.cdnUrl + "/" + el}
                      />
                    </SwiperSlide>
                  ))}
              </Swiper> */}
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
                  <div className="row">
                    <div className="col-lg-6">
                      <div className={css.PriceInfos}>
                        <div>Зарагдах үнэ:</div>
                        <span>{parseInt(product.price) / 1000000} сая ₮</span>
                      </div>
                      <p className={css.Linzing}>{product.lizing}</p>
                    </div>
                    <div className="col-lg-6">
                      <div className={css.ProductBtns}>
                        <a
                          href="#Lend"
                          className={`${css.ProductBtn} ${css.Cal}`}
                        >
                          <i class="fa fa-calculator"></i>
                          Тооцоолуур
                        </a>
                        <Link href={`/purchase/${product._id}`}>
                          <button className={`${css.ProductBtn} ${css.Buy}`}>
                            <i className="fa fa-cart-shopping"></i>
                            Худалдан авах
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
                      <td>Төрөл: {product.car_type.name}</td>
                      <td>Загвар: {product.car_zagvar.name} </td>
                    </tr>
                    <tr>
                      <td>Хөдөлгүүр: {product.car_motor} </td>
                      <td>Гүйлт: {product.car_km}</td>
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
                      <td>Моторын багтаамж: {product.car_motor} </td>
                    </tr>
                  </table>
                </div>
                <div className={`${css.ProductTitle} ${css.ProductInfoTitle}`}>
                  <h5> Нэмэлт мэдээлэл </h5>
                  <div
                    className={css.More}
                    dangerouslySetInnerHTML={{
                      __html: product.description,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
      <Lend dPrice={product.price} />
      <Footer />
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
