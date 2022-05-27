import Head from "next/head";
import { useCookies } from "react-cookie";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import base from "lib/base";

import TopBar from "components/Header/topBar";
import Header from "components/Header/header";
import Footer from "components/Footer";

import { getBeProduct } from "lib/beproduct";

import {
  maxLength,
  minLength,
  onlyNumber,
  requiredCheck,
} from "lib/inputRegex";
import { toastControl } from "lib/toastControl";
import { ToastContainer } from "react-toastify";
import { getUser } from "lib/user";
import { useInfo } from "hooks/use-info";
import { createBeOrder } from "lib/order";
import { getRate } from "lib/rate";
import { useHybrids } from "hooks/use-hybrid";
const timer = (ms) => new Promise((res) => setTimeout(res, ms));

export default ({ product, user }) => {
  const { info } = useInfo();
  const [form, setForm] = useState({});
  const router = useRouter();
  const [calculator, setCalculator] = useState({});
  const [jpy, setJpy] = useState(null);
  const [usd, setUsd] = useState(null);

  const { hybrid: isHybrid } = useHybrids(
    `name=${product.model_ref && product.model_ref.split(" ")[0]}`
  );

  useEffect(() => {
    if (user) {
      const { phone, lastname, email, _id } = user;
      setForm((bf) => ({ ...bf, phone, lastname, email, userId: _id }));
    }
  }, [user]);

  useEffect(async () => {
    const { data } = await getRate();
    const usdIndex = await data.findIndex((x) => x.number === 1);
    const japanIndex = await data.findIndex((x) => x.number === 3);
    setJpy(
      data[japanIndex] &&
        data[japanIndex].sellRate &&
        data[japanIndex].sellRate + 0.5
    );
    setUsd(
      data[usdIndex] && data[usdIndex].sellRate && data[usdIndex].sellRate
    );
  }, []);

  useEffect(() => {
    if (product && jpy && usd) {
      const { _id } = product;
      setForm((bf) => ({ ...bf, product_id: _id }));

      // Cal

      const price = parseFloat(jpy) * parseFloat(product.price);
      const japanTax = parseFloat(product.price) * parseFloat(0.07);
      const japanTaxMn = parseFloat(japanTax) * parseFloat(jpy);
      const fee = parseFloat(100000);
      const feeMn = fee * parseFloat(jpy);
      const prePay =
        parseFloat(japanTax) + parseFloat(fee) + parseFloat(product.price);
      const prePayMn = parseFloat(japanTaxMn) + parseFloat(feeMn) + price;
      const logistic = 1550;
      const logisticMn = logistic * usd;
      const countYear =
        parseInt(new Date().getFullYear()) - parseInt(product.car_year);
      let exciseTax = 0;
      let ENG_V = 0;
      const eng = product.engine;

      if (eng) {
        ENG_V = 1;
        if (eng <= 1500) {
          if (countYear <= 3 && countYear >= 0) {
            exciseTax = 750000;
          } else if (countYear <= 6 && countYear >= 4) {
            exciseTax = 1600000;
          } else if (countYear <= 9 && countYear >= 7) {
            exciseTax = 3350000;
          } else if (countYear >= 10) {
            exciseTax = 10000000;
          }
        } else if (eng >= 1501 && eng <= 2500) {
          ENG_V = 2;
          if (countYear <= 3 && countYear >= 0) {
            exciseTax = 2300000;
          } else if (countYear <= 6 && countYear >= 4) {
            exciseTax = 3200000;
          } else if (countYear <= 9 && countYear >= 7) {
            exciseTax = 5000000;
          } else if (countYear >= 10) {
            exciseTax = 11700000;
          }
        } else if (eng >= 2501 && eng <= 3500) {
          ENG_V = 3;
          if (countYear <= 3 && countYear >= 0) {
            exciseTax = 3050000;
          } else if (countYear <= 6 && countYear >= 4) {
            exciseTax = 4000000;
          } else if (countYear <= 9 && countYear >= 7) {
            exciseTax = 6700000;
          } else if (countYear >= 10) {
            exciseTax = 13350000;
          }
        } else if (eng >= 3501 && eng <= 4500) {
          ENG_V = 4;
          if (countYear <= 3 && countYear >= 0) {
            exciseTax = 6850000;
          } else if (countYear <= 6 && countYear >= 4) {
            exciseTax = 8000000;
          } else if (countYear <= 9 && countYear >= 7) {
            exciseTax = 10850000;
          } else if (countYear >= 10) {
            exciseTax = 17500000;
          }
        } else if (eng >= 4501) {
          ENG_V = 5;
          if (countYear <= 3 && countYear >= 0) {
            exciseTax = 14210000;
          } else if (countYear <= 6 && countYear >= 4) {
            exciseTax = 27200000;
          } else if (countYear <= 9 && countYear >= 7) {
            exciseTax = 39150000;
          } else if (countYear >= 10) {
            exciseTax = 65975000;
          }
        }
      } else exciseTax = 0;

      const gaaliHuvi = (price + feeMn + logisticMn) * 0.05;
      const hybraid = parseFloat(exciseTax) / 2;
      const noatTatvarOft = (price + feeMn + logisticMn + exciseTax) * 0.1;
      const noatTatvarHy = (price + feeMn + logisticMn + hybraid) * 0.1;
      const mongolOft = logisticMn + exciseTax + gaaliHuvi + noatTatvarOft;
      const mongolHyb = logisticMn + hybraid + gaaliHuvi + noatTatvarHy;

      const niitOft = prePayMn + mongolOft;
      const niitHyb = prePayMn + mongolHyb;

      setCalculator(() => ({
        price,
        japanTax,
        japanTaxMn,
        fee,
        feeMn,
        prePay,
        prePayMn,
        logistic,
        logisticMn,
        countYear,
        exciseTax,
        gaaliHuvi,
        hybraid,
        noatTatvarOft,
        noatTatvarHy,
        mongolHyb,
        mongolOft,
        niitHyb,
        niitOft,
      }));
    }
  }, [product, jpy, usd]);

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
      const { order, error } = await createBeOrder(form);
      if (order) {
        toastControl(
          "success",
          "Таны худалдан авалтыг хүлээн авлаа удахгүй тантай холбогдох болно"
        );
        await timer(2000);

        router.push("/products");
      }
      if (error) toastControl("error", error);
    } else toastControl("error", "Талбаруудыг бөглөнө үү");
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
        <Header page={true} text="Захиалгын хуудас" />
      </div>
      <section className="purchase">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="purchaseTitle">
                <h2> Сонгосон машин</h2>
              </div>
              <div className="purchaseList">
                <div className="purchaseItem">
                  <table className="purchaseTable">
                    <tr>
                      <th> Зураг</th>
                      <th> Машины үйлдвэрлэгч</th>
                      <th> Машины загвар </th>
                      <th> Машины төрөл </th>
                      <th> Үйлдвэрлэгдсэн он</th>
                      <th> Гүйлт </th>
                      <th> Үнэ </th>
                    </tr>
                    <tr>
                      <td>
                        {product.gallery_images && (
                          <img src={`${product.gallery_images[0]}`} />
                        )}
                      </td>
                      <td>{product.mark_txt}</td>
                      <td>{product.model}</td>
                      <td>{product.type_txt}</td>
                      <td>{product.car_year}</td>
                      <td>{new Intl.NumberFormat().format(product.mileage)}</td>
                      <td>${new Intl.NumberFormat().format(product.price)}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="purchaseUserTitle">
                <h5> Үнийн задаргаа </h5>
              </div>
              <table className="preOrderTable">
                <tr>
                  <th>№</th>
                  <th>Тайлбар</th>
                  <th>Валют</th>
                  <th>Ханш</th>
                  <th>Үнэ</th>
                </tr>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Зарагдаж байгаа үнэ</td>
                    <td>¥{new Intl.NumberFormat().format(product.price)}</td>
                    <td>¥{jpy}</td>
                    <td>
                      {new Intl.NumberFormat().format(
                        parseFloat(calculator.price)
                      )}
                      ₮
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>
                      Японы худалдааны татвар 7%{" "}
                      <a
                        href="https://ja.m.wikipedia.org/wiki/%E6%B6%88%E8%B2%BB%E7%A8%8E"
                        target="_blank"
                      >
                        татвар
                      </a>
                    </td>
                    <td>
                      ¥{new Intl.NumberFormat().format(calculator.japanTax)}
                    </td>
                    <td>¥{jpy}</td>
                    <td>
                      {new Intl.NumberFormat().format(calculator.japanTaxMn)}₮
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Япон дах үйлчилгээний зардал</td>
                    <td>¥{new Intl.NumberFormat().format(calculator.fee)}</td>
                    <td>¥{jpy}</td>
                    <td>{new Intl.NumberFormat().format(calculator.feeMn)}₮</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>Урьдчилгаа төлбөр</td>
                    <td>
                      ¥
                      {new Intl.NumberFormat().format(
                        parseInt(calculator.prePay)
                      )}
                    </td>
                    <td>¥{jpy}</td>
                    <td>
                      {new Intl.NumberFormat().format(
                        parseInt(calculator.prePayMn)
                      )}
                      ₮
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Тээврийн зардал</td>
                    <td>
                      ${new Intl.NumberFormat().format(calculator.logistic)}
                    </td>
                    <td>${new Intl.NumberFormat().format(usd)}</td>
                    <td>
                      {new Intl.NumberFormat().format(calculator.logisticMn)}₮
                    </td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>Онцгой албан татвар</td>
                    <td></td>
                    <td></td>
                    <td>
                      {new Intl.NumberFormat().format(
                        isHybrid && isHybrid.length > 0
                          ? calculator.hybraid
                          : calculator.exciseTax
                      )}
                      ₮
                    </td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>Гаалийн албан татвар (1+3+4)*5%</td>
                    <td></td>
                    <td>5%</td>
                    <td>
                      {new Intl.NumberFormat().format(
                        parseInt(calculator.gaaliHuvi)
                      )}
                      ₮
                    </td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>НӨАТ (1+3+4+5)*10%</td>
                    <td></td>
                    <td>10%</td>
                    <td>
                      {new Intl.NumberFormat().format(
                        parseInt(
                          isHybrid && isHybrid.length > 0
                            ? calculator.noatTatvarHy
                            : calculator.noatTatvarOft
                        )
                      )}
                      ₮
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="purchaseUserTitle">
                <h5> Захиалгын мэдээлэл </h5>
              </div>
              <div className="totalPrice">
                <div className="orderPrice">
                  <span> Урьдчилгаа төлбөр: </span>
                  <span>
                    {new Intl.NumberFormat().format(
                      parseInt(calculator.prePayMn)
                    )}
                    ₮
                  </span>
                </div>
                <div className="orderPrice">
                  <span> Монголд ирээд: </span>
                  <span>
                    {new Intl.NumberFormat().format(
                      isHybrid && isHybrid.length > 0
                        ? calculator.mongolHyb
                        : calculator.mongolOft
                    )}
                    ₮
                  </span>
                </div>
                <div className="orderPriceTotal">
                  <span> Нийт төлөх дүн: </span>
                  <span>
                    {new Intl.NumberFormat().format(
                      isHybrid && isHybrid.length > 0
                        ? calculator.mongolHyb
                        : calculator.mongolOft
                    )}
                    ₮
                  </span>
                </div>
              </div>
              <div className="orderInfo">
                Уг үнийн саналд барааны үнэ, тээврийн үнэ, НӨАТ болон гаалийн
                татвар орсон бөгөөд зөвхөн програмын аргаар бодсон болно. Эцсийн
                үнийн саналыг таны бүртгэлтэй имайлээр нэхэмжлэхийн хамт 24-72
                цагийн дотор илгээх болно. <br /> <br />
                Жич: эцсийн үнийн санал хүлээж авснаас хойш тухайн үнэ 48 цагийн
                хугацаанд хүчинтэй байна.
              </div>
            </div>
            <div className="col-lg-12">
              <div className="purchaseUserTitle">
                <h5> Мессеж </h5>
              </div>
              <div className="purchaseForm">
                <div className="row">
                  <div className="form-group col-lg-12">
                    <textarea
                      className="form-control"
                      placeholder="Танд бидэнд илгээх мессеж байвал энд оруулна уу"
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
                <div className="deals-footer">
                  <button className="btn btn-deals" onClick={sendOrder}>
                    Захиалга дуусгах
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

  const { product } = await getBeProduct(id);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return { props: { product, user } };
};
