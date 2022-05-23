import Head from "next/head";
import { useCookies } from "react-cookie";
import { Fragment, useEffect, useState } from "react";
import base from "lib/base";
const $ = require("jquery");

import { getInfo } from "lib/webinfo";
import TopBar from "components/Header/topBar";
import Header from "components/Header/header";
import Footer from "components/Footer";
import Lend from "components/Lend";

export default ({ info }) => {
  return (
    <Fragment>
      <Head>
        <title>Зээлийн тооцоолуур | {info.name}</title>
        <meta property="og:url" content={`${base.siteUrl}`} />
        <meta
          property="og:title"
          content={`Зээлийн тооцоолуур | ${info.name}`}
        />
        <meta property="og:description" content={info.siteInfo} />
        <script src="//cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js"></script>
      </Head>
      <div>
        <TopBar />
        <Header page={true} text="Зээлийн тооцоолуур" />
      </div>
      <Lend />
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
