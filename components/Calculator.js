import { useHybrids, useFree } from "hooks/use-hybrid";
import { useRate } from "hooks/use-rates";
import { useContext, useEffect, useState } from "react";
import UserContext from "context/UserContext";
import { useCal } from "hooks/use-cal";

export default ({ product }) => {
  const { data: rate } = useRate();
  const { prices: usePrice } = useCal(`limit=100`);
  const [calculator, setCalculator] = useState();
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

  console.log(ps);

  // usePrice.map((price) => {
  //   setDprice((pstate) => ({ ...pstate, [price.type]: price }));
  //   console.log(price);
  // });

  // useEffect(() => {
  //   if (rate) {
  //     const usdIndex = rate.findIndex((x) => x.number === 1);
  //     const japanIndex = rate.findIndex((x) => x.number === 3);
  //     setJpy(
  //       rate[japanIndex] &&
  //         rate[japanIndex].cashSellRate &&
  //         rate[japanIndex].cashSellRate
  //     );
  //     setUsd(
  //       rate[usdIndex] &&
  //         rate[usdIndex].cashSellRate &&
  //         rate[usdIndex].cashSellRate
  //     );
  //   }
  // }, [rate]);

  // useEffect(() => {
  //   if (product && jpy && usd && usePrice) {
  //     const { _id } = product;

  //     // Cal

  //     const price = parseFloat(jpy) * parseFloat(product.price);

  //     usePrice.map((price) => {
  //       setDprice((pstate) => ({ ...pstate, [price.type]: price }));
  //     });

  //     let exciseTax = 0;
  //     let ENG_V = 0;
  //     let japanTax =
  //       parseFloat(product.price) * parseFloat(ps.japanTax.price / 100);
  //     let japanTaxMn = parseFloat(japanTax) * parseFloat(jpy);

  //     let fee = parseInt(ps.fee.price || 120000);
  //     let logistic = parseInt(ps.logistic.price || 3000);

  //     const countYear =
  //       parseInt(new Date().getFullYear()) - parseInt(product.car_year);
  //     const eng = product.engine;

  //     switch (product.country) {
  //       case "Singapore":
  //         logistic = parseInt(ps.logisticSingapore.price);
  //         break;
  //       case "Japan":
  //         logistic = parseInt(ps.logisticJapan.price);
  //         fee = parseInt(ps.feeJapan.price);
  //         ps.logistic.name = ps.logisticJapan.name;
  //         ps.fee.name = ps.feeJapan.name;
  //         break;
  //       case "Korea":
  //         logistic = parseInt(ps.logisticKorea.price);
  //         fee = parseInt(ps.feeKorea.price);
  //         ps.logistic.name = ps.logisticKorea.name;
  //         ps.fee.name = ps.feeKorea.name;
  //         break;
  //       case "USA":
  //         logistic = parseInt(ps.logisticUSA.price);
  //         fee = parseInt(ps.feeUSA.price);
  //         ps.fee.name = ps.feeUSA.name;
  //         ps.logistic.name = ps.logisticUSA.name;
  //         break;
  //       default:
  //         logistic = parseInt(ps.logistic.price);
  //         break;
  //     }

  //     if (
  //       product.type_txt == "bus" ||
  //       product.type_txt == "truck" ||
  //       product.type_txt == "Bus" ||
  //       product.type_txt == "Truck"
  //     ) {
  //       logistic = parseInt(ps.logisticBusTruck.price);
  //       hybraid = 0;
  //       exciseTax = parseInt(ps.busTruckExciseTax.price);
  //     }

  //     const feeMn = fee * parseFloat(jpy);

  //     // const prePay =
  //     //   parseFloat(japanTax) + parseFloat(fee) + parseFloat(product.price);
  //     // const prePayMn = parseFloat(japanTaxMn) + parseFloat(feeMn) + price;

  //     if (eng) {
  //       ENG_V = 1;
  //       if (eng <= 1500) {
  //         if (countYear <= 3 && countYear >= 0) {
  //           exciseTax = parseInt(ps.eng1500_Year_3_to_0.price);
  //         } else if (countYear <= 6 && countYear >= 4) {
  //           exciseTax = parseInt(ps.eng1500_Year_6_to_4.price);
  //         } else if (countYear <= 9 && countYear >= 7) {
  //           exciseTax = parseInt(ps.eng1500_Year_9_to_7.price);
  //         } else if (countYear >= 10) {
  //           exciseTax = parseInt(ps.eng1500_Year_10.price);
  //         }
  //       } else if (eng >= 1501 && eng <= 2500) {
  //         ENG_V = 2;
  //         if (countYear <= 3 && countYear >= 0) {
  //           exciseTax = parseInt(ps.eng2500_Year_3_to_0.price);
  //         } else if (countYear <= 6 && countYear >= 4) {
  //           exciseTax = parseInt(ps.eng2500_Year_6_to_4.price);
  //         } else if (countYear <= 9 && countYear >= 7) {
  //           exciseTax = parseInt(ps.eng2500_Year_9_to_7.price);
  //         } else if (countYear >= 10) {
  //           exciseTax = parseInt(ps.eng2500_Year_10.price);
  //         }
  //       } else if (eng >= 2501 && eng <= 3500) {
  //         ENG_V = 3;
  //         if (countYear <= 3 && countYear >= 0) {
  //           exciseTax = parseInt(ps.eng3500_Year_3_to_0.price);
  //         } else if (countYear <= 6 && countYear >= 4) {
  //           exciseTax = parseInt(ps.eng3500_Year_6_to_4.price);
  //         } else if (countYear <= 9 && countYear >= 7) {
  //           exciseTax = parseInt(ps.eng3500_Year_9_to_7.price);
  //         } else if (countYear >= 10) {
  //           exciseTax = parseInt(ps.eng3500_Year_10.price);
  //         }
  //       } else if (eng >= 3501 && eng <= 4500) {
  //         ENG_V = 4;
  //         if (countYear <= 3 && countYear >= 0) {
  //           exciseTax = parseInt(ps.eng4500_Year_3_to_0.price);
  //         } else if (countYear <= 6 && countYear >= 4) {
  //           exciseTax = parseInt(ps.eng4500_Year_6_to_4.price);
  //         } else if (countYear <= 9 && countYear >= 7) {
  //           exciseTax = parseInt(ps.eng4500_Year_9_to_7.price);
  //         } else if (countYear >= 10) {
  //           exciseTax = parseInt(ps.eng4500_Year_10.price);
  //         }
  //       } else if (eng >= 4501) {
  //         ENG_V = 5;
  //         if (countYear <= 3 && countYear >= 0) {
  //           exciseTax = parseInt(ps.eng4501_Year_3_to_0.price);
  //         } else if (countYear <= 6 && countYear >= 4) {
  //           exciseTax = parseInt(ps.eng4501_Year_6_to_4.price);
  //         } else if (countYear <= 9 && countYear >= 7) {
  //           exciseTax = parseInt(ps.eng4501_Year_9_to_7.price);
  //         } else if (countYear >= 10) {
  //           exciseTax = parseInt(ps.eng4501_Year_10.price);
  //         }
  //       }
  //     } else exciseTax = 0;

  //     let logisticMn = logistic * usd;
  //     const gaaliHuvi =
  //       (price + feeMn + logisticMn) * parseFloat(ps.gaaliHuvi.price / 100);
  //     let hybraid = parseFloat(exciseTax) / 2;

  //     const noatTatvarOft =
  //       (price + feeMn + logisticMn + exciseTax) *
  //       parseFloat(ps.noat.price / 100);
  //     const noatTatvarHy =
  //       (price + feeMn + logisticMn + hybraid) *
  //       parseFloat(ps.noat.price / 100);
  //     let mongolOft = logisticMn + exciseTax + gaaliHuvi + noatTatvarOft;
  //     let mongolHyb = logisticMn + hybraid + gaaliHuvi + noatTatvarHy;

  //     const niitOft = parseInt(prePayMn) + parseInt(mongolOft);
  //     const niitHyb = parseInt(prePayMn) + parseInt(mongolHyb);
  //     const sendPrice = isHybrid && isHybrid.length > 0 ? niitHyb : niitOft;
  //     userCtx.getPrice(parseInt(sendPrice));

  //     setCalculator(() => ({
  //       price,
  //       japanTax,
  //       japanTaxMn,
  //       fee,
  //       feeMn,
  //       prePay:
  //         isHybrid && isHybrid.length > 0
  //           ? parseInt(niitHyb) / 2
  //           : parseInt(niitOft) / 2,
  //       prePayMn:
  //         isHybrid && isHybrid.length > 0
  //           ? parseInt(niitHyb) / 2
  //           : parseInt(niitOft) / 2,
  //       logistic,
  //       logisticMn,
  //       countYear,
  //       exciseTax,
  //       gaaliHuvi,
  //       hybraid,
  //       noatTatvarOft,
  //       noatTatvarHy,
  //       mongolHyb:
  //         isHybrid && isHybrid.length > 0
  //           ? parseInt(niitHyb) / 2
  //           : parseInt(niitOft) / 2,
  //       mongolOft:
  //         isHybrid && isHybrid.length > 0
  //           ? parseInt(niitHyb) / 2
  //           : parseInt(niitOft) / 2,
  //       niitHyb,
  //       niitOft,
  //     }));
  //   }
  // }, [product, jpy, usd, isFree, isHybrid, usePrice]);

  return (
    <> </>
    // <table className="preOrderTable">
    //   <tr>
    //     <th>№</th>
    //     <th>Тайлбар</th>
    //     <th>Валют</th>
    //     <th>Ханш</th>
    //     <th>Үнэ</th>
    //   </tr>
    //   <tbody>
    //     <tr>
    //       <td>1</td>
    //       <td>{ps.productPrice.name}</td>
    //       <td>¥{new Intl.NumberFormat().format(product.price)}</td>
    //       <td>¥{jpy}</td>
    //       <td>
    //         {new Intl.NumberFormat().format(parseFloat(calculator.price))}₮
    //       </td>
    //     </tr>
    //     <tr>
    //       <td>2</td>
    //       <td>{ps.japanTax.name}</td>
    //       <td>¥{new Intl.NumberFormat().format(calculator.japanTax)}</td>
    //       <td>¥{jpy}</td>
    //       <td>{new Intl.NumberFormat().format(calculator.japanTaxMn)}₮</td>
    //     </tr>
    //     <tr>
    //       <td>3</td>
    //       <td>{ps.fee.name}</td>
    //       <td>¥{new Intl.NumberFormat().format(calculator.fee)}</td>
    //       <td>¥{jpy}</td>
    //       <td>{new Intl.NumberFormat().format(calculator.feeMn)}₮</td>
    //     </tr>
    //     <tr>
    //       <td></td>
    //       <td colspan="3">
    //         <b>Урьдчилгаа төлбөр</b>
    //       </td>

    //       <td>
    //         {new Intl.NumberFormat().format(parseInt(calculator.prePayMn))}₮
    //       </td>
    //     </tr>
    //     <tr>
    //       <td>4</td>
    //       <td>{ps.logistic.name}</td>
    //       <td>${new Intl.NumberFormat().format(calculator.logistic)}</td>
    //       <td>${new Intl.NumberFormat().format(usd)}</td>
    //       <td>{new Intl.NumberFormat().format(calculator.logisticMn)}₮</td>
    //     </tr>
    //     <tr>
    //       <td>5</td>
    //       <td>{ps.exciseTax.name}</td>
    //       <td></td>
    //       <td></td>
    //       <td>
    //         {new Intl.NumberFormat().format(
    //           isHybrid && isHybrid.length > 0
    //             ? calculator.hybraid
    //             : calculator.exciseTax
    //         )}
    //         ₮
    //       </td>
    //     </tr>
    //     <tr>
    //       <td>6</td>
    //       <td>{ps.gaaliHuvi.name}</td>
    //       <td></td>
    //       <td>{ps.gaaliHuvi.price + ps.gaaliHuvi.priceVal}</td>
    //       <td>
    //         {new Intl.NumberFormat().format(parseInt(calculator.gaaliHuvi))}₮
    //       </td>
    //     </tr>
    //     <tr>
    //       <td>7</td>
    //       <td>{ps.noat.name}</td>
    //       <td></td>
    //       <td>{ps.noat.price + ps.noat.priceVal}</td>
    //       <td>
    //         {new Intl.NumberFormat().format(
    //           parseInt(
    //             isHybrid && isHybrid.length > 0
    //               ? calculator.noatTatvarHy
    //               : calculator.noatTatvarOft
    //           )
    //         )}
    //         ₮
    //       </td>
    //     </tr>
    //     <tr>
    //       <td></td>
    //       <td colspan="3">Машин Монголд ирсэн үед төлөх нийт төлбөр</td>
    //       <td align="right">
    //         {new Intl.NumberFormat().format(
    //           isHybrid && isHybrid.length > 0
    //             ? calculator.mongolHyb
    //             : calculator.mongolOft
    //         )}{" "}
    //         <span>₮</span>
    //       </td>
    //     </tr>
    //     <tr>
    //       <td></td>
    //       <td colspan="3">
    //         <b>Нийт гар дээр ирэх төлбөр</b>
    //       </td>
    //       <td align="right">
    //         <b>
    //           {new Intl.NumberFormat().format(
    //             isHybrid && isHybrid.length > 0
    //               ? calculator.niitHyb
    //               : calculator.niitOft
    //           )}
    //         </b>
    //         <span>₮</span>
    //       </td>
    //     </tr>
    //   </tbody>
    // </table>
  );
};
