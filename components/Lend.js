import { useEffect } from "react";
import Head from "next/head";

const $ = require("jquery");
const calc = (duration, price, rate) => {
  var duration = duration,
    numeralObj = numeral(price),
    remaining = numeralObj.value(),
    totalInterest = 0,
    totalPayment = 0,
    records = [],
    rate = rate / 12 / 100;
  let result = {};
  result.payment = pmt(rate, duration, numeralObj.value() * -1, null, 2);

  for (var m = 0; m < duration; m++) {
    var record = {};
    record["payment"] = result.payment.toFixed(2);
    record["interest"] = (remaining * rate).toFixed(2);
    record["main"] = (record["payment"] - record["interest"]).toFixed(2);
    remaining = remaining - record["main"];
    record["remaining"] = remaining.toFixed(2);
    totalPayment += parseFloat(record["payment"]);
    totalInterest += parseFloat(record["interest"]);
    records.push(record);
  }

  result.records = records;
  result.total = totalPayment;
  result.rate = totalInterest;

  return result;
};

function pmt(ir, np, pv, fv, mode) {
  let pmt, pvif;
  fv || (fv = 0);
  mode || (mode = 0);
  if (ir === 0) {
    return -(pv + fv) / np;
  }
  pvif = Math.pow(1 + ir, np);
  pmt = (-ir * pv * (pvif + fv)) / (pvif - 1);
  if (mode === 1) pmt /= 1 + ir;
  return pmt;
}

export default ({ dPrice }) => {
  useEffect(() => {
    $("#amount").on("keyup", function () {
      $(this).val(numeral($(this).val()).format("0,0"));
    });
    $("#calculate").on("click", function () {
      var price = $("#amount").val(),
        rate = $("#rate").val(),
        duration = $("#duration").val();

      if (price === "") {
        alert("Зээлийн хэмжээ оруулна уу !");
        return false;
      } else if (duration === "") {
        alert("Зээлийн хугацаа оруулна уу !");
        return false;
      } else if (rate === "") {
        alert("Зээлийн хүү оруулна уу !");
        return false;
      }
      const result = calc(duration, price, rate);
      if (result.records.length) {
        var html = "",
          month = 1;
        result.records.forEach(function (row) {
          html += "<tr>";
          html += "<td>" + month + "</td>";
          html +=
            "<td>" +
            (row.remaining < 0 ? 0 : numeral(row.remaining).format("0,0")) +
            "</td>";
          html += "<td>" + numeral(row.main).format("0,0") + "</td>";
          html += "<td>" + numeral(row.interest).format("0,0") + "</td>";
          html += "<td>" + numeral(row.payment).format("0,0") + "</td>";
          html += "</tr>";
          month++;
        });
        $(".calc-result").html(html);
        $(".payment").html(numeral(result.payment).format("0,0") + " ₮");
        $(".total").html(numeral(result.total).format("0,0") + " ₮");
        $(".rate").html(numeral(result.rate).format("0,0") + " ₮");
      }
    });
  }, []);
  return (
    <>
      <Head>
        <script src="//cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js"></script>
      </Head>
      <section className="lendSection" id="Lend">
        <div className="container">
          <div className="calculator-main">
            <div className="calHeader">
              <h4> Зээлийн тооцоолуур</h4>
            </div>
            <div className="calculator-box row">
              <div className="form-group col-lg-6 calInput">
                <label htmlFor> Зээлийн хэмжээ </label>
                <input
                  id="amount"
                  type="text"
                  name="price"
                  defaultValue={dPrice && dPrice}
                  placeholder="Зээлийн хэмжээ"
                />
              </div>
              <div className="form-group col-lg-6 calInput">
                <label htmlFor> Зээлийн хугацаа (сараар) </label>
                <input
                  id="duration"
                  type="number"
                  placeholder="Зээлийн хугацаа (сараар)"
                />
              </div>
              <div className="form-group col-lg-6 calInput">
                <label htmlFor> Зээлийн хүү (жилээр) </label>
                <input
                  id="rate"
                  type="number"
                  placeholder="Зээлийн хүү (жилээр)"
                />
              </div>
              <div className="form-group col-lg-6 ">
                <a id="calculate" className="btn  btn-cal">
                  <i className="fa fa-calculator mr-2" /> БОДОХ
                </a>
              </div>
            </div>
            <div className="calculator-list">
              <div className="cal-list">
                <div className="payment">-</div>
                <span> Сар бүрийн төлбөр</span>
              </div>
              <div className="cal-list">
                <div className="rate">-</div>
                <span> Зээлийн хугацаанд төлөх хүүгийн төлбөр</span>
              </div>
              <div className="cal-list">
                <div className="total">-</div>
                <span> Зээлийн хугацаанд төлөх нийт төлбөр</span>
              </div>
            </div>
            <table className="table table-sm table-bordered caltable">
              <thead>
                <tr>
                  <th className="text-center" style={{ width: "10%" }}>
                    Сар
                  </th>
                  <th className="text-right" style={{ width: "22%" }}>
                    Зээлийн үлдэгдэл
                  </th>
                  <th className="text-right" style={{ width: "26%" }}>
                    Үндсэн зээлийн төлбөр
                  </th>
                  <th className="text-right" style={{ width: "22%" }}>
                    Бодогдсон хүү
                  </th>
                  <th className="text-right" style={{ width: "22%" }}>
                    Нийт төлбөр
                  </th>
                </tr>
              </thead>
              <tbody className="calc-result"></tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};
