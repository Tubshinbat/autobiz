import Head from "next/head";
import { useCookies } from "react-cookie";
import { Fragment, useEffect, useState, useContext } from "react";
import base from "lib/base";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";

import { getInfo } from "lib/webinfo";
import TopBar from "components/Header/topBar";
import Header from "components/Header/header";
import Footer from "components/Footer";
import { regEmail, requiredCheck } from "lib/inputRegex";
import { toastControl } from "lib/toastControl";
import { checkToken } from "lib/token";
import { useInfo } from "hooks/use-info";
import UserContext from "context/UserContext";
import Spinner from "components/Spinner";

export default ({ data, error, success }) => {
  const [loginForm, setLoginForm] = useState({});
  const [errors, setError] = useState({
    email: "",
    password: true,
  });
  const router = useRouter();
  const userCtx = useContext(UserContext);

  const { info } = useInfo();

  // PAGE INIT
  const init = () => {
    setError({
      email: "",
      password: true,
    });
    setLoginForm(() => ({
      email: null,
      password: null,
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginForm((bf) => ({ ...bf, [name]: value }));
    checkFrom(name, value);
  };

  const checkFrom = (name, value) => {
    let result;
    result = requiredCheck(value);
    if (result === true && name === "email") result = regEmail(value);
    setError((be) => ({ ...be, [name]: result }));
  };

  const checkTrue = () => {
    let errorCount = 0;
    let errorsValues = Object.values(errors);
    errorsValues.map((el) => {
      el === true && errorCount++;
    });
    return errorsValues.length === errorCount;
  };

  const allCheck = () => {
    Object.keys(errors).map((el) => {
      checkFrom(el, loginForm[el] === undefined ? "" : loginForm[el]);
    });
    return checkTrue();
  };

  useEffect(() => {
    if (userCtx.state.success) {
      toastControl("success", userCtx.state.success);
      init();
      router.back();
    }
    return () => {
      userCtx.clear();
      init();
    };
  }, [userCtx.state.success]);

  useEffect(() => {
    if (userCtx.state.userData) router.push("/userprofile");
    console.log(userCtx);
    return init();
  }, []);

  useEffect(() => {
    if (userCtx.state.error) {
      toastControl("error", userCtx.state.error);
    }
    return;
  }, [userCtx.state.error]);

  const login = async () => {
    if (allCheck()) {
      userCtx.loginUser(loginForm);
    } else toastControl("error", "Талбаруудыг бөглөнө үү");
  };

  return (
    <Fragment>
      <Head>
        <title>Нэвтрэх {info.name}</title>
        <meta property="og:url" content={`${base.siteUrl}`} />
        <meta property="og:title" content={info.name} />
        <meta property="og:description" content={info.siteInfo} />
      </Head>
      <div>
        <TopBar />
        <Header page={true} text="Нэвтрэх" />
      </div>
      <div className="loginSection">
        <div className="loginForm">
          {userCtx.state.loading && <Spinner />}
          <div className="loginHeader">
            <li className={`loginTab active`}>Нэвтрэх</li>
          </div>
          <div className="login-field">
            <input
              type="email"
              name="email"
              placeholder="Та И-Мэйл хаягаа оруулна уу"
              value={loginForm.email}
              onChange={handleChange}
              className={`form-control ${
                (errors.email === true && "is-valid") ||
                (errors.email !== "" && "is-invalid")
              }`}
            />
            <div className="field">
              <p className="fieldError"> {errors.email}</p>
            </div>
          </div>

          <div className="login-field">
            <input
              type="password"
              name="password"
              placeholder="Та нууц үгээ оруулна уу"
              value={loginForm.password}
              onChange={handleChange}
              className={`form-control
                ${errors.password !== true && "is-invalid"}`}
            />

            <div className="field">
              <button onClick={() => router.push("/forget")}>
                Нууц үгээ мартсан
              </button>
            </div>
          </div>

          <button onClick={login} type="button" className="btn btn-login">
            Нэвтрэх
          </button>
          <button
            onClick={() => router.push("/register")}
            type="button"
            className="btn btn-register"
          >
            Бүртгүүлэх
          </button>
        </div>
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
    return { props: {} };
  }

  const { data, error } = await checkToken(token);

  if (error) {
    return { props: {} };
  }

  if (data) {
    return {
      redirect: {
        destination: "/userprofile",
        permanent: false,
      },
    };
  }

  return { props: {} };
};
