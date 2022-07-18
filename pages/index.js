import Head from "next/head";
import { useCookies } from "react-cookie";
import { Fragment } from "react";
import base from "lib/base";

import { getInfo } from "lib/webinfo";
import { getBanners } from "lib/banners";
import Section from "components/generals/section";
import TopBar from "components/Header/topBar";
import Header from "components/Header/header";
import Banner from "components/Banner";
import HomeMain from "components/Home-main";
import News from "components/Home-main/news";
import Footer from "components/Footer";
import { useBanners } from "hooks/use-banner";

export default ({ info, banner }) => {
  const [cookies] = useCookies();
  const { banners } = useBanners();
  return (
    <Fragment>
      <Head>
        <title>{info.name}</title>

        <meta property="og:url" content={`${base.siteUrl}`} />
        <meta property="og:title" content={info.name} />
        <meta property="og:description" content={info.siteInfo} />
        <meta
          property="og:image"
          content={`${base.cdnUrl}/${banner.picture}`}
          key="ogimage"
        />
        <meta
          property="og:image:url"
          content={`${base.cdnUrl}/${banner.picture}`}
        />

        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <div className="home">
        <TopBar />
        <Header />
        <Banner />
      </div>
      <HomeMain />
      <News />
      <Footer />
    </Fragment>
  );
};

export const getStaticProps = async () => {
  const { info } = await getInfo();
  const { banners } = await getBanners();
  return {
    props: {
      info,
      banner: banners,
    },
    revalidate: 50,
  };
};
