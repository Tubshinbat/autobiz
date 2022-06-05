import { useEffect, useState } from "react";
import css from "styles/product.module.css";
import getTranslate from "lib/translate";
import { useRouter } from "next/router";
import {
  useGroupBeProduct,
  useGroupFilterBeProduct,
} from "hooks/use-beproduct";

export default () => {
  const { query, asPath } = useRouter();
  const [currentMake, setMake] = useState("");
  const [currentModel, setModel] = useState("");
  const [searchForm, setSearchForm] = useState({});
  const { groups: mark_txt } = useGroupBeProduct(`mark_txt`);
  const { groups: location } = useGroupBeProduct(`country`);
  const { groups: trans } = useGroupBeProduct("trans");
  const { groups: fuels } = useGroupBeProduct("fuel");
  const { filterGroups: models } = useGroupFilterBeProduct(
    `group=model&filed=mark_txt&filter=${currentMake}`
  );
  const { filterGroups: types } = useGroupFilterBeProduct(
    `group=type_txt&filed=model&filter=${currentModel}`
  );

  const years = () => {
    const currentYear = new Date().getFullYear();
    let years = [];
    let startYear = 1920;
    while (startYear <= currentYear) {
      years.push(startYear++);
    }
    return years;
  };

  const arrayYears = years();

  const car_motor = [
    { name: "700cc", value: 700 },
    { name: "1000cc", value: 1000 },
    { name: "1500cc", value: 1500 },
    { name: "1800cc", value: 1800 },
    { name: "2000cc", value: 2000 },
    { name: "2500cc", value: 2500 },
    { name: "3000cc", value: 3000 },
    { name: "4000cc", value: 4000 },
  ];

  const mileage = [
    { name: "50,000 km", value: 50000 },
    { name: "80,000 km", value: 80000 },
    { name: "100,000 km", value: 100000 },
    { name: "150000 km", value: 150000 },
    { name: "200,000 km", value: 200000 },
    { name: "300,000 km", value: 300000 },
  ];

  const price = [
    { name: "¥50,000", value: 50000 },
    { name: "¥75,000", value: 75000 },
    { name: "¥100,000", value: 100000 },
    { name: "¥150,000", value: 150000 },
    { name: "¥200,000", value: 200000 },
    { name: "¥250,000", value: 250000 },
    { name: "¥300,000", value: 300000 },
    { name: "¥350,000", value: 350000 },
    { name: "¥400,000", value: 400000 },
    { name: "¥450,00", value: 450000 },
    { name: "¥500,000", value: 500000 },
    { name: "¥600,000", value: 600000 },
    { name: "¥700,000", value: 700000 },
    { name: "¥800,000", value: 800000 },
    { name: "¥900,000", value: 900000 },
    { name: "¥1,000,000", value: 1000000 },
    { name: "¥1,500,000", value: 1500000 },
    { name: "¥2,000,000", value: 2000000 },
  ];

  const refresh = () => {
    Object.keys(searchForm).map((key) =>
      setSearchForm((bf) => ({ ...bf, [key]: "" }))
    );
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    if (name === "make") setMake(value);
    if (name === "model") setModel(value);
    setSearchForm((bf) => ({ ...bf, [name]: value }));
  };

  useEffect(() => {
    if (query.make) setMake(query.make);
    if (query.model) setModel(query.model);
    setSearchForm(query);
  }, [query]);

  return (
    <form action="/beproducts" style={{ overflow: "hidden" }}>
      <div className={` ${css.SearchBox}`}>
        <div className="row">
          <div className="form-group col-lg-3 col-md-3 col-sm-6 col-6">
            <select
              id="inputState"
              name="make"
              onChange={handleChange}
              value={searchForm.make}
              className={`form-select form-select-sm ${css.InputBox}`}
            >
              <option value="" selected>
                Машины үйлдвэрлэгч
              </option>
              {mark_txt &&
                mark_txt.map((product) => (
                  <option value={product._id} key={`indust_${product._id}`}>
                    {product._id} ({product.count})
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group col-lg-3 col-md-3 col-sm-6 col-6">
            <select
              id="inputState"
              name="model"
              onChange={handleChange}
              value={searchForm.model}
              className={`form-select form-select-sm ${css.InputBox}`}
            >
              <option value="" selected>
                Загвар
              </option>
              {models &&
                models.map((model) => (
                  <option value={model._id} key={model._id}>
                    {model._id} ({model.count})
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group col-lg-3 col-md-3 col-sm-6 col-6">
            <select
              id="inputState"
              name="type"
              onChange={handleChange}
              value={searchForm.type}
              className={`form-select form-select-sm ${css.InputBox}`}
            >
              <option value="" selected>
                Төрөл
              </option>
              {types &&
                types.map((type) => (
                  <option value={type._id} key={type._id}>
                    {type._id} ({type.count})
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group col-lg-3 col-md-3 col-sm-6 col-6">
            <select
              id="inputState"
              name="country"
              onChange={handleChange}
              value={searchForm.country}
              className={`form-select form-select-sm ${css.InputBox}`}
            >
              <option value="" selected>
                Байршил
              </option>
              {location &&
                location.map((location) => (
                  <option value={location._id} key={location._id}>
                    {getTranslate(location._id)}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group col-lg-3 col-md-3 col-sm-6 col-6">
            <select
              id="inputState"
              name="minYear"
              onChange={handleChange}
              value={searchForm.minYear}
              className={`form-select form-select-sm ${css.InputBox}`}
            >
              <option value=""> Үйлдвэрлэсэн он доод </option>
              {arrayYears.map((year) => (
                <option value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div className="form-group col-lg-3 col-md-3 col-sm-6 col-6">
            <select
              id="inputState"
              name="maxYear"
              onChange={handleChange}
              value={searchForm.maxYear}
              className={`form-select form-select-sm ${css.InputBox}`}
            >
              <option value=""> Үйлдвэрлэсэн он дээд </option>
              {arrayYears.reverse().map((year) => (
                <option value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div className="form-group col-lg-3 col-md-3 col-sm-6 col-6">
            <select
              id="inputState"
              name="minMotor"
              onChange={handleChange}
              value={searchForm.minMotor}
              className={`form-select form-select-sm ${css.InputBox}`}
            >
              <option value="" selected>
                Мотор доод
              </option>
              {car_motor &&
                car_motor.map((motor) => (
                  <option value={motor.value}>{motor.name}</option>
                ))}
            </select>
          </div>
          <div className="form-group col-lg-3 col-md-3 col-sm-6 col-6">
            <select
              id="inputState"
              name="maxMotor"
              onChange={handleChange}
              value={searchForm.maxMotor}
              className={`form-select form-select-sm ${css.InputBox}`}
            >
              <option value="" selected>
                Мотор дээд
              </option>
              {car_motor &&
                car_motor.map((motor) => (
                  <option value={motor.value}>{motor.name}</option>
                ))}
            </select>
          </div>
          <div className="form-group col-lg-3 col-md-3 col-sm-6 col-6">
            <select
              id="inputState"
              name="trans"
              onChange={handleChange}
              value={searchForm.trans}
              className={`form-select form-select-sm ${css.InputBox}`}
            >
              <option value="" selected>
                Transmission
              </option>
              {trans &&
                trans.map((tran) => (
                  <option value={tran._id}>{tran._id}</option>
                ))}
            </select>
          </div>

          <div className="form-group col-lg-3 col-md-3 col-sm-6 col-6">
            <select
              id="inputState"
              name="fuel"
              onChange={handleChange}
              value={searchForm.fuel}
              className={`form-select form-select-sm ${css.InputBox}`}
            >
              <option value="" selected>
                Шатахуун
              </option>
              {fuels &&
                fuels.map((fuel) => (
                  <option value={fuel._id}>{getTranslate(fuel._id)}</option>
                ))}
            </select>
          </div>

          <div className="form-group col-lg-3 col-md-3 col-sm-6 col-6">
            <select
              id="inputState"
              name="minMil"
              onChange={handleChange}
              value={searchForm.minMil}
              className={`form-select form-select-sm ${css.InputBox}`}
            >
              <option value="" selected>
                Гүйлт доод
              </option>
              {mileage &&
                mileage.map((mil) => (
                  <option value={mil.value}>{mil.name}</option>
                ))}
            </select>
          </div>

          <div className="form-group col-lg-3 col-md-3 col-sm-6 col-6">
            <select
              id="inputState"
              name="maxMil"
              onChange={handleChange}
              value={searchForm.maxMil}
              className={`form-select form-select-sm ${css.InputBox}`}
            >
              <option value="" selected>
                Гүйлт дээд
              </option>
              {mileage &&
                mileage.map((mil) => (
                  <option value={mil.value}>{mil.name}</option>
                ))}
            </select>
          </div>
          <div className="form-group col-lg-3 col-md-3 col-sm-6 col-6">
            <select
              id="inputState"
              name="minPrice"
              onChange={handleChange}
              value={searchForm.minPrice}
              className={`form-select form-select-sm ${css.InputBox}`}
            >
              <option value="" selected>
                Үнэ доод
              </option>
              {price &&
                price.map((price) => (
                  <option value={price.value}>{price.name}</option>
                ))}
            </select>
          </div>
          <div className="form-group col-lg-3 col-md-3 col-sm-6 col-6">
            <select
              id="inputState"
              name="maxPrice"
              onChange={handleChange}
              value={searchForm.maxPrice}
              className={`form-select form-select-sm ${css.InputBox}`}
            >
              <option value="" selected>
                Үнэ дээд
              </option>
              {price &&
                price.map((price) => (
                  <option value={price.value}>{price.name}</option>
                ))}
            </select>
          </div>

          <div className={css.SearchBoxFooter}>
            <div className={css.SearchBoxBtns}>
              <button type="submit" className={css.SearchSubmit}>
                <i class="fa-solid fa-magnifying-glass"></i> Хайлт хийх
              </button>
              <button type="button" onClick={refresh} className={css.Clear}>
                Цэвэрлэх
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
