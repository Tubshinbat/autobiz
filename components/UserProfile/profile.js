import {
  maxLength,
  minLength,
  onlyNumber,
  requiredCheck,
} from "lib/inputRegex";

import { toastControl } from "lib/toastControl";
import { updateUser } from "lib/user";
import { useEffect, useState } from "react";

export default ({ active, user }) => {
  const [form, setForm] = useState({});

  const timer = (ms) => new Promise((res) => setTimeout(res, ms));
  const [errors, setErrors] = useState({
    firstname: false,
    lastname: false,
    phone: false,
  });

  useEffect(() => {
    if (user) {
      setForm(user);
      allCheck();
    }
  }, [user]);

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
      setErrors((bfError) => ({ ...bfError, [name]: result }));
      if (name === "phone" && result === true) {
        result = minLength(val, 8);
        if (result === true) result = maxLength(val, 8);
      }
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
