import axios from "axios-base";

export const createOrder = async (data) => {
  let order;
  let err;
  await axios
    .post("orders", data)
    .then((res) => {
      order = res.data;
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
      err = resError;
    });

  return {
    order,
    error: err,
  };
};

export const createBeOrder = async (data) => {
  let order;
  let err;
  await axios
    .post("beorders", data)
    .then((res) => {
      order = res.data;
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
      err = resError;
    });

  return {
    order,
    error: err,
  };
};

export const getOrders = async (token) => {
  let orders = [];

  await axios
    .get(`orders/user`, {
      withCredentials: true,
      headers: { Cookie: `autobiztoken=${token};` },
    })
    .then((res) => {
      orders = res.data.data;
    });

  return orders;
};

export const getBeOrders = async (token) => {
  let orders = [];

  await axios
    .get(`beorders/user`, {
      withCredentials: true,
      headers: { Cookie: `autobiztoken=${token};` },
    })
    .then((res) => {
      orders = res.data.data;
    });

  return orders;
};
