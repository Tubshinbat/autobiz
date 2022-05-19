import { useCarIndustries, useCartypes } from "hooks/use-cartypes";
import Link from "next/link";

export default ({ active }) => {
  const { industries, products } = useCarIndustries(`limit=100`);
  const { countTypes } = useCartypes(`limit=100`);
  return (
    <div
      className={`homesides ${
        active !== "product" ? "displayNone" : "displayBlock"
      }`}
    >
      <div
        className="side wow animate__animated animate__fadeIn"
        data-wow-delay={`1.2s`}
      >
        <div className="sideTitle">Үйлдвэрлэгч</div>
        <ul className="makes">
          {products &&
            products.map((product) => (
              <Link href={`/products?industry=${product._id}`}>
                <li>
                  <div className="makeName">
                    <i
                      className={`icn-${product.industry
                        .split(" ")
                        .join("")
                        .toLowerCase()}`}
                    ></i>
                    {product.industry}
                  </div>
                  <span className="makeCount">{product.industryCount} </span>
                </li>
              </Link>
            ))}
        </ul>
      </div>
      <div
        className="side wow animate__animated animate__fadeIn"
        data-wow-delay={`1.5s`}
      >
        <div className="sideTitle">Төрөл</div>
        <ul className="makes">
          {countTypes &&
            countTypes.map((type) => (
              <Link href={`/products?carType=${type._id}`}>
                <li>
                  <div className="makeName">{type.type}</div>
                  <span className="makeCount">{type.typeCount} </span>
                </li>
              </Link>
            ))}
        </ul>
      </div>
    </div>
  );
};
