import Head from "next/head";
import { useCookies } from "react-cookie";
import { Fragment } from "react";
import base from "lib/base";

import TopBar from "components/Header/topBar";
import Header from "components/Header/header";
import Footer from "components/Footer";
import { useInfo } from "hooks/use-info";
import { getProduct, getProducts } from "lib/product";
import { getInfo } from "lib/webinfo";

export default ({ product }) => {
  const { info } = useInfo();
  return (
    <Fragment>
      <Head>
        <title>{info.name}</title>
        <meta property="og:url" content={`${base.siteUrl}`} />
        <meta property="og:title" content={info.name} />
        <meta property="og:description" content={info.siteInfo} />
      </Head>
      <div>
        <TopBar />
        <Header />
      </div>
      <section className="purchase">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="purchaseTitle">
                <h2> Сонгосон машин</h2>
              </div>
              <div className="purchaseList">
                <div className="purchaseItem">
                  <div className="purchaseDetails">
                    <div className="purchaseImage">
                      {product.pictures && (
                        <img src={`${base.cdnUrl}/${product.pictures[0]}`} />
                      )}
                    </div>
                    <div className="purchaseInfo">
                      <span> {product.car_industry.name} </span>
                      <h5> {product.title}</h5>
                    </div>
                  </div>
                  <div className="purchasePrice">
                    <p>{new Intl.NumberFormat().format(product.price)} ₮</p>
                  </div>
                </div>
              </div>
              <div className="purchaseTitle">
                <h5> Хувийн мэдээлэл оруулах </h5>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="deals">
                <div className="deal"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </Fragment>
  );
};

export const getServerSideProps = async function ({ req, res, params }) {
  //
  const { id } = params;

  const { product } = await getProduct(id);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return { props: { product } };
};
