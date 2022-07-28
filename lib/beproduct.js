import axios from "axios-base";

export const getBeProduct = async (id) => {
  let product, error;

  await axios
    .get(`beproducts/${id}`)
    .then((res) => {
      product = res.data.data;
    })
    .catch((error) => {
      error = error.status;
    });

  return { product, error };
};

export const getHomeCar = async (id) => {
  let car, error;

  await axios
    .get(`beproducts/homeone?id=${id}`)
    .then((res) => {
      car = res.data.data;
    })
    .catch((error) => {
      error = error.status;
    });

  return { car, error };
};

export const getBeProducts = async (query) => {
  let products = [];
  let error;

  await axios
    .get(`beproducts?${query}`)
    .then((res) => {
      products = res.data.data;
    })
    .catch((error) => {
      error = error.status;
    });

  return { products, error };
};
