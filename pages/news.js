import Head from "next/head";
import { Fragment } from "react";
import base from "lib/base";
import { getInfo } from "lib/webinfo";

import TopBar from "components/Header/topBar";
import Header from "components/Header/header";
import Footer from "components/Footer";

export default ({ info }) => {
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
      <div className="container">
        <div className="newsList">
          <div className="news"></div>
        </div>
      </div>
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
    revalidate: 50,
  };
};
