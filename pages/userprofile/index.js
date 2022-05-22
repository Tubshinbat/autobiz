import Head from "next/head";
import { Fragment } from "react";
import { useInfo } from "hooks/use-info";
import base from "lib/base";

import TopBar from "components/Header/topBar";
import Header from "components/Header/header";
import Footer from "components/Footer";
import Side from "components/UserProfile/side";
import { checkToken } from "lib/token";
import { getUser } from "lib/user";

import { toastControl } from "lib/toastControl";
import { ToastContainer } from "react-toastify";

export default ({ user }) => {
  const { info } = useInfo();

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
      <div className="container">
        <section className="row userprofileSection">
          <div className="row">
            <div className="col-lg-3">
              <Side user={user} />
            </div>
            <div className="col-lg-9">b</div>
          </div>
        </section>
      </div>
      <Footer />
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

  const { data } = await checkToken(token);

  if (data !== undefined) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // const user = await getUser();

  return {
    props: {
      user: {},
    },
  };
};
