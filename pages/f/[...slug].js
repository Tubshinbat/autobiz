import Footer from "components/Footer";

import { getFooterMenu, getMenu } from "lib/menus";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";

import css from "styles/page.module.css";
import { getFooterPage, getPage } from "lib/page";
import { useNews } from "hooks/use-news";
import ReactTimeAgo from "react-time-ago";
import base from "lib/base";
import Header from "components/Header/header";
import { useInfo } from "hooks/use-info";
import { SimpleShareButtons } from "react-simple-share";

const Page = ({ menu, pageData, childeMenus, sameParentMenus }) => {
  // const { page } = usePage(slug);
  const router = useRouter();
  const [slug, setSlug] = useState(router.query.slug);

  const { news } = useNews([], `limit=4&sort={ views: -1 }&star=true`);
  useEffect(() => {
    const data = router.query.slug;
    setSlug(data.join("/"));
  }, [router.query.slug]);

  const { info } = useInfo();

  return (
    <Fragment>
      <Head>
        <title>
          {menu.name} - {info.name}
        </title>
      </Head>
      <Header />

      <div className={`${css.Page} animate__animated animate__fadeIn`}>
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className={css.PageInfo}>
                <div className={css.PageInfo__head}>
                  <h4 className={css.PageName}>{menu && menu.name}</h4>

                  <div className={css.Page__info}>
                    <div className={css.Page__infoLeft}></div>
                    <div className={css.Page__infoRigth}>
                      <div className={css.Page__share}></div>
                    </div>
                  </div>
                </div>

                {pageData.pictures && pageData.pictures.length === 1 && (
                  <img
                    src={`${base.cdnUrl}/${pageData.pictures[0]}`}
                    className={css.bigImage}
                  />
                )}

                {pageData.pictures && pageData.pictures.length > 1 && (
                  <Swiper
                    modules={[Navigation]}
                    autoHeight={true}
                    navigation={{
                      prevEl: ".newsViewSlider__prev",
                      nextEl: ".newsViewSlider__next",
                    }}
                    className="newsViewSlider"
                  >
                    {pageData.pictures &&
                      pageData.pictures.map((pic, index) => (
                        <SwiperSlide
                          className="newsViewSlide"
                          key={index + "nview"}
                        >
                          <img src={`${base.cdnUrl}/${pic}`} />
                        </SwiperSlide>
                      ))}
                    <div className="newsViewSlide__nav">
                      <div className="newsViewSlider__prev swiper-button-prev"></div>
                      <div className="newsViewSlider__next swiper-button-next"></div>
                    </div>
                  </Swiper>
                )}

                <div
                  dangerouslySetInnerHTML={{
                    __html: pageData.pageInfo,
                  }}
                  className={css.Description}
                ></div>
              </div>
            </div>
            <div className="col-md-4">
              <div className={`${css.Sides}`}>
                {childeMenus && childeMenus.length > 0 && (
                  <div className={`${css.Side} `}>
                    <ul className={css.ListSub}>
                      {childeMenus.map((el) => {
                        return (
                          <li key={el._id}>
                            {!el.isDirect && !el.model && (
                              <Link href={`/f/${slug}/${el.slug}`}>
                                <a data-effect={el.name}>{el.name}</a>
                              </Link>
                            )}
                            {el.isDirect && (
                              <a
                                href={el.direct}
                                target="_blank"
                                data-effect={el.name}
                              >
                                {el.name}
                              </a>
                            )}
                            {el.model && (
                              <Link href={`/${el.model}`}>
                                <a data-effect={el.name}>{el.name}</a>
                              </Link>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                {sameParentMenus && (
                  <div className={`${css.Side} `}>
                    <ul className={css.ListSub}>
                      {sameParentMenus.map((el) => {
                        let mslug = "" + slug;
                        mslug = mslug.split("/");
                        mslug.pop();

                        return (
                          <li key={el._id}>
                            {!el.isDirect && !el.model && (
                              <Link href={`/f/${mslug}/${el.slug}`}>
                                <a data-effect={el.name}>{el.name}</a>
                              </Link>
                            )}
                            {el.isDirect && (
                              <a
                                href={el.direct}
                                target="_blank"
                                data-effect={el.name}
                              >
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
                      })}
                    </ul>
                  </div>
                )}
                <div className={`${css.Side} `}>
                  <div className={css.Side__title}>Эрэлтэй мэдээ</div>
                  <div className={css.Title__Border}></div>
                  <div className={css.Side__News}>
                    {news &&
                      news.map((el, index) => {
                        return (
                          <Link href={`/post/${el.slug}`}>
                            <a className={css.Side__Newsbox} key={el._id}>
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
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </Fragment>
  );
};
export const getServerSideProps = async ({ params }) => {
  // Pass data to the page via props

  let menu = null;
  let parent = null;
  let pageData = null;
  let childeMenus = null;
  let sameParentMenus = null;

  await getFooterMenu(params.slug)
    .then((res) => {
      menu = res.menu;
      parent = res.parent;
      childeMenus = res.childeMenus;
      sameParentMenus = res.sameParentMenus;
    })
    .catch((err) => console.log(err));

  await getFooterPage(menu._id)
    .then((res) => {
      pageData = res.page;
    })
    .catch((err) => console.log(err));

  return { props: { menu, parent, pageData, childeMenus, sameParentMenus } };
};
export default Page;
