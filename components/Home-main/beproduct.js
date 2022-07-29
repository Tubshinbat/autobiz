import BeSearch from "components/BeSearch";
import { useBeproducts, useHomeCars } from "hooks/use-beproduct";
import base from "lib/base";
import { getRate } from "lib/rate";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getHomeCar } from "lib/beproduct";

export default ({ active }) => {
  const [usd, setUsd] = useState("");
  const [jpy, setJpy] = useState("");
  const { products } = useBeproducts(`limit=25&status=true`);
  const { homecars } = useHomeCars();
  const [showCar, setShowCar] = useState([]);
  const router = useRouter();

  const more = () => {
    router.push(`/beproducts?page=1`);
  };

  useEffect(() => {
    // const fetchData = async () => {
    //   homecars.map(async (el) => {
    //     const { car } = await getHomeCar(el._id);
    //     setShowCar((ps) => [...ps, car]);
    //   });

    //   return "success";
    // };
    const one = [];
    if (homecars) {
      const { car: car1 } = await getHomeCar(homecars[0]._id);
      const { car: car2 } = await getHomeCar(homecars[1]._id);
      const { car: car3 } = await getHomeCar(homecars[2]._id);
      const { car: car4 } = await getHomeCar(homecars[3]._id);
      const { car: car5 } = await getHomeCar(homecars[4]._id);
      const { car: car6 } = await getHomeCar(homecars[5]._id);
      const { car: car7 } = await getHomeCar(homecars[6]._id);
      const { car: car8 } = await getHomeCar(homecars[7]._id);
      const { car: car9 } = await getHomeCar(homecars[8]._id);
      const { car: car10 } = await getHomeCar(homecars[9]._id);
      const { car: car11 } = await getHomeCar(homecars[10]._id);
      const { car: car12 } = await getHomeCar(homecars[11]._id);
      const { car: car13 } = await getHomeCar(homecars[12]._id);
      const { car: car14 } = await getHomeCar(homecars[13]._id);
      const { car: car15 } = await getHomeCar(homecars[14]._id);
      const { car: car16 } = await getHomeCar(homecars[15]._id);
      const { car: car17 } = await getHomeCar(homecars[16]._id);
      const { car: car18 } = await getHomeCar(homecars[17]._id);
      const { car: car19 } = await getHomeCar(homecars[18]._id);
      const { car: car20 } = await getHomeCar(homecars[19]._id);
      const { car: car21 } = await getHomeCar(homecars[20]._id);
      const { car: car22 } = await getHomeCar(homecars[21]._id);
      const { car: car23 } = await getHomeCar(homecars[22]._id);
      const { car: car24 } = await getHomeCar(homecars[23]._id);
      const { car: car25 } = await getHomeCar(homecars[24]._id);
      
      one.push(car1);
      one.push(car2);
      one.push(car3);
      one.push(car4);
      one.push(car5);
      one.push(car6);
      one.push(car7);
      one.push(car8);
      one.push(car9);
      one.push(car10);
      one.push(car11);
      one.push(car12);
      one.push(car13);
      one.push(car14);
      one.push(car15);
      one.push(car16);
      one.push(car17);
      one.push(car18);
      one.push(car19);
      one.push(car20);
      one.push(car21);
      one.push(car22);
      one.push(car23);
      one.push(car24);
      one.push(car25);
    
      setShowCar(() => one);
    }



  }, [homecars]);

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
      {showCar &&
        showCar.length > 0 &&
        showCar.map((product) => (
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
