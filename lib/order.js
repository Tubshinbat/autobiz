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
