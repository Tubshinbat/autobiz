import Head from "next/head";
import { useRouter } from "next/router";
import Router from "next/router";
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import base from "lib/base";

import { getInfo } from "lib/webinfo";

import TopBar from "components/Header/topBar";
import Header from "components/Header/header";

import Footer from "components/Footer";
import { useNews } from "hooks/use-news";
import { getNews, getNewsMenus, getSlug } from "lib/news";
import { useMenus } from "hooks/use-links";

import css from "styles/page.module.css";
import ReactTimeAgo from "react-time-ago";

export default ({ info, menus, news }) => {
  const { news: topNews } = useNews(`limit=4&sort={ views: -1 }&star=true`);
  const [dataMenus, setDataMenus] = useState([]);
  const { query, asPath } = useRouter();
  const { menus: mainMenu } = useMenus();
  const [ogUrl, setOgUrl] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (mainMenu) {
      setDataMenus(mainMenu.data);
    }
  }, [mainMenu]);

  useEffect(() => {
    const host = window.location.host;
    const baseUrl = `http://${host}`;

    setOgUrl(`${baseUrl}${asPath}`);
  }, [router.pathname]);

  const renderMenu = (categories) => {
    let myCategories = [];
    categories &&
      categories.map((el) => {
        myCategories.push(
          <li key={el._id}>
            {!el.isDirect && !el.model && (
              <Link href={`/p/${el.slug}`}>
                <a>{el.name}</a>
              </Link>
            )}
            {el.isDirect && (
              <a href={el.direct} target="_blank">
                {el.name}
              </a>
            )}
            {el.model && (
              <Link href={`/${el.model}`}>
                <a>{el.name}</a>
              </Link>
            )}
          </li>
        );
      });

    return myCategories;
  };

  return (
    <Fragment>
      <Head>
        <title>
          {news.name} | {info.name}
        </title>
        <meta property="og:url" content={`${base.siteUrl}/${asPath}`} />
        <meta property="og:title" content={`${news.name} | ${info.name}`} />
        <meta property="og:description" content={news.shortDetails} />
      </Head>
      <div>
        <TopBar />
        <Header />
      </div>
      <section className="newsSection ">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="newsView">
                <div className="newsTitle">
                  <h2>{news.name}</h2>
                </div>
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
                        href={`http://pinterest.com/pin/create/button/?url=${ogUrl}&media=&description=${news.title}`}
                      >
                        <i className="fa-brands fa-twitter-square" />
                        Twitter
                      </a>
                    </li>

                    <li>
                      <a
                        className="linkedin"
                        href={`http://www.linkedin.com/shareArticle?mini=true&url=${ogUrl}&title=${news.title}&summary=&source=${ogUrl}`}
                      >
                        <i className="fa-brands fa-linkedin" />
                        <span />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="newsViewPicture">
                  <img src={`${base.cdnUrl}/${news.pictures[0]}`} />
                </div>
                <div className="newsViewRequire">
                  <div className="newsViewItem">
                    <i className="fa fa-bolt"></i>
                    {news.views}
                  </div>
                  <div className="newsViewItem">
                    <i className="fa-regular fa-clock"></i>
                    <ReactTimeAgo date={news.createAt} locale="mn-MN" />
                  </div>
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: news.details,
                  }}
                  className="newsDescription"
                ></div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="homesides">
                <div className="side">
                  <div className="sideTitle">Мэдээний ангилал</div>
                  <ul className="sideMenu">
                    {menus &&
                      menus.map((menu) => (
                        <li key={menu._id}>
                          <Link href={`/news?category=${menu._id}`}>
                            <a>{menu.name} </a>
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="side">
                  <div className="sideTitle"> Эрэлтэй нийтлэл</div>
                  <div className={css.Side__News}>
                    {topNews &&
                      topNews.map((el, index) => {
                        return (
                          <Link href={`/post/${el.slug}`}>
                            <a
                              className={css.Side__Newsbox}
                              key={`${el._id}_top`}
                            >
                              <div className={css.News__img}>
                                <img
                                  src={`${base.cdnUrl}/150x150/${el.pictures[0]}`}
                                />
                              </div>
                              <div className={css.News__detials}>
                                <div className={css.News__date}>
                                  <i class="fa-regular fa-clock"></i>{" "}
                                  <ReactTimeAgo
                                    date={el.createAt}
                                    locale="mn-MN"
                                  />
                                </div>
                                <h4 className={css.News__title}>{el.name}</h4>
                              </div>
                            </a>
                          </Link>
                        );
                      })}
                  </div>
                </div>

                <div className="side">
                  <div className="sideTitle">Туслах цэс</div>
                  <ul className="sideMenu">{renderMenu(dataMenus)}</ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </Fragment>
  );
};

export const getStaticProps = async ({ params }) => {
  const { info } = await getInfo();
  const { news } = await getSlug(params.slug);
  const { menus } = await getNewsMenus(`active=true`);

  return {
    props: {
      info,
      news,
      menus,
    },
    revalidate: 10,
  };
};

export const getStaticPaths = async () => {
  const { news } = await getNews(`active=true`);

  return {
    paths: news.map((n) => ({
      params: {
        slug: n.slug,
      },
    })),
    fallback: true,
  };
};
