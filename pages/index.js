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

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://autobiz.mn/" />
        <meta property="og:title" content="Autobiz.mn" />
        <meta property="og:description" content />
        <meta
          property="og:image"
          content="https://autobiz.mn/uploads/photo_banner_pradoo.jpg"
        />
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://autobiz.mn/" />
        <meta property="twitter:title" content="Autobiz.mn" />
        <meta property="twitter:description" content />
        <meta
          property="twitter:image"
          content="https://autobiz.mn/uploads/photo_banner_pradoo.jpg"
        />
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
