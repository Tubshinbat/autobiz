import Head from "next/head";
import { useCookies } from "react-cookie";
import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import base from "lib/base";
import GoogleMapReact from "google-map-react";
import { ToastContainer } from "react-toastify";
import { toastControl } from "lib/toastControl";

import { getInfo } from "lib/webinfo";
import TopBar from "components/Header/topBar";
import Header from "components/Header/header";
import Footer from "components/Footer";
import {
  maxLength,
  minLength,
  onlyNumber,
  requiredCheck,
} from "lib/inputRegex";
import { sendData } from "lib/contact";

export default ({ info }) => {
  const router = useRouter();
  const timer = (ms) => new Promise((res) => setTimeout(res, ms));
  const [errors, setErrors] = useState({
    name: false,
    phoneNumber: false,
    message: false,
  });
  const [formData, setForm] = useState({});
  const AnyReactComponent = ({ text }) => <div>{text}</div>;

  //CHECK FORM FUNCTION
  const checkName = (el, name) => {
    return name === el;
  };

  const checkForm = (name, val) => {
    const valueErrors = Object.keys(errors);
    let result;
    if (valueErrors.find((el) => checkName(el, name))) {
      result = requiredCheck(val);
      if (name === "name" && result === true) {
        result = minLength(val, 2);
        result === true && (result = maxLength(val, 300));
      }
      if (name === "phoneNumber" && result === true) result = onlyNumber(val);
      setErrors((bfError) => ({ ...bfError, [name]: result }));
      if (name === "phoneNumber" && result === true) {
        result = minLength(val, 8);
        if (result === true) result = maxLength(val, 8);
      }
    }
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
      checkForm(el, formData[el] === undefined ? "" : formData[el]);
    });
    return checkTrue();
  };

  // -- HANDLE CHANGE INPUT
  const handleChange = (event) => {
    let { name, value } = event.target;
    setForm((bf) => ({ ...bf, [name]: value }));
    checkForm(event.target.name, event.target.value);
  };

  const sendMsg = async () => {
    if (allCheck()) {
      const { success, error } = await sendData(formData);
      if (success) {
        toastControl("success", success);
        timer(1500);
        router.push("/");
      }
      if (error) toastControl("error", error);
    } else toastControl("error", "Талбаруудыг бөглөнө үү");
  };

  return (
    <Fragment>
      <Head>
        <title>Холбоо барих | {info.name}</title>
        <meta property="og:url" content={`${base.siteUrl}`} />
        <meta property="og:title" content={`Холбоо барих | ${info.name}`} />
        <meta property="og:description" content={info.siteInfo} />
      </Head>
      <div>
        <TopBar />
        <Header page={true} text="Холбоо барих" />
      </div>
      <section className="contactSection">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="contactInfos">
                <div className="contactInfo">
                  <i className="fas fa-map-marker-alt " />
                  <p>{info.address}</p>
                </div>
                <div className="contactInfo">
                  <i className="fas fa-phone  " />
                  <p>
                    <a href={`tel:${info.phone}`}> {info.phone}</a>
                  </p>
                </div>
                <div className="contactInfo">
                  <i className="fas fa-envelope" />
                  <p>
                    <a href={`tel:${info.email}`}> {info.email}</a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="row contactForm">
                <div className="form-group col-lg-12">
                  <input
                    type="text"
                    name="name"
                    className={`form-control ${
                      errors.name === true && "is-valid"
                    }`}
                    onChange={handleChange}
                    placeholder="Таны нэр"
                  />
                  <p className="contactError"> {errors.name} </p>
                </div>
                <div className="form-group col-lg-6">
                  <input
                    type="number"
                    name="phoneNumber"
                    className={`form-control ${
                      errors.phoneNumber === true && "is-valid"
                    }`}
                    onChange={handleChange}
                    placeholder="Утасны дугаар"
                  />
                  <p className="contactError"> {errors.phoneNumber} </p>
                </div>
                <div className="form-group col-lg-6">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="И-мэйл хаяг"
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    className={`form-control ${
                      errors.message === true && "is-valid"
                    }`}
                    placeholder="Санал хүсэлт"
                    onChange={handleChange}
                  ></textarea>
                  <p className="contactError"> {errors.message} </p>
                </div>
                <div className="contactFormFooter">
                  <button onClick={sendMsg}> Илгээх </button>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              height: "400px",
              width: "100%",
              padding: "10px",
              boxShadow: "0px 0px 15px rgb(0 0 0 / 8%)",
            }}
            className={`wow animate__animated animate__fadeInDown`}
            data-wow-delay={`0.5s`}
          >
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyBVbaukknpuyvHnYSK_MmpI-5pcBwz83kw",
              }}
              defaultZoom={16}
              defaultCenter={{
                lat: 47.917608230498566,
                lng: 106.92397582027006,
              }}
            >
              <AnyReactComponent
                lat={47.917608230498566}
                lng={106.92397582027006}
                text={<img src="/favicon.ico" />}
              />
            </GoogleMapReact>
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

export const getStaticProps = async () => {
  const { info } = await getInfo();
  return {
    props: {
      info,
    },
    revalidate: 50,
  };
};
