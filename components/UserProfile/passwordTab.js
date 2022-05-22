import { minLength, requiredCheck } from "lib/inputRegex";

import { toastControl } from "lib/toastControl";
import { changePassword, updateUser } from "lib/user";
import { useEffect, useState } from "react";

export default ({ active, user }) => {
  const [form, setForm] = useState({});

  const timer = (ms) => new Promise((res) => setTimeout(res, ms));
  const [errors, setErrors] = useState({
    password: false,
    confPassword: false,
  });

  //CHECK FORM FUNCTION
  const checkName = (el, name) => {
    return name === el;
  };

  const checkForm = (name, val) => {
    const valueErrors = Object.keys(errors);
    let result;
    if (valueErrors.find((el) => checkName(el, name))) {
      result = requiredCheck(val);

      if (name === "password" && result === true) {
        result = minLength(val, 8);
      }

      if (name === "confPassword" && result === true) {
        if (form.password === val) {
          result = true;
        } else result = "Нууц үг адилхан биш байна!";
      }
    }
    setErrors((bfError) => ({ ...bfError, [name]: result }));
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
    console.log("end");
    if (allCheck()) {
      const { user, error } = await changePassword(form);
      console.log(user);
      if (user !== undefined) {
        toastControl("success", "Нууц үг шинэчлэгдлээ");
        timer(1500);
      }
      if (error) toastControl("error", error);
    } else toastControl("error", "Талбаруудыг бөглөнө үү");
  };

  return (
    <div
      className={`userFormProfile ${
        active === "password" ? "displayBlock" : "displayNone"
      }`}
    >
      <div className="row">
        <div className="form-group col-lg-12">
          <label> Нууц үг * </label>
          <input
            type="password"
            name="password"
            className={`form-control ${errors.password === true && "is-valid"}`}
            onChange={handleChange}
            placeholder="Шинэ нууц үгээ оруулна уу"
          />
          <p className="contactError"> {errors.password} </p>
        </div>
        <div className="form-group col-lg-12">
          <label> Нууц үгээ баталгаажуулах * </label>
          <input
            type="password"
            name="confPassword"
            onChange={handleChange}
            className={`form-control ${
              errors.confPassword === true && "is-valid"
            }`}
            placeholder="Нууц үгээ баталгаажуулана уу "
          />
          <p className="contactError"> {errors.confPassword} </p>
        </div>

        <div className="formInfoFooter">
          <button
            type="button"
            className="btn infoChange-btn"
            onClick={changeClick}
          >
            Нууц үгээ шинэчлэх
          </button>
        </div>
      </div>
    </div>
  );
};
