import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import base from "lib/base";
import { getInfo } from "lib/webinfo";
import Link from "next/link";
import { useRouter } from "next/router";
import Router from "next/router";

import TopBar from "components/Header/topBar";
import Header from "components/Header/header";
import Footer from "components/Footer";
import { getNews, getNewsMenus } from "lib/news";
import { useNews } from "hooks/use-news";
import ReactTimeAgo from "react-time-ago";
import { useMenus } from "hooks/use-links";
import css from "styles/page.module.css";
import Pagination from "react-js-pagination";

export default ({ info, menus }) => {
  const [dataMenus, setDataMenus] = useState([]);
  const { query, asPath } = useRouter();
  const { menus: mainMenu } = useMenus();
  const router = useRouter();
  const { news: topNews } = useNews(`limit=4&sort={ views: -1 }&star=true`);

  //-- PAGINATION
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState({});
  const [total, setTotal] = useState();

  const { news, pagination } = useNews(
    `status=true&category=${router.query.category}&sortNews=${router.query.sortNews}&page=${router.query.page}`
  );

  useEffect(() => {
    if (mainMenu) {
      setDataMenus(mainMenu.data);
    }
  }, [mainMenu]);

  useEffect(() => {
    if (pagination) {
      setTotal(pagination.total);
      setLimit(pagination.limit);
    }
  }, [pagination]);

  const handlePageChange = (pageNumber) => {
    window.scrollTo(0, 0);
    setActivePage(pageNumber);
    router.replace({
      pathname: router.pathname,
      query: { ...query, page: pageNumber },
    });
  };

  const handleSort = (event) => {
    Router.replace({
      pathname: router.pathname,
      query: { ...query, sort: event.target.value },
    });
  };

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
        <title>{info.name}</title>
        <meta property="og:url" content={`${base.siteUrl}`} />
        <meta property="og:title" content={info.name} />
        <meta property="og:description" content={info.siteInfo} />
      </Head>
      <div>
        <TopBar />
        <Header page={true} text="Нийтлэл" />
      </div>
      <section className="newsSection ">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className={css.PageInfo__head}>
                <h4 className={css.PageName}>Нийтлэл мэдээлэл</h4>
              </div>
              <div className="newsList">
                {news &&
                  news.map((el) => (
                    <div className="news" key={el._id}>
                      <Link href={`post/${el.slug}`}>
                        <div className="newsImageBox">
                          <img
                            className="newsImage"
                            src={`${base.cdnUrl}//${el.pictures[0]}`}
                            alt="news picture"
                          />
                        </div>
                      </Link>
                      <div className="newsInfo">
                        <Link href={`post/${el.slug}`}>
                          <h3> {el.name} </h3>
                        </Link>
                        <div className="newsDate">
                          <div className={`newsdate_item`}>
                            <i className="fa-regular fa-clock"></i>
                            <ReactTimeAgo date={el.createAt} locale="mn-MN" />
                          </div>
                          <div className={`newsdate_item`}>
                            <i className="fa fa-bolt"></i> {el.views} үзсэн
                          </div>
                        </div>
                        <p className="shortDesc"> {el.shortDetails}</p>
                      </div>
                    </div>
                  ))}

                {news && news.length < 1 && (
                  <div className={`notFound`}>
                    <img src="/images/notfound.png" />
                    <p> "Илэрц олдсонгүй" </p>
                  </div>
                )}
                {total && (
                  <div className={`pagination`}>
                    <Pagination
                      activePage={parseInt(query.page) || 1}
                      itemClass={`page-item`}
                      linkClass={"page-link"}
                      itemsCountPerPage={limit}
                      totalItemsCount={total}
                      pageRangeDisplayed={5}
                      onChange={handlePageChange.bind()}
                    />
                  </div>
                )}
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

export const getStaticProps = async () => {
  const { info } = await getInfo();
  const { news, pagination } = await getNews(`status=true`);
  const { menus } = await getNewsMenus(`status=true`);

  return {
    props: {
      info,
      news,
      menus,
      pagination,
    },
    revalidate: 100,
  };
};
