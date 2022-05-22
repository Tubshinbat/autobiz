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
import { minLength, regEmail, requiredCheck } from "lib/inputRegex";
import { toastControl } from "lib/toastControl";
import { forgetPassword, resetPassword } from "lib/login";
import { useInfo } from "hooks/use-info";
import { checkToken } from "lib/token";

export default ({ error, success }) => {
  const [loginForm, setLoginForm] = useState({});
  const [active, setActive] = useState(false);
  const router = useRouter();
  const [errors, setError] = useState({
    email: "",
  });

  const { info } = useInfo();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginForm((bf) => ({ ...bf, [name]: value }));
    checkFrom(name, value);
  };

  const checkFrom = (name, value) => {
    let result;
    result = requiredCheck(value);
    if (result === true && name === "email") result = regEmail(value);
    if (result === true && name === "password") result = minLength(value, 8);
    if (name === "confPassword")
      if (loginForm.password === value) {
        result = true;
      } else result = "Нууц үг таарахгүй байна.";

    setError((be) => ({ ...be, [name]: result }));
  };
  const timer = (ms) => new Promise((res) => setTimeout(res, ms));
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
    toastControl("error", error);
  }, [error]);

  useEffect(() => {
    if (success) {
      toastControl("success", props.success);
      init();
    }
  }, [success]);

  const changePassword = async () => {
    if (allCheck()) {
      if (active === false) {
        const sendEmail = { email: loginForm.email };
        const { data, isLoading, error } = await forgetPassword(sendEmail);
        if (data === "Таны имэйл хаягруу нууц үг солих линк илгээлээ") {
          toastControl("success", data);
          setActive(true);
          setError((be) => ({
            ...be,
            password: "",
            otp: "",
            confPassword: "",
          }));
          if (error) toastControl("error", error);
        }
      } else if (active === true) {
        const { data, error } = await resetPassword(loginForm);
        if (data) {
          toastControl("success", "Нууц үгээ амжилттай солигдлоо");
          await timer(2000);
          router.push("/login");
        }
        if (error) toastControl("error", error);
      }
    } else toastControl("error", "Талбаруудыг бөглөнө үү");
  };

  return (
    <Fragment>
      <Head>
        <title>Нууц үгээ мартсан | {info.name}</title>
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
            <li className={`loginTab active`}>Нууц үгээ мартсан</li>
          </div>
          <div className="login-field">
            <input
              type="email"
              name="email"
              placeholder="Та И-Мэйл хаягаа оруулна уу"
              value={loginForm.email}
              onChange={handleChange}
              disabled={active}
              className={`form-control ${
                (errors.email === true && "is-valid") ||
                (errors.email !== "" && "is-invalid")
              }`}
            />
            <div className="field">
              <p className="fieldError"> {errors.email}</p>
            </div>
          </div>
          <div
            className={
              active === true ? "displayBlock hidenForms" : "displayNone"
            }
          >
            <div className="login-field">
              <input
                type="number"
                name="otp"
                onChange={handleChange}
                placeholder="Баталгаажуулах кодоо оруулна уу"
                className={`form-control ${
                  (errors.otp === true && "is-valid") ||
                  (errors.otp !== "" && "is-invalid")
                }`}
              />
              <div className="field">
                <p className="fieldError"> {errors.otp}</p>
              </div>
            </div>

            <div className="login-field">
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Шинэ нууц үгээ оруулна уу"
                className={`form-control ${
                  (errors.password === true && "is-valid") ||
                  (errors.password !== "" && "is-invalid")
                }`}
              />
              <div className="field">
                <p className="fieldError"> {errors.password}</p>
              </div>
            </div>

            <div className="login-field">
              <input
                type="password"
                name="confPassword"
                placeholder="Шинэ нууц үгээ давтан оруулна уу"
                onChange={handleChange}
                className={`form-control ${
                  (errors.confPassword === true && "is-valid") ||
                  (errors.confPassword !== "" && "is-invalid")
                }`}
              />
              <div className="field">
                <p className="fieldError"> {errors.confPassword}</p>
              </div>
            </div>
          </div>
          <button onClick={changePassword} type="button" class="btn btn-login">
            Үргэлжлүүлэх
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

  if (data !== undefined || data !== null) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: {} };
};
