import Head from "next/head";
import { Fragment, useContext, useEffect, useState } from "react";
import { useInfo } from "hooks/use-info";
import base from "lib/base";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";

import TopBar from "components/Header/topBar";
import Header from "components/Header/header";
import Footer from "components/Footer";
import Side from "components/UserProfile/side";
import { checkToken, getUser } from "lib/user";
import Profile from "components/UserProfile/profile";
import PasswordTab from "components/UserProfile/passwordTab";
import { useCookies } from "react-cookie";
import UserContext from "context/UserContext";

export default ({ user, error }) => {
  const { info } = useInfo();
  const [active, setActive] = useState("profile");
  const userCtx = useContext(UserContext);
  const [cookies, setCookie, removeCookie] = useCookies(["autobiztoken"]);
  const router = useRouter();

  useEffect(() => {
    if (cookies.autobiztoken) {
      router.push("/login");
    }
    if (!userCtx.state.userData) {
      userCtx.getUser(cookies.autobiztoken);
    }
  }, []);

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
            <div className="col-lg-3 col-sm-12">
              <Side user={user} />
            </div>
            <div className="col-lg-9">
              <div className="desktop userprofile">
                <div className="profileBtns">
                  <div
                    className={`profileBtn ${
                      active === "profile" && "current"
                    }`}
                    onClick={() => setActive("profile")}
                  >
                    <i className="fa-regular fa-user"></i>
                    <div className="btnInfo">
                      <p className="btnTitle">???????????? ????????????????</p>
                      <p className="btnTitleSpan">{user.firstname}</p>
                    </div>
                  </div>
                  <div
                    className={`profileBtn ${
                      active === "password" && "current"
                    }`}
                    onClick={() => setActive("password")}
                  >
                    <i className="fa-solid fa-lock"></i>
                    <div className="btnInfo">
                      <p className="btnTitle">???????? ????</p>
                      <p className="btnTitleSpan">????????????????, ??????????????</p>
                    </div>
                  </div>
                  <Profile user={user} active={active} />
                  <PasswordTab user={user} active={active} />
                </div>
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

  return {
    props: {
      user,
      err,
    },
  };
};
