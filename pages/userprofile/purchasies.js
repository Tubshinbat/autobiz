import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import { useInfo } from "hooks/use-info";
import base from "lib/base";
import { ToastContainer } from "react-toastify";

import TopBar from "components/Header/topBar";
import Header from "components/Header/header";
import Footer from "components/Footer";
import Side from "components/UserProfile/side";
import { getUser } from "lib/user";

import { getOrders } from "lib/order";

export default ({ user, orders }) => {
  const { info } = useInfo();

  const [active, setActive] = useState("profile");

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
              <div className="ordersListUser">
                <table class="orderTable">
                  <thead>
                    <tr>
                      <th>Хэлцэл</th>
                      <th>Сонгосон машин</th>
                      <th>Мессеж </th>
                      <th> Огноо</th>
                    </tr>
                  </thead>
                  {orders &&
                    orders.map((el) => (
                      <tr>
                        <td>
                          {el.status === true ? " Нээлттэй " : " Дууссан "}
                        </td>
                        <td>
                          {el.product_id && (
                            <a href={`/product/${el.product_id._id}`}>
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
  let orders = [];
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const user = await getUser(token);

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  orders = await getOrders(token);

  return {
    props: {
      user,
      orders,
    },
  };
};
