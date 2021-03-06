import { useHybrids, useFree } from "hooks/use-hybrid";
import { useRate } from "hooks/use-rates";
import { useContext, useEffect, useState } from "react";
import UserContext from "context/UserContext";
import { useCal } from "hooks/use-cal";

export default ({ product }) => {
  const { data: rate } = useRate();
  const { prices: usePrice } = useCal(`limit=100`);
  const [calculator, setCalculator] = useState({});
  const [jpy, setJpy] = useState(null);
  const [usd, setUsd] = useState(null);
  const [ps, setDprice] = useState({});
  const userCtx = useContext(UserContext);

  const { hybrid: isHybrid } = useHybrids(
    `name=${product.model_ref && product.model_ref.split(" ")[0]}`
  );

  const { free: isFree } = useFree(
    `name=${product.model_ref && product.model_ref.split(" ")[0]}`
  );

  useEffect(() => {
    if (usePrice) {
      usePrice.map((price) => {
        setDprice((pstate) => ({ ...pstate, [price.type]: price }));
      });
    }
  }, [usePrice]);

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
    if (product && jpy && usd && ps) {
      
      const price = parseFloat(jpy) * parseFloat(product.price);
      let japanTax = ENG_V =  logistic = exciseTax = japanTaxMn = fee = feeMn = prePay = prePayMn = logistic = logisticMn = countYear
      = exciseTax = gaaliHuvi = hybraid = noatTatvarOft = noatTatvarHy = mongolHyb = mongolOft= niitHyb = niitOft = 0;
      let feeName = logisticName = "";


      if(ps.japanTax){
        japanTax = parseFloat(product.price) * parseFloat(ps.japanTax.price / 100);
        japanTaxMn = parseFloat(japanTax) * parseFloat(jpy);
      }

      if(ps.fee){
        fee = parseFloat(ps.fee.price);
        feeName = ps.fee.name;
      }
      if(ps.logistic){
        logisticName = ps.logistic.name;
        logistic = parseInt(ps.logistic.price);
      }
        

      const countYear =
        parseInt(new Date().getFullYear()) - parseInt(product.car_year);
      const eng = product.engine;

      switch (product.country) {
        case "Singapore":
          if (ps.logisticSingapore)
            logistic = parseInt(ps.logisticSingapore.price);
          break;
        case "Japan":
          if (ps.feeJapan) {
            fee = parseInt(ps.feeJapan.price);
            feeName = ps.feeJapan.name;
          }
          if (ps.logisticJapan) {
            logisticName = ps.logisticJapan.name;
            logistic = parseInt(ps.logisticJapan.price);
          }
          break;
        case "Korea":
          if (ps.logisticKorea) {
            logistic = parseInt(ps.logisticKorea.price);
            logisticName = ps.logisticKorea.name;
          }
          if (ps.feeKorea) {
            fee = parseInt(ps.feeKorea.price);
            feeName = ps.feeKorea.name;
          }
          break;
        case "USA":
          if (ps.logisticUSA) {
            logistic = parseInt(ps.logisticUSA.price);
            logisticName = ps.logisticUSA.name;
          }
          if (ps.feeUSA) {
            fee = parseInt(ps.feeUSA.price);
            feeName = ps.feeUSA.name;
          }
          break;
        default:
          if (ps.logistic) logistic = parseInt(ps.logistic.price);
          break;
      }

      if (
        product.type_txt == "bus" ||
        product.type_txt == "truck" ||
        product.type_txt == "Bus" ||
        product.type_txt == "Truck"
      ) {
        if (ps.logisticBusTruck) {
          logistic = parseInt(ps.logisticBusTruck.price);
        }
        hybraid = 0;
        if (ps.busTruckExciseTax){
          exciseTax = parseInt(ps.busTruckExciseTax.price);
        }
      }

      const feeMn = fee * parseFloat(jpy);

      const prePay =
        parseFloat(japanTax) + parseFloat(fee) + parseFloat(product.price);
      const prePayMn = parseFloat(japanTaxMn) + parseFloat(feeMn) + price;

      if (eng) {
        ENG_V = 1;
        if (eng <= 1500) {
          if (countYear <= 3 && countYear >= 0 && ps.eng1500_Year_3_to_0) {
            exciseTax = parseInt(ps.eng1500_Year_3_to_0.price);
          } else if (
            countYear <= 6 &&
            countYear >= 4 &&
            ps.eng1500_Year_6_to_4
          ) {
            exciseTax = parseInt(ps.eng1500_Year_6_to_4.price);
          } else if (
            countYear <= 9 &&
            countYear >= 7 &&
            ps.eng1500_Year_9_to_7
          ) {
            exciseTax = parseInt(ps.eng1500_Year_9_to_7.price);
          } else if (countYear >= 10 && ps.eng1500_Year_10) {
            exciseTax = parseInt(ps.eng1500_Year_10.price);
          }
        } else if (eng >= 1501 && eng <= 2500) {
          ENG_V = 2;
          if (countYear <= 3 && countYear >= 0 && ps.eng2500_Year_3_to_0) {
            exciseTax = parseInt(ps.eng2500_Year_3_to_0.price);
          } else if (
            countYear <= 6 &&
            countYear >= 4 &&
            ps.eng2500_Year_6_to_4
          ) {
            exciseTax = parseInt(ps.eng2500_Year_6_to_4.price);
          } else if (
            countYear <= 9 &&
            countYear >= 7 &&
            ps.eng2500_Year_9_to_7
          ) {
            exciseTax = parseInt(ps.eng2500_Year_9_to_7.price);
          } else if (countYear >= 10 && ps.eng2500_Year_10) {
            exciseTax = parseInt(ps.eng2500_Year_10.price);
          }
        } else if (eng >= 2501 && eng <= 3500) {
          ENG_V = 3;
          if (countYear <= 3 && countYear >= 0 && ps.eng3500_Year_3_to_0) {
            exciseTax = parseInt(ps.eng3500_Year_3_to_0.price);
          } else if (
            countYear <= 6 &&
            countYear >= 4 &&
            ps.eng3500_Year_6_to_4
          ) {
            exciseTax = parseInt(ps.eng3500_Year_6_to_4.price);
          } else if (
            countYear <= 9 &&
            countYear >= 7 &&
            ps.eng3500_Year_9_to_7
          ) {
            exciseTax = parseInt(ps.eng3500_Year_9_to_7.price);
          } else if (countYear >= 10 && ps.eng3500_Year_10) {
            exciseTax = parseInt(ps.eng3500_Year_10.price);
          }
        } else if (eng >= 3501 && eng <= 4500) {
          ENG_V = 4;
          if (countYear <= 3 && countYear >= 0 && ps.eng4500_Year_3_to_0) {
            exciseTax = parseInt(ps.eng4500_Year_3_to_0.price);
          } else if (
            countYear <= 6 &&
            countYear >= 4 &&
            ps.eng4500_Year_6_to_4
          ) {
            exciseTax = parseInt(ps.eng4500_Year_6_to_4.price);
          } else if (
            countYear <= 9 &&
            countYear >= 7 &&
            ps.eng4500_Year_9_to_7
          ) {
            exciseTax = parseInt(ps.eng4500_Year_9_to_7.price);
          } else if (countYear >= 10 && ps.eng4500_Year_10) {
            exciseTax = parseInt(ps.eng4500_Year_10.price);
          }
        } else if (eng >= 4501) {
          ENG_V = 5;
          if (countYear <= 3 && countYear >= 0 && ps.eng4501_Year_3_to_0) {
            exciseTax = parseInt(ps.eng4501_Year_3_to_0.price);
          } else if (
            countYear <= 6 &&
            countYear >= 4 &&
            ps.eng4501_Year_6_to_4
          ) {
            exciseTax = parseInt(ps.eng4501_Year_6_to_4.price);
          } else if (
            countYear <= 9 &&
            countYear >= 7 &&
            ps.eng4501_Year_9_to_7
          ) {
            exciseTax = parseInt(ps.eng4501_Year_9_to_7.price);
          } else if (countYear >= 10 && ps.eng4501_Year_10) {
            exciseTax = parseInt(ps.eng4501_Year_10.price);
          }
        }
      } else exciseTax = 0;

      logisticMn = logistic * usd;
  
      if (ps.gaaliHuvi){
        gaaliHuvi =
          (price + feeMn + logisticMn) * parseFloat(ps.gaaliHuvi.price / 100);
        hybraid = parseFloat(exciseTax) / 2;
      }

      if (ps.noat){
        noatTatvarOft =
          (price + feeMn + logisticMn + exciseTax) *
          parseFloat(ps.noat.price / 100);
      }

      if (ps.noat){
        noatTatvarHy =
          (price + feeMn + logisticMn + hybraid) *
          parseFloat(ps.noat.price / 100);
        }
      mongolOft = logisticMn + exciseTax + gaaliHuvi + noatTatvarOft;
      mongolHyb = logisticMn + hybraid + gaaliHuvi + noatTatvarHy;

      niitOft = parseInt(prePayMn) + parseInt(mongolOft);
      niitHyb = parseInt(prePayMn) + parseInt(mongolHyb);
      const sendPrice = isHybrid && isHybrid.length > 0 ? niitHyb : niitOft;
      userCtx.getPrice(parseInt(sendPrice));

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
        feeName,
        logisticName,
      }));
    }
  }, [product, jpy, usd, isFree, isHybrid, ps]);

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
          <td>???????????? ??????</td>
          <td>??{new Intl.NumberFormat().format(product.price)}</td>
          <td>??{jpy}</td>
          <td>
            {new Intl.NumberFormat().format(parseFloat(calculator.price))}???
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>{ps && ps.japanTax && ps.japanTax.name}</td>
          <td>??{new Intl.NumberFormat().format(calculator.japanTax)}</td>
          <td>??{jpy}</td>
          <td>{new Intl.NumberFormat().format(calculator.japanTaxMn)}???</td>
        </tr>
          <tr>
          <td>3</td>
          <td>{calculator.feeName}</td>
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
          <td>{ps && ps.logistic && ps.logistic.name}</td>
          <td>${new Intl.NumberFormat().format(calculator.logistic)}</td>
          <td>${new Intl.NumberFormat().format(usd)}</td>
          <td>{new Intl.NumberFormat().format(calculator.logisticMn)}???</td>
        </tr>
        <tr>
          <td>5</td>
          <td>{ps && ps.exciseTax && ps.exciseTax.name}</td>
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
          <td>{ps && ps.gaaliHuvi && ps.gaaliHuvi.name}</td>
          <td></td>
          <td>
            {ps && ps.gaaliHuvi && ps.gaaliHuvi.price + ps.gaaliHuvi.priceVal}
          </td>
          <td>
            {new Intl.NumberFormat().format(parseInt(calculator.gaaliHuvi))}???
          </td>
        </tr>
        <tr>
          <td>7</td>
          <td>{ps && ps.noat && ps.noat.name}</td>
          <td></td>
          <td>{ps && ps.noat && ps.noat.price + ps.noat.priceVal}</td>
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
