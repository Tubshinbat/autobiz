import axios from "axios-base";

export const loginUser = async (formData) => {
  let data, resultError;

  await axios
    .post("users/loginuser", formData)
    .then((result) => {
      data = result.data;
    })
    .catch((error) => {
      let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";

      if (error.message) {
        resError = error.message;
      }

      if (error.response !== undefined && error.response.status !== undefined) {
        resError = error.response.status;
      }
      if (
        error.response !== undefined &&
        error.response.data !== undefined &&
        error.response.data.error !== undefined
      ) {
        resError = error.response.data.error.message;
      }
      resultError = resError;
    });

  return {
    data,
    isLoading: !resultError && !data,
    error: resultError,
  };
};

export const userRegister = async (formData) => {
  let data, resultError;

  await axios
    .post("users/register", formData)
    .then((result) => {
      data = result.data;
    })
    .catch((error) => {
      let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";

      if (error.message) {
        resError = error.message;
      }

      if (error.response !== undefined && error.response.status !== undefined) {
        resError = error.response.status;
      }
      if (
        error.response !== undefined &&
        error.response.data !== undefined &&
        error.response.data.error !== undefined
      ) {
        resError = error.response.data.error.message;
      }
      resultError = resError;
    });

  return {
    data,
    isLoading: !resultError && !data,
    error: resultError,
  };
};

export const forgetPassword = async (email) => {
  let data = null;
  let resultError = null;

  await axios
    .post("/users/forgot-password", email)
    .then((result) => {
      data = result.data.message;
    })
    .catch((error) => {
      let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";

      if (error.message) {
        resError = error.message;
      }

      if (error.response !== undefined && error.response.status !== undefined) {
        resError = error.response.status;
      }
      if (
        error.response !== undefined &&
        error.response.data !== undefined &&
        error.response.data.error !== undefined
      ) {
        resError = error.response.data.error.message;
      }
      resultError = resError;
    });

  return {
    data,
    isLoading: !resultError && !data,
    error: resultError,
  };
};

export const resetPassword = async (sendData) => {
  let data = null;
  let resultError = null;

  await axios
    .post("/users/reset-password", sendData)
    .then((result) => {
      data = result.data.user;
    })
    .catch((error) => {
      let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";

      if (error.message) {
        resError = error.message;
      }

      if (error.response !== undefined && error.response.status !== undefined) {
        resError = error.response.status;
      }
      if (
        error.response !== undefined &&
        error.response.data !== undefined &&
        error.response.data.error !== undefined
      ) {
        resError = error.response.data.error.message;
      }
      resultError = resError;
    });

  return {
    data,
    isLoading: !resultError && !data,
    error: resultError,
  };
};
