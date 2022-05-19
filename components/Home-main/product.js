import { useProducts } from "hooks/use-product";
import base from "lib/base";
import Link from "next/link";
import { useRouter } from "next/router";

export default ({ active }) => {
  const { products } = useProducts(`limit=24&status=true`);
  const router = useRouter();
  const more = () => {
    router.push(`/products`);
  };
  return (
    <div
      className={`row productsList ${
        active !== "product" ? "displayNone" : "displayBlock"
      }`}
    >
      {products &&
        products.map((product, index) => (
          <div
            className="col-lg-3 col-md-3 col-sm-6 col-6 wow animate__animated animate__fadeIn"
            data-wow-delay={`${0.8}s`}
            key={`product_${product._id}`}
          >
            <Link href={`/product/${product._id}`}>
              <a>
                <div className="productItem">
                  <div className="productImage">
                    {product.pictures ? (
                      <>
                        <img
                          src={`${base.cdnUrl}/${product.pictures[0]}`}
                          className="productImg1"
                        />
                        {product.pictures[1] && (
                          <img
                            src={`${base.cdnUrl}/${product.pictures[1]}`}
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
                      <li>{product.car_type.name}</li>
                      <li>{product.car_km} km</li>
                    </div>
                    <div className="productPrice">
                      {parseInt(product.price) / 1000000} Сая
                    </div>
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
