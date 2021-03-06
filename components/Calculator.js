import { useHybrids, useFree } from "hooks/use-hybrid";
import { useRate } from "hooks/use-rates";
import { useContext, useEffect, useState } from "react";
import UserContext from "context/UserContext";
// import { useCal } from "hooks/use-cal";

export default ({ product }) => {
  const { data: rate } = useRate();
  // const { prices: usePrice } = useCal();
  const [calculator, setCalculator] = useState({});
  const [jpy, setJpy] = useState(null);
  const [usd, setUsd] = useState(null);
  const userCtx = useContext(UserContext);

  const { hybrid: isHybrid } = useHybrids(
    `name=${product.model_ref && product.model_ref.split(" ")[0]}`
  );

  const { free: isFree } = useFree(
    `name=${product.model_ref && product.model_ref.split(" ")[0]}`
  );

  useEffect(() => {
    if (rate) {
      const usdIndex = rate.findIndex((x) => x.number === 1);
      const japanIndex = rate.findIndex((x) => x.number === 3);
      setJpy(
        rate[japanIndex] &&
          rate[japanIndex].cashSellRate &&
          rate[japanIndex].cashSellRate
      );
      setUsd(
        rate[usdIndex] &&
          rate[usdIndex].cashSellRate &&
          rate[usdIndex].cashSellRate
      );
    }
  }, [rate]);

  useEffect(() => {
    if (product && jpy && usd) {
      const { _id } = product;

      // Cal

      const price = parseFloat(jpy) * parseFloat(product.price);
      let japanTax = parseFloat(product.price) * parseFloat(0.07);
      let japanTaxMn = parseFloat(japanTax) * parseFloat(jpy);
      let fee = parseFloat(120000);

      let logistic = 3000;
      const countYear =
        parseInt(new Date().getFullYear()) - parseInt(product.car_year);

      let exciseTax = 0;
      let ENG_V = 0;
      const eng = product.engine;

      if (
        product &&
        product.type_txt != "bus" &&
        product.type_txt != "truck" &&
        product.type_txt != "Bus" &&
        product.type_txt != "Truck"
      )
        switch (product.country) {
          case "Singapore":
            logistic = 3000;
            break;
          case "Japan":
            logistic = 1650;
            fee = 80000;
            break;
          case "Korea":
            logistic = 1650;
            fee = 80000;
            break;
          case "USA":
            logistic = 5000;
            break;
          case "Singapore":
            logistic = 3000;
            break;
          default:
            logistic = 3000;
            break;
        }
      else if (
        product.type_txt == "bus" ||
        product.type_txt == "truck" ||
        product.type_txt == "Bus" ||
        product.type_txt == "Truck"
      ) {
        logistic = 4000;
      }
      const feeMn = fee * parseFloat(jpy);
      const prePay =
        parseFloat(japanTax) + parseFloat(fee) + parseFloat(product.price);
      const prePayMn = parseFloat(japanTaxMn) + parseFloat(feeMn) + price;
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
      if (product.model_ref) {
        if (
          (isFree && isFree.length > 0) ||
          product.type_txt === "Bus" ||
          product.type_txt === "Truck" ||
          product.type_txt === "Pick up"
        ) {
          hybraid = 0;
          exciseTax = 0;
        }
      }

      let logisticMn = logistic * usd;
      const gaaliHuvi = (price + feeMn + logisticMn) * 0.05;

      let hybraid = parseFloat(exciseTax) / 2;

      const noatTatvarOft = (price + feeMn + logisticMn + exciseTax) * 0.1;
      const noatTatvarHy = (price + feeMn + logisticMn + hybraid) * 0.1;
      let mongolOft = logisticMn + exciseTax + gaaliHuvi + noatTatvarOft;
      let mongolHyb = logisticMn + hybraid + gaaliHuvi + noatTatvarHy;

      const niitOft = parseInt(prePayMn) + parseInt(mongolOft);
      const niitHyb = parseInt(prePayMn) + parseInt(mongolHyb);
      const sendPrice = isHybrid && isHybrid.length > 0 ? niitHyb : niitOft;
      userCtx.getPrice(parseInt(sendPrice));

      // usePrice.map((price) => {
      //   let newPrice = 0;
      //   switch (price.price) {
      //     case "%":
      //       newPrice = parseInt(price.price) / 100;
      //       break;
      //     case "???":
      //       newPrice = parseInt(price.price);
      //       break;
      //     case "$":
      //       newPrice = parseInt(price.price) * usd;
      //       break;
      //     case "??":
      //       newPrice = parseInt(price.price) * jpy;
      //       break;
      //   }

      //   switch (price.name) {
      //     case "Singapore ???????????? ????????????":
      //       logistic = parseInt(price.price);
      //       break;
      //     case "Japan ???????????? ????????????":
      //       logistic = parseInt(price.price);
      //       break;
      //     case "Korea ???????????? ????????????":
      //       logistic = parseInt(price.price);
      //       break;
      //     case "USA ???????????? ????????????":
      //       logistic = parseInt(price.price);
      //       break;
      //     case "?????????????? ????????????":
      //       logistic = parseInt(price.price);
      //       break;
      //     case "bus truck ????????????":
      //       logistic = parseInt(price.price);
      //       break;
      //     case "???????? ????????????":
      //       japanTax = parseFloat(product.price) * parseFloat(newPrice);
      //       break;
      //     case "Japan ???????????????????????? ????????":
      //       fee = price.price;
      //       break;
      //     case "Singapore ???????????????????????? ????????":
      //       fee = price.price;
      //       break;
      //     case "Korea ???????????????????????? ????????":
      //       fee = price.price;
      //       break;
      //     case "USA ???????????????????????? ????????":
      //       fee = price.price;
      //       break;
      //     case "?????????? ?????????? ???????????????????????? ????????":
      //       fee = price.price;
      //       break;
      //     case "???????????? ?????????? <= 1500 ?????? <= 3 ???? ?????? >= 0":
      //       exciseTax = price.price;
      //       break;
      //     case "???????????? ?????????? <= 1500 ?????? <= 6 ???? ?????? >= 4":
      //       exciseTax = price.price;
      //       break;
      //     case "???????????? ?????????? <= 1500 ?????? <= 9 ???? ?????? >= 7":
      //       exciseTax = price.price;
      //       break;
      //     case "???????????? ?????????? <= 1500 ?????? >= 10":
      //       exciseTax = price.price;
      //       break;
      //   }
      // });

      setCalculator(() => ({
        price,
        japanTax,
        japanTaxMn,
        fee,
        feeMn,
        prePay:
          isHybrid && isHybrid.length > 0
            ? parseInt(niitHyb) / 2
            : parseInt(niitOft) / 2,
        prePayMn:
          isHybrid && isHybrid.length > 0
            ? parseInt(niitHyb) / 2
            : parseInt(niitOft) / 2,
        logistic,
        logisticMn,
        countYear,
        exciseTax,
        gaaliHuvi,
        hybraid,
        noatTatvarOft,
        noatTatvarHy,
        mongolHyb:
          isHybrid && isHybrid.length > 0
            ? parseInt(niitHyb) / 2
            : parseInt(niitOft) / 2,
        mongolOft:
          isHybrid && isHybrid.length > 0
            ? parseInt(niitHyb) / 2
            : parseInt(niitOft) / 2,
        niitHyb,
        niitOft,
      }));
    }
  }, [product, jpy, usd, isFree, isHybrid]);

  return (
    <table className="preOrderTable">
      <tr>
        <th>???</th>
        <th>??????????????</th>
        <th>??????????</th>
        <th>????????</th>
        <th>??????</th>
      </tr>
      <tbody>
        <tr>
          <td>1</td>
          <td>???????????????? ???????????? ??????</td>
          <td>??{new Intl.NumberFormat().format(product.price)}</td>
          <td>??{jpy}</td>
          <td>
            {new Intl.NumberFormat().format(parseFloat(calculator.price))}???
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>
            ???????????????????? ???????????? 7%{" "}
            <a
              href="https://ja.m.wikipedia.org/wiki/%E6%B6%88%E8%B2%BB%E7%A8%8E"
              target="_blank"
            >
              ????????????
            </a>
          </td>
          <td>??{new Intl.NumberFormat().format(calculator.japanTax)}</td>
          <td>??{jpy}</td>
          <td>{new Intl.NumberFormat().format(calculator.japanTaxMn)}???</td>
        </tr>
        <tr>
          <td>3</td>
          <td>???????????????????????? ????????????</td>
          <td>??{new Intl.NumberFormat().format(calculator.fee)}</td>
          <td>??{jpy}</td>
          <td>{new Intl.NumberFormat().format(calculator.feeMn)}???</td>
        </tr>
        <tr>
          <td></td>
          <td colspan="3">
            <b>???????????????????? ????????????</b>
          </td>

          <td>
            {new Intl.NumberFormat().format(parseInt(calculator.prePayMn))}???
          </td>
        </tr>
        <tr>
          <td>4</td>
          <td>???????????????? ????????????</td>
          <td>${new Intl.NumberFormat().format(calculator.logistic)}</td>
          <td>${new Intl.NumberFormat().format(usd)}</td>
          <td>{new Intl.NumberFormat().format(calculator.logisticMn)}???</td>
        </tr>
        <tr>
          <td>5</td>
          <td>???????????? ?????????? ????????????</td>
          <td></td>
          <td></td>
          <td>
            {new Intl.NumberFormat().format(
              isHybrid && isHybrid.length > 0
                ? calculator.hybraid
                : calculator.exciseTax
            )}
            ???
          </td>
        </tr>
        <tr>
          <td>6</td>
          <td>?????????????? ?????????? ???????????? (1+3+4)*5%</td>
          <td></td>
          <td>5%</td>
          <td>
            {new Intl.NumberFormat().format(parseInt(calculator.gaaliHuvi))}???
          </td>
        </tr>
        <tr>
          <td>7</td>
          <td>???????? (1+3+4+5)*10%</td>
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
            ???
          </td>
        </tr>
        <tr>
          <td></td>
          <td colspan="3">?????????? ?????????????? ?????????? ?????? ?????????? ???????? ????????????</td>
          <td align="right">
            {new Intl.NumberFormat().format(
              isHybrid && isHybrid.length > 0
                ? calculator.mongolHyb
                : calculator.mongolOft
            )}{" "}
            <span>???</span>
          </td>
        </tr>
        <tr>
          <td></td>
          <td colspan="3">
            <b>???????? ?????? ???????? ???????? ????????????</b>
          </td>
          <td align="right">
            <b>
              {new Intl.NumberFormat().format(
                isHybrid && isHybrid.length > 0
                  ? calculator.niitHyb
                  : calculator.niitOft
              )}
            </b>
            <span>???</span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
