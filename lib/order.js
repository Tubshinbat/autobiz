import axios from "axios-base";

export const getOrder = async (token) => {
  let data = [];
  let error;
  await axios
    .get("https://api.khanbank.com/v1/rates")
    .then((res) => {
      data = res.data;
    })
    .catch((err) => {
      error = err.status;
    });

  return {
    data,
    error,
  };
};
