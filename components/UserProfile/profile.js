import Spinner from "components/Spinner";
import UserContext from "context/UserContext";
import {
  maxLength,
  minLength,
  onlyNumber,
  requiredCheck,
} from "lib/inputRegex";

import { toastControl } from "lib/toastControl";
import { updateUser } from "lib/user";
import { useContext, useEffect, useState } from "react";

export default ({ active, user }) => {
  const [form, setForm] = useState({});
  const userCtx = useContext(UserContext);
  const timer = (ms) => new Promise((res) => setTimeout(res, ms));

  const [errors, setErrors] = useState({
    firstname: true,
    lastname: true,
    phone: true,
    email: true,
  });

  useEffect(() => {
    if (userCtx.state.userData) {
      const { lastname, firstname, phone, gender, age, address, email } =
        userCtx.state.userData;
      setForm(() => ({
        lastname,
        firstname,
        phone,
        gender,
        age,
        address,
        email,
      }));
    }
  }, [userCtx]);

  //CHECK FORM FUNCTION
  const checkName = (el, name) => {
    return name === el;
  };

  const checkForm = (name, val) => {
    const valueErrors = Object.keys(errors);
    let result;
    if (valueErrors.find((el) => checkName(el, name))) {
      result = requiredCheck(val);
      if (name === "lastname" || (name === "firstname" && result === true)) {
        result = minLength(val, 2);
        result === true && (result = maxLength(val, 300));
      }
      if (name === "phone" && result === true) result = onlyNumber(val);

      if (name === "phone" && result === true) {
        result = minLength(val, 8);
        if (result === true) result = maxLength(val, 8);
      }

      if (name === "email" && result === true) {
        result = regEmail;
      }

      setErrors((bfError) => ({ ...bfError, [name]: result }));
    }
  };

  const checkTrue = () => {
    let errorCount = 0;
    let errorsValues = Object.values(errors);
    errorsValues.map((el) => {
      el === true && errorCount++;
    });
    return errorsValues.length === errorCount;
  };

  const allCheck = () => {
    Object.keys(errors).map((el) => {
      checkForm(el, form[el] === undefined ? "" : form[el]);
    });
    return checkTrue();
  };

  // -- HANDLE CHANGE INPUT
  const handleChange = (event) => {
    let { name, value } = event.target;
    setForm((bf) => ({ ...bf, [name]: value }));
    checkForm(event.target.name, event.target.value);
  };

  const changeClick = async () => {
    if (allCheck()) {
      const { user, error } = await updateUser(form);

      if (user !== undefined) {
        toastControl("success", "Мэдээлэл амжилттай шинэчлэгдлээ");
        timer(1500);
      }
      if (error) toastControl("error", error);
    } else toastControl("error", "Талбаруудыг бөглөнө үү");
  };

  return (
    <div
      className={`userFormProfile ${
        active === "profile" ? "displayBlock" : "displayNone"
      }`}
    >
      {userCtx.state.loading && <Spinner />}
      <h3> Хувийн мэдээлэл </h3>
      <div className="row">
        <div className="form-group col-lg-6">
          <label> Нэр * </label>
          <input
            type="text"
            name="firstname"
            className={`form-control ${
              errors.firstname === true && "is-valid"
            }`}
            value={form.firstname}
            onChange={handleChange}
            placeholder="Таны нэр"
          />
          <p className="contactError"> {errors.firstname} </p>
        </div>
        <div className="form-group col-lg-6">
          <label> Овог * </label>
          <input
            type="text"
            name="lastname"
            value={form.lastname}
            onChange={handleChange}
            className={`form-control ${errors.lastname === true && "is-valid"}`}
            placeholder="Таны овог нэр"
          />
          <p className="contactError"> {errors.lastname} </p>
        </div>
        <div className="form-group col-lg-6">
          <label> Утасны дугаар * </label>
          <input
            type="number"
            name="phone"
            value={form.phone}
            className={`form-control ${errors.phone === true && "is-valid"}`}
            onChange={handleChange}
            placeholder="Таны утасны дугаар"
          />
          <p className="contactError"> {errors.phone} </p>
        </div>
        <div className="form-group col-lg-6">
          <label> Имэйл хаяг * </label>
          <input
            type="email"
            name="email"
            value={form.email}
            className={`form-control ${errors.email === true && "is-valid"}`}
            onChange={handleChange}
            placeholder="Таны имэйл хаяг"
          />
          <p className="contactError"> {errors.email} </p>
        </div>
        <div className="form-group col-lg-6">
          <label> Хүйс </label>
          <select
            name="gender"
            className="form-select"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="male"> Эрэгтэй </option>
            <option value="female"> Эмэгтэй </option>
          </select>
        </div>
        <div className="form-group col-lg-6">
          <label> Нас </label>
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            className="form-control"
            placeholder="Таны нас"
          />
        </div>
        <div className="form-group col-lg-6">
          <label> Хаяг </label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            className="form-control"
            placeholder="Гэрийн хаягаа оруулна уу"
          />
        </div>
        <div className="formInfoFooter">
          <button
            type="button"
            className="btn infoChange-btn"
            onClick={changeClick}
          >
            Мэдээллээ хадгалах
          </button>
        </div>
      </div>
    </div>
  );
};
