import Head from "next/head";
import { useCookies } from "react-cookie";
import { Fragment, useEffect, useState } from "react";
import base from "lib/base";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";

import { getInfo } from "lib/webinfo";
import TopBar from "components/Header/topBar";
import Header from "components/Header/header";
import Footer from "components/Footer";
import { regEmail, requiredCheck } from "lib/inputRegex";
import { toastControl } from "lib/toastControl";
import { loginUser } from "lib/login";
import { checkToken } from "lib/token";
import { useInfo } from "hooks/use-info";

export default ({ data, error, success }) => {
  const [loginForm, setLoginForm] = useState({});
  const { info } = useInfo();
  const [cookies, setCookie, removeCookie] = useCookies(["autobiztoken"]);

  const router = useRouter();
  const [errors, setError] = useState({
    email: "",
    password: true,
  });

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
  const timer = (ms) => new Promise((res) => setTimeout(res, ms));
  const allCheck = () => {
    Object.keys(errors).map((el) => {
      checkFrom(el, loginForm[el] === undefined ? "" : loginForm[el]);
    });
    return checkTrue();
  };

  useEffect(() => {
    toastControl("error", error);
  }, [error]);

  useEffect(() => {
    if (success) {
      toastControl("success", props.success);
      init();
    }
  }, [success]);

  const login = async () => {
    if (allCheck()) {
      const { data, isLoading, error } = await loginUser(loginForm);

      if (data) {
        toastControl("success", "Амжилттай нэвтэрлээ.");
        setCookie("autobiztoken", data.token);
        await timer(1500);
        router.push("/userprofile");
      }

      if (error) toastControl("error", error);
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
        <Header />
      </div>
      <div className="loginSection">
        <div className="loginForm">
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

          <button onClick={login} type="button" class="btn btn-login">
            Нэвтрэх
          </button>
          <button
            onClick={() => router.push("/register")}
            type="button"
            class="btn btn-register"
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

  const { data } = await checkToken(token);

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
