import Footer from "components/footer";
import { getMenu } from "lib/menus";
import Head from "next/head";

import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useRef, useState } from "react";

import css from "styles/Page.module.css";
import { getEmployees, getPage, getPages } from "lib/page";
import { useNews } from "hooks/use-news";
import ReactTimeAgo from "react-time-ago";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import base from "lib/base";
import { useInfo } from "hooks/use-info";
import Header from "components/Header/header";

const Page = ({
  menu,
  parent,
  pageData,
  childeMenus,
  sameParentMenus,
  employees,
  pages,
}) => {
  const router = useRouter();
  const [slug, setSlug] = useState(router.query.slug);
  const { news } = useNews([], `limit=4&sort={ views: -1 }&star=true`);
  const { info } = useInfo();

  useEffect(() => {
    const data = router.query.slug;
    setSlug(data.join("/"));
  }, [router.query.slug]);

  const backGo = () => {
    router.back();
  };

  const componentRef = useRef();
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
            <div className="col-md-8" ref={componentRef}>
              <div className={css.PageInfo}>
                <div className={css.PageInfo__head}>
                  <h4 className={css.PageName}>{menu.name}</h4>
                </div>

                {pageData.pictures && pageData.pictures.length === 1 && (
                  <img
                    src={`${base.cdnUrl}/${pageData.pictures[0]}`}
                    className={css.bigImage}
                  />
                )}
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
                    pageData.pictures.length > 1 &&
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

                <div
                  dangerouslySetInnerHTML={{
                    __html: pageData && pageData.pageInfo,
                  }}
                  className={css.Description}
                ></div>

                {pageData.listActive && (
                  <div className={`row ${css.PageLists}`}>
                    {childeMenus &&
                      childeMenus.map((el) => {
                        let link;

                        if (!el.isDirect && !el.model) {
                          link = `/p/${slug}/${el.slug}`;
                        }

                        if (el.isDirect) {
                          link = el.direct;
                        }
                        if (el.model) {
                          link = el.model;
                        }

                        return (
                          <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className={css.List__element}>
                              <a href={link}>
                                {el.picture ? (
                                  <img src={`${base.cdnUrl}/${el.picture}`} />
                                ) : (
                                  <img src="/images/list-bg.jpg" />
                                )}
                              </a>
                              <div className={css.List__about}>
                                <a href={link}> {el[Llang].name} </a>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
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
                              <Link href={`/p/${slug}/${el.slug}`}>
                                <a>{el.name}</a>
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
                        mslug = mslug.join("/");

                        return (
                          <li key={el._id}>
                            {!el.isDirect && !el.model && (
                              <Link href={`/p/${mslug}/${el.slug}`}>
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
                <div className={`${css.Side} `}>
                  <div className={css.Side__title}>Эрэлтэй мэдээ</div>

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
  let employees = null;
  // let pages = null;

  await getMenu(params.slug)
    .then((res) => {
      menu = res.menu;
      parent = res.parent;
      childeMenus = res.childeMenus;
      sameParentMenus = res.sameParentMenus;
    })
    .catch((err) => console.log(err));

  if (menu !== null) {
    await getPage(menu._id)
      .then((res) => {
        pageData = res.page;
      })
      .catch((err) => console.log(err));
  }

  if (pageData !== null) {
    if (pageData.position) {
      let pIds = [];
      pageData.position.map((el) => pIds.push(el._id));
      if (pIds.length <= 0) pIds = null;

      await getEmployees(pIds)
        .then((res) => {
          employees = res.employees;
        })
        .catch(() => {});
    }
    // if (pageData && pageData.listAdmissionActive === true) {
    //   await getPages(`status=true&admissionActive=true`).then((res) => {
    //     pages = res.pages;
    //   });
    // }
  }

  return {
    props: {
      menu,
      parent,
      pageData,
      childeMenus,
      sameParentMenus,
      employees,
      // pages,
    },
  };
};
export default Page;
