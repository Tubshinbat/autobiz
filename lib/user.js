import axios from "axios-base";

export const checkToken = async (token) => {
  let data;
  let name;
  let err = null;
  await axios
    .post("/users/checktoken", token)
    .then((res) => {
      data = res.data.userId;
      name = res.data.name;
    })
    .catch((error) => {
      err = error.status;
    });

  return { data, name, error: err };
};

export const getUser = async () => {
  let user;

  await axios.get(`users/userdata`).then((res) => {
    user = res.data.data;
  });

  return user;
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
