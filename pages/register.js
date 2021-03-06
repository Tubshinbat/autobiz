import Head from "next/head";
import { useCookies } from "react-cookie";
import { Fragment, useEffect, useState } from "react";
import base from "lib/base";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";

import TopBar from "components/Header/topBar";
import Header from "components/Header/header";
import Footer from "components/Footer";
import { regEmail, requiredCheck } from "lib/inputRegex";
import { toastControl } from "lib/toastControl";
import { loginUser, userRegister } from "lib/login";
import { checkToken } from "lib/token";
import { useInfo } from "hooks/use-info";

export default ({ data, error, success }) => {
  const [loginForm, setLoginForm] = useState({});
  const { info } = useInfo();
  const [cookies, setCookie, removeCookie] = useCookies(["autobiztoken"]);

  const router = useRouter();
  const [errors, setError] = useState({
    email: false,
    password: false,
    confPassword: false,
    lastname: false,
    firstname: false,
    phone: false,
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

    if (name === "confPassword")
      if (value === loginForm.password) result = true;
      else result = "Нууц үг таарахгүй байна.";
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
    removeCookie("autobiztoken");
    toastControl("error", error);
  }, [error]);

  useEffect(() => {
    if (success) {
      toastControl("success", props.success);
      init();
    }
  }, [success]);

  const register = async () => {
    if (allCheck()) {
      const { data, isLoading, error } = await userRegister(loginForm);

      if (data) {
        toastControl("success", "Амжилттай бүртгэл үүслээ.");

        await timer(1500);
        router.push("/userprofile");
      }

      if (error) toastControl("error", error);
    } else toastControl("error", "Талбаруудыг бөглөнө үү");
  };

  return (
    <Fragment>
      <Head>
        <title>Бүртгүүлэх | {info.name}</title>
        <meta property="og:url" content={`${base.siteUrl}`} />
        <meta property="og:title" content={info.name} />
        <meta property="og:description" content={info.siteInfo} />
      </Head>
      <div>
        <TopBar />
        <Header page={true} text="Бүртгүүлэх" />
      </div>
      <div className="loginSection ">
        <div className="loginForm registerForm">
          <div className="loginHeader">
            <li className={`loginTab active`}>Бүртгүүлэх</li>
          </div>
          <div className="row">
            <div className="col-lg-6 register-field">
              <input
                type="text"
                name="lastname"
                placeholder="Таны овог нэр"
                value={loginForm.lastname}
                onChange={handleChange}
                className={`form-control ${
                  errors.lastname === true && "is-valid"
                }`}
              />
              <div className="field">
                <p className="fieldError"> {errors.lastname}</p>
              </div>
            </div>
            <div className="col-lg-6 register-field">
              <input
                type="text"
                name="firstname"
                placeholder="Таны нэр"
                value={loginForm.firstname}
                onChange={handleChange}
                className={`form-control ${
                  errors.firstname === true && "is-valid"
                }`}
              />
              <div className="field">
                <p className="fieldError"> {errors.firstname}</p>
              </div>
            </div>
            <div className="col-lg-6 register-field">
              <input
                type="number"
                name="phone"
                placeholder="Таны утасны дугаар"
                value={loginForm.phone}
                onChange={handleChange}
                className={`form-control ${
                  errors.phone === true && "is-valid"
                }`}
              />
              <div className="field">
                <p className="fieldError"> {errors.phone}</p>
              </div>
            </div>
            <div className="col-lg-6 register-field">
              <input
                type="email"
                name="email"
                placeholder="Та И-Мэйл хаягаа оруулна уу"
                value={loginForm.email}
                onChange={handleChange}
                className={`form-control ${
                  errors.email === true && "is-valid"
                }`}
              />
              <div className="field">
                <p className="fieldError"> {errors.email}</p>
              </div>
            </div>

            <div className="col-lg-6 register-field">
              <input
                type="password"
                name="password"
                placeholder="Та нууц үгээ оруулна уу"
                value={loginForm.password}
                onChange={handleChange}
                className={`form-control
                ${errors.password === true && "is-valid"}`}
              />

              <div className="field">
                <p className="fieldError"> {errors.password}</p>
              </div>
            </div>

            <div className="col-lg-6 register-field">
              <input
                type="password"
                name="confPassword"
                placeholder="Та нууц үгээ давтан оруулна уу"
                value={loginForm.confPassword}
                onChange={handleChange}
                className={`form-control
                ${errors.confPassword === true && "is-valid"}`}
              />

              <div className="field">
                <p className="fieldError"> {errors.confPassword} </p>
              </div>
            </div>
          </div>
          <button onClick={register} type="button" class="btn btn-login">
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
