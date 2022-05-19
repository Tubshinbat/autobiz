import Head from "next/head";
import { useCookies } from "react-cookie";
import { Fragment } from "react";
import { useInfo } from "hooks/use-info";
import base from "lib/base";

import TopBar from "components/Header/topBar";
import Header from "components/Header/header";
import Footer from "components/Footer";
import Side from "components/UserProfile/side";
import { checkToken } from "lib/token";
import { getUser } from "lib/user";

export default ({ data, user }) => {
  const { info } = useInfo();
  console.log(data);
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
              <Side />
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
  let user = {};
  const { data } = await checkToken({ autobiztoken: token });
  if (!data) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  if (data) {
    const { user: result } = await getUser(data, token);
    user = result;
  }

  return {
    props: {
      data,
      user,
    },
  };
};
