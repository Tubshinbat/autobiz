import Head from "next/head";
import { Fragment } from "react";
import { useInfo } from "hooks/use-info";
import base from "lib/base";

import TopBar from "components/Header/topBar";
import Header from "components/Header/header";
import Footer from "components/Footer";
import Side from "components/UserProfile/side";
import { getUser } from "lib/user";

export default ({ user }) => {
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
        <Header />
      </div>
      <div className="container">
        <section className="row userprofileSection">
          <div className="row">
            <div className="col-lg-3">
              <Side user={user} />
            </div>
            <div className="col-lg-9">
              <div className="userprofile">
                <div className="profileBtns">
                  <div
                    className={`profileBtn ${
                      active === "profile" && "current"
                    }`}
                    onClick={() => setActive("profile")}
                  >
                    <i className="fa-regular fa-user"></i>
                    <div className="btnInfo">
                      <p className="btnTitle">Хувийн мэдээлэл</p>
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
                      <p className="btnTitle">Нууц үг</p>
                      <p className="btnTitleSpan">Шинэчлэх, өөрчлөх</p>
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

  const user = await getUser(token);

  if (!user) {
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
    },
  };
};
