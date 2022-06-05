import ProductSearch from "components/ProductSearch";
import { useProducts } from "hooks/use-product";
import base from "lib/base";
import Link from "next/link";
import { useRouter } from "next/router";

export default ({ active }) => {
  const { products } = useProducts(`limit=25&status=true`);
  const router = useRouter();
  const more = () => {
    router.push(`/products?page=2`);
  };
  return (
    <div
      className={`row productsGrip ${
        active !== "product" ? "displayNone" : "displayBlock"
      }`}
    >
      <div className="col-lg-12">
        <ProductSearch />
      </div>
      {products &&
        products.map((product, index) => (
          <div
            className="col-custom-2 col-lg-3 col-md-3 col-sm-6 col-6"
            data-wow-delay={`${0.8}s`}
            key={`product_${product._id}`}
          >
            <Link href={`/product/${product._id}`}>
              <a>
                <div className="productItem">
                  <div
                    className="productImage"
                    style={{
                      backgroundImage: `url(${base.cdnUrl}/${product.pictures[0]})`,
                    }}
                  >
                    {product.pictures ? <></> : "Зураггүй"}
                  </div>
                  <div className="productBody">
                    <div className="productName"> {product.title}</div>
                    <div className="moreInfo">
                      <li>{product.car_type.name}</li>
                      <li>
                        {new Intl.NumberFormat().format(product.car_km)} km
                      </li>
                    </div>
                    <div className="productPrice">
                      {new Intl.NumberFormat().format(
                        parseFloat(product.price / 1000000).toFixed(1)
                      )}
                      сая
                    </div>
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
