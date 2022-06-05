import BeSearch from "components/BeSearch";
import { useBeproducts } from "hooks/use-beproduct";
import base from "lib/base";
import { getRate } from "lib/rate";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default ({ active }) => {
  const [usd, setUsd] = useState("");
  const [jpy, setJpy] = useState("");
  const { products } = useBeproducts(`limit=25&status=true`);
  const router = useRouter();
  const more = () => {
    router.push(`/beproducts?page=2`);
  };

  useEffect(async () => {
    const { data } = await getRate();
    const usdIndex = await data.findIndex((x) => x.number === 1);
    const jpyIndex = await data.findIndex((x) => x.number === 3);
    if (data) {
      setUsd(
        data[usdIndex] &&
          data[usdIndex].cashSellRate &&
          data[usdIndex].cashSellRate
      );
      setJpy(
        data[jpyIndex] &&
          data[jpyIndex].cashSellRate &&
          data[jpyIndex].cashSellRate
      );
    }
  }, []);
  return (
    <div
      className={`row productsGrip  ${
        active !== "beproduct" ? "displayNone" : "displayBlock"
      }`}
    >
      <div className="col-lg-12">
        <BeSearch />
      </div>
      {products &&
        products.map((product) => (
          <div
            className="col-custom-2 col-lg-3 col-md-3 col-sm-6 col-6"
            key={`beproduct_${product._id}`}
          >
            <Link href={`/beproduct/${product._id}`}>
              <a>
                <div className="productItem">
                  <div
                    className="productImage"
                    style={{
                      backgroundImage: `url(${base.cdnUrl}/product/${product.id}/product/${product.gallery_images[0]})`,
                    }}
                  >
                    {product.gallery_images ? <></> : "Зураггүй"}
                  </div>
                  <div className="productBody">
                    <div className="productName"> {product.title}</div>
                    <div className="moreInfo">
                      <li>{product.type_txt}</li>
                      <li>
                        {new Intl.NumberFormat().format(product.mileage)} km
                      </li>
                    </div>
                    <div className="productPrice">
                      {new Intl.NumberFormat().format(
                        parseFloat((product.price * jpy) / 1000000).toFixed(1)
                      )}
                      сая /
                      <span>
                        ¥{new Intl.NumberFormat().format(product.price)}
                      </span>
                    </div>
                    <p className="plusInfo">
                      тээвэр, татвар бусад зардал багтаагүй үнэ
                    </p>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        ))}
      <div className="productListFooter">
        <button onClick={more}> Дараагийн хуудас </button>
      </div>
    </div>
  );
};
