import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useInfo } from "hooks/use-info";
import base from "lib/base";
import { ToastContainer } from "react-toastify";

import TopBar from "components/Header/topBar";
import Header from "components/Header/header";
import Footer from "components/Footer";
import Side from "components/UserProfile/side";
import { checkToken, getUser } from "lib/user";

import { getOrders } from "lib/order";
import { useOrders } from "hooks/use-orders";
import Pagination from "react-js-pagination";

export default ({ user, orders }) => {
  const { query, asPath } = useRouter();
  const { info } = useInfo();
  const [active, setActive] = useState("profile");
  const router = useRouter();

  //-- PAGINATION
  const [activePage, setActivePage] = useState(parseInt(query.page) || 1);
  const [limit, setLimit] = useState({});
  const [total, setTotal] = useState();

  const { orders: ordersData, pagination } = useOrders(
    `ordertype=${query.ordertype}&ordernumber=${query.ordernumber}&page=${query.page}`,
    orders
  );

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

  const handleChange = (event) => {
    router.replace({
      pathname: router.pathname,
      query: { ...query, ordernumber: event.target.value },
    });
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
        <Header page={true} text="Худалдаж авах хүсэлтэй" />
      </div>
      <div className="container">
        <section className={`row userprofileSection `}>
          <div className="row">
            <div className="col-lg-3">
              <Side user={user} />
            </div>
            <div className="col-lg-9">
              <div className="ordersListUser userFormProfile">
                <h3> Миний захиалгууд </h3>
                <div className="orderSearch">
                  <input
                    type="text"
                    name="ordernumber"
                    className="orderSearchInput"
                    onChange={handleChange}
                    placeholder="Захиалгын дугаараар хайх"
                  />
                </div>
                <table class="orderTable">
                  <thead>
                    <tr>
                      <th>Захиалгын дугаар</th>
                      <th>Төлөв</th>
                      <th>Сонгосон машин</th>
                      <th>Мессеж </th>
                      <th> Огноо</th>
                    </tr>
                  </thead>
                  {ordersData &&
                    ordersData.map((el) => (
                      <tr>
                        <td>{el.orderNumber}</td>
                        <td>{el.orderType ? el.orderType.name : " Шинэ "}</td>
                        <td>
                          {el.product_id && (
                            <a
                              href={`/product/${el.product_id._id}`}
                              target="_blank"
                            >
                              {el.product_id && el.product_id.title}{" "}
                            </a>
                          )}
                        </td>
                        <td>
                          <ul>
                            {el.message &&
                              el.message.length > 0 &&
                              el.message[el.message.length - 1]}
                          </ul>
                        </td>
                        <td>{el.createAt}</td>
                      </tr>
                    ))}
                </table>
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
          </div>
        </section>
      </div>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Fragment>
  );
};

export const getServerSideProps = async function ({ req, res }) {
  let token = req.cookies.autobiztoken;

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const { data, error } = await checkToken(token);
  if (error) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const { user, err } = await getUser(token);

  if (err || !user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  let orders = await getOrders(token);

  return {
    props: {
      user,
      orders,
    },
  };
};
