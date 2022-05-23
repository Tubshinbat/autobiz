import base from "lib/base";
import Link from "next/link";
import { useState } from "react";
import ProductSide from "./productSide";
import BeproductSide from "./beproductSide";

import Product from "./product";
import Beproduct from "./beproduct";

export default () => {
  const [active, setActive] = useState("product");

  return (
    <section className="main">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-3">
            <ProductSide active={active} />
            <BeproductSide active={active} />
          </div>
          <div className="col-lg-9 col-md-12">
            <div className="homeTabs">
              <div
                className={`homeTab ${
                  active === "product" && "active"
                } wow animate__animated animate__fadeInUp`}
                data-wow-delay={`1.4s`}
                onClick={() => setActive("product")}
              >
                Монголд байгаа
              </div>
              <div
                className={`homeTab ${
                  active === "beproduct" && "active"
                } wow animate__animated animate__fadeInUp`}
                data-wow-delay={`1.6s`}
                onClick={() => setActive("beproduct")}
              >
                Ачигдахад бэлэн
              </div>
              <div
                className="homeTab action wow animate__animated animate__fadeInUp"
                data-wow-delay={`1.8s`}
              >
                LIVE Дуудлага худалдаа <span className="coming"> Удахгүй</span>
              </div>
            </div>
            <Product active={active} />
            <Beproduct active={active} />
          </div>
        </div>
      </div>
    </section>
  );
};
