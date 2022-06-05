import axios from "axios-base";

export const checkToken = async (token) => {
  let data;
  let name;
  let err = null;
  await axios
    .post("/users/checktoken", {
      headers: { Cookie: `autobiztoken=${token};` },
    })
    .then((res) => {
      data = res.data.userId;
      name = res.data.name;
    })
    .catch((error) => {
      err = error.status;
    });

  return { data, name, error: err };
};

export const getUser = async (token) => {
  let user = null;
  let err = null;
  await axios
    .get(`users/userdata`, {
      withCredentials: true,
      headers: { Cookie: `autobiztoken=${token};` },
    })
    .then((res) => {
      user = res.data.data;
    })
    .catch((error) => {
      err = error;
    });

  return { user, err };
};

export const changePassword = async (data, token) => {
  let user;
  let error;

  await axios
    .post(`users/userdata`, data)
    .then((res) => {
      user = res.data;
    })
    .catch((err) => {
      let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";

      if (err.message) {
        resError = err.message;
      }

      if (err.response !== undefined && err.response.status !== undefined) {
        resError = err.response.status;
      }
      if (
        err.response !== undefined &&
        err.response.data !== undefined &&
        err.response.data.error !== undefined
      ) {
        resError = err.response.data.error.message;
      }
      error = resError;
    });

  return { user, error };
};

export const updateUser = async (data) => {
  let user;
  let error;

  await axios
    .put(`users/userdata`, data)
    .then((res) => {
      user = res.data.data;
    })
    .catch((err) => {
      let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";

      if (err.message) {
        resError = err.message;
      }

      if (err.response !== undefined && err.response.status !== undefined) {
        resError = err.response.status;
      }
      if (
        err.response !== undefined &&
        err.response.data !== undefined &&
        err.response.data.error !== undefined
      ) {
        resError = err.response.data.error.message;
      }
      error = resError;
    });

  return { user, error };
};
