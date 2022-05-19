import Head from "next/head";
import { useCookies } from "react-cookie";
import { Fragment } from "react";
import base from "lib/base";

import { getInfo } from "lib/webinfo";
import Section from "components/generals/section";
import TopBar from "components/Header/topBar";
import Header from "components/Header/header";
import Banner from "components/Banner";
import HomeMain from "components/Home-main";
import News from "components/Home-main/news";
import Footer from "components/Footer";

export default ({ info }) => {
  const [cookies] = useCookies();

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
          <Link href="#">
            <div className="news"></div>
          </Link>
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
