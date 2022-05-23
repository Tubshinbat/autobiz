import Head from "next/head";
import { useCookies } from "react-cookie";
import { Fragment, useState } from "react";
import base from "lib/base";
import { useRouter } from "next/router";

import { getInfo } from "lib/webinfo";
import TopBar from "components/Header/topBar";
import Header from "components/Header/header";

import Footer from "components/Footer";

export default ({ info }) => {
  const [type, setType] = useState("products");
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "type") setType(value);
    if (name === "searchText") setSearchText(value);
  };

  const handleSearch = () => {
    router.push(`/${type}?title=${searchText}`);
  };
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
      <div className="searchBoxMobile">
        <div className="container">
          <div className="searchBox">
            <select name="type" onChange={handleChange} value={type}>
              <option value="products">Бэлэн байгаа</option>
              <option value="beproducts"> Ачигдахад бэлэн </option>
            </select>
            <input
              type="text"
              name="searchText"
              onChange={handleChange}
              value={searchText}
              placeholder="Эндээс машинаа хайна уу"
            />
            <button onClick={handleSearch}>
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="notFoundSection desktop">
        <img src="/images/404.png" />
        <p> Уучлаарай тус хуудас олдсонгүй </p>
        <a href="/"> Нүүр хуудас </a>
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
