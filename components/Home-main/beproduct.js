import { useBeproducts } from "hooks/use-beproduct";
import base from "lib/base";
import { getRate } from "lib/rate";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default ({ active }) => {
  const [usd, setUsd] = useState("");
  const { products } = useBeproducts(`limit=24&status=true`);
  const router = useRouter();
  const more = () => {
    router.push(`/beproducts`);
  };

  useEffect(async () => {
    const { data } = await getRate();
    const usdIndex = await data.findIndex((x) => x.number === 1);
    setUsd(
      data[usdIndex] && data[usdIndex].sellRate && data[usdIndex].sellRate
    );
  }, []);

  return (
    <div
      className={`row productsList  ${
        active !== "beproduct" ? "displayNone" : "displayBlock"
      }`}
    >
      {products &&
        products.map((product) => (
          <div
            className="col-custom-2 col-lg-3 col-md-3 col-sm-6 col-6"
            key={`beproduct_${product._id}`}
          >
            <Link href={`/beproduct/${product._id}`}>
              <a>
                <div className="productItem">
                  <div className="productImage">
                    {product.gallery_images ? (
                      <>
                        <img
                          src={`${product.gallery_images[0]}`}
                          className="productImg1"
                        />
                        {product.gallery_images[1] && (
                          <img
                            src={`${product.gallery_images[1]}`}
                            className="productImg2"
                          />
                        )}
                      </>
                    ) : (
                      Зураггүй
                    )}
                  </div>
                  <div className="productBody">
                    <div className="productName"> {product.title}</div>
                    <div className="moreInfo">
                      <li>{product.type_txt}</li>
                      <li>{product.mileage} km</li>
                    </div>
                    <div className="productPrice">
                      ${product.price} /
                      <span>
                        {new Intl.NumberFormat().format(
                          parseInt(parseInt(product.price) * usd) / 1000000
                        )}
                        сая
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
        <button onClick={more}> Бүгдийг нь үзэх </button>
      </div>
    </div>
  );
};
