import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import css from "styles/product.module.css";
import {
  useCarcolors,
  useCarIndustries,
  useCartypes,
  useCarzagvars,
} from "hooks/use-cartypes";
import { useGroupProduct } from "hooks/use-product";

export default () => {
  const { query, asPath } = useRouter();
  const [currentIndustry, setIndustry] = useState("");
  const [searchForm, setSearchForm] = useState({});
  const { products: industry } = useCarIndustries(`limit=100`);
  const { types } = useCartypes(`limit=100`);
  const { zagvars } = useCarzagvars(`limit=100&industry=${currentIndustry}`);
  const { colors } = useCarcolors(`limit=100`);
  const { groupData: car_motor } = useGroupProduct("car_motor");
  const { groupData: car_hurd } = useGroupProduct("car_hurd");
  const { groupData: car_shatakhuun } = useGroupProduct("car_shatakhuun");
  const { groupData: lizing } = useGroupProduct("lizing");
  const { groupData: car_speed_box } = useGroupProduct("car_speed_box");

  useEffect(() => {
    if (query.industry) setIndustry(query.industry);
    setSearchForm(query);
  }, [query]);

  const refresh = () => {
    Object.keys(searchForm).map((key) =>
      setSearchForm((bf) => ({ ...bf, [key]: "" }))
    );
  };

  const handleChange = (event) => {
    if (event.target.name === "industry") setIndustry(event.target.value);
    setSearchForm((bf) => ({ ...bf, [event.target.name]: event.target.value }));
  };

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

  return (
    <form action="/products" style={{ overflow: "hidden" }}>
      <div className={` ${css.SearchBox}`}>
        <div className="row">
          <div className="form-group col-lg-3 col-md-3 col-sm-6 col-6">
            <select
              id="inputState"
              name="industry"
              onChange={handleChange}
              value={searchForm.industry}
              className={`form-select form-select-sm ${css.InputBox}`}
            >
              <option value="" selected>
                Машины үйлдвэрлэгч
              </option>
              {industry &&
                industry.map((product) => (
                  <option value={product._id} key={`indust_${product._id}`}>
                    {product.industry} ({product.industryCount})
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group col-lg-3 col-md-3 col-sm-6 col-6">
            <select
              id="inputState"
              name="zagvar"
              onChange={handleChange}
              value={searchForm.zagvar}
              className={`form-select form-select-sm ${css.InputBox}`}
            >
              <option value="" selected>
                Загвар
              </option>
              {zagvars &&
                zagvars.map((zagvar) => (
                  <option value={zagvar._id} key={zagvar._id}>
                    {zagvar.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group col-lg-3 col-md-3 col-sm-6 col-6">
            <select
              id="inputState"
              name="carType"
              onChange={handleChange}
              value={searchForm.carType}
              className={`form-select form-select-sm ${css.InputBox}`}
            >
              <option value="" selected>
                Төрөл
              </option>
              {types &&
                types.map((type) => (
                  <option value={type._id} key={type._id}>
                    {type.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group col-lg-3 col-md-3 col-sm-6 col-6">
            <select
              id="inputState"
              name="color"
              onChange={handleChange}
              value={searchForm.color}
              className={`form-select form-select-sm ${css.InputBox}`}
            >
              <option value="" selected>
                Өнгө
              </option>
              {colors &&
                colors.map((color) => (
                  <option value={color._id} key={color._id}>
                    {color.name}
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
                  <option value={motor.name}>{motor.name} cc</option>
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
                  <option value={motor.name}>{motor.name} cc</option>
                ))}
            </select>
          </div>
          <div className="form-group col-lg-3 col-md-3 col-sm-6 col-6">
            <select
              id="inputState"
              name="car_hurd"
              onChange={handleChange}
              value={searchForm.car_hurd}
              className={`form-select form-select-sm ${css.InputBox}`}
            >
              <option value="" selected>
                Хүрд
              </option>
              {car_hurd &&
                car_hurd.map((hurd) => (
                  <option value={hurd.name}>{hurd.name}</option>
                ))}
            </select>
          </div>

          <div className="form-group col-lg-3 col-md-3 col-sm-6 col-6">
            <select
              id="inputState"
              name="car_shatakhuun"
              onChange={handleChange}
              value={searchForm.car_shatakhuun}
              className={`form-select form-select-sm ${css.InputBox}`}
            >
              <option value="" selected>
                Шатахуун
              </option>
              {car_shatakhuun &&
                car_shatakhuun.map((shatakhuun) => (
                  <option value={shatakhuun.name}>{shatakhuun.name}</option>
                ))}
            </select>
          </div>

          <div className="form-group col-lg-3 col-md-3 col-sm-6 col-6">
            <select
              id="inputState"
              name="car_speed_box"
              onChange={handleChange}
              value={searchForm.car_speed_box}
              className={`form-select form-select-sm ${css.InputBox}`}
            >
              <option value="" selected>
                Хурдны хайрцаг
              </option>
              {car_speed_box &&
                car_speed_box.map((speedBox) => (
                  <option value={speedBox.name}>{speedBox.name}</option>
                ))}
            </select>
          </div>

          <div className="form-group col-lg-3 col-md-3 col-sm-6 col-6">
            <select
              id="inputState"
              name="lizing"
              onChange={handleChange}
              value={searchForm.lizing}
              className={`form-select form-select-sm ${css.InputBox}`}
            >
              <option value="" selected>
                Линзинг
              </option>
              {lizing &&
                lizing.map((lizing) => (
                  <option value={lizing.name}>{lizing.name}</option>
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
