import axios from "axios-base";

export const createOrder = async (data) => {
  let order;
  let error;
  await axios
    .post("orders", data)
    .then((res) => {
      order = res.data;
    })
    .catch((err) => {
      error = err.status;
    });

  return {
    order,
    error,
  };
};

export const createBeOrder = async (data) => {
  let order;
  let error;
  await axios
    .post("beorders", data)
    .then((res) => {
      order = res.data;
    })
    .catch((err) => {
      error = err.status;
    });

  return {
    order,
    error,
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
    .get(`beproducts/user`, {
      withCredentials: true,
      headers: { Cookie: `autobiztoken=${token};` },
    })
    .then((res) => {
      orders = res.data.data;
    });

  return orders;
};
