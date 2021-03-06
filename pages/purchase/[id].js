import Head from "next/head";
import { useCookies } from "react-cookie";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import base from "lib/base";

import TopBar from "components/Header/topBar";
import Header from "components/Header/header";
import Footer from "components/Footer";

import { getProduct, getProducts } from "lib/product";

import {
  maxLength,
  minLength,
  onlyNumber,
  requiredCheck,
} from "lib/inputRegex";
import { toastControl } from "lib/toastControl";
import { ToastContainer } from "react-toastify";
import { createOrder } from "lib/order";
import { getUser } from "lib/user";
import { useInfo } from "hooks/use-info";
const timer = (ms) => new Promise((res) => setTimeout(res, ms));
export default ({ product, user }) => {
  const { info } = useInfo();
  const [form, setForm] = useState({});
  const router = useRouter();
  const [errors, setError] = useState({
    phone: "",
    lastname: "",
    email: "",
    deal: "",
  });

  useEffect(() => {
    if (user) {
      const { phone, lastname, email, _id } = user;

      setForm((bf) => ({ ...bf, phone, lastname, email, userId: _id }));
    }
  }, [user]);

  useEffect(() => {
    if (product) {
      const { _id } = product;
      setForm((bf) => ({ ...bf, product_id: _id }));
    }
  }, [product]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((bf) => ({ ...bf, [name]: value }));
    checkForm(name, value);
  };

  //CHECK FORM FUNCTION
  const checkName = (el, name) => {
    return name === el;
  };

  const checkForm = (name, val) => {
    const valueErrors = Object.keys(errors);
    let result;

    if (valueErrors.find((el) => checkName(el, name))) {
      result = requiredCheck(val);
      if (name === "lastname" && result === true) {
        result = minLength(val, 2);
        result === true && (result = maxLength(val, 300));
      }
      if (name === "phone" && result === true) result = onlyNumber(val);
      setError((bfError) => ({ ...bfError, [name]: result }));
      if (name === "phone" && result === true) {
        result = minLength(val, 8);
        if (result === true) result = maxLength(val, 8);
      }
    }
  };

  useEffect(() => {
    if (form && form.deal) {
      checkForm("deal", form.deal);
    }
  }, [form]);

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
      checkForm(el, form[el] === undefined ? "" : form[el]);
    });
    return checkTrue();
  };

  const sendOrder = async () => {
    if (allCheck()) {
      const { order, error } = await createOrder(form);
      if (order) {
        toastControl(
          "success",
          "???????? ???????????????? ?????????????? ???????????? ?????????? ?????????????? ???????????? ?????????????????? ??????????"
        );
        await timer(2000);

        router.push("/products");
      }
      if (error) toastControl("error", error);
    } else toastControl("error", "?????????????????????? ?????????????? ????");
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
        <Header page={true} />
      </div>
      <section className="purchase">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="purchaseTitle">
                <h2> ???????????????? ??????????</h2>
              </div>
              <div className="purchaseList">
                <div className="purchaseItem">
                  <div className="purchaseDetails">
                    <div className="purchaseImage">
                      {product.pictures && (
                        <img src={`${base.cdnUrl}/${product.pictures[0]}`} />
                      )}
                    </div>
                    <div className="purchaseInfo">
                      <span> {product.car_industry.name} </span>
                      <h5> {product.title}</h5>
                    </div>
                  </div>
                  <div className="purchasePrice">
                    <p>{new Intl.NumberFormat().format(product.price)} ???</p>
                  </div>
                </div>
              </div>
              <div className="purchaseUserTitle">
                <h5> ???????????? ???????????????? ?????????????? </h5>
              </div>
              <div className="purchaseForm">
                <div className="row">
                  <div className="form-group col-lg-6">
                    <label>???????? ??????</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="???????? ?????????? ?????????????? ????"
                      name="lastname"
                      onChange={handleChange}
                      value={form.lastname}
                    />
                    <div className="field">
                      <p className="fieldError"> {errors.lastname}</p>
                    </div>
                  </div>

                  <div className="form-group col-lg-6">
                    <label>???????????? ????????????</label>
                    <input
                      className="form-control"
                      type="number"
                      placeholder="???????????? ???????????????? ?????????????? ????"
                      name="phone"
                      onChange={handleChange}
                      value={form.phone}
                    />
                    <div className="field">
                      <p className="fieldError"> {errors.phone}</p>
                    </div>
                  </div>
                  <div className="form-group col-lg-6">
                    <label>??-???????? ????????</label>
                    <input
                      className="form-control"
                      type="email"
                      placeholder="??-???????? ???????????? ?????????????? ????"
                      name="email"
                      onChange={handleChange}
                      value={form.email}
                    />
                    <div className="field">
                      <p className="fieldError"> {errors.email}</p>
                    </div>
                  </div>
                  <div className="form-group col-lg-12">
                    <label>????????????</label>
                    <textarea
                      className="form-control"
                      placeholder="???????? ???????????? ???????????? ???????????? ???????????? ?????? ?????????????? ????"
                      name="message"
                      onChange={handleChange}
                      value={form.message}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="deals">
                <div
                  className={`deal ${form.deal === "bank" && "current"} bank`}
                  onClick={() => setForm((bf) => ({ ...bf, deal: "bank" }))}
                >
                  <div className="dealIcon">
                    <i className="fa-solid fa-building-columns"></i>
                  </div>
                  <div className="dealInfo"> ???????? ?????????? ???????? ?????????? ??????????????</div>
                </div>
                <div
                  className={`deal ${form.deal === "money" && "current"} money`}
                  onClick={() => setForm((bf) => ({ ...bf, deal: "money" }))}
                >
                  <div className="dealIcon">
                    <i className="fa-solid fa-money-bill"></i>
                  </div>
                  <div className="dealInfo"> ?????????? ???????????? </div>
                </div>
                <div className="field">
                  <p className="fieldError"> {errors.deal}</p>
                </div>
                <div className="deals-footer">
                  <button className="btn btn-deals" onClick={sendOrder}>
                    ???????????????? ??????????????
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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

export const getServerSideProps = async function ({ req, res, params }) {
  let user = {};

  const token = req.cookies.autobiztoken;
  if (token) user = await getUser(token);

  const { id } = params;

  const { product } = await getProduct(id);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return { props: { product, user } };
};
