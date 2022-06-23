import axios from "axios-base";

export const getProduct = async (id) => {
  let product, error;

  await axios
    .get(`products/${id}`)
    .then((res) => {
      product = res.data.data;
    })
    .catch((error) => {
      error = error.status;
    });

  return { product, error };
};

export const getProducts = async (query) => {
  let products = [];
  let error;

  await axios
    .get(`products?${query}`)
    .then((res) => {
      products = res.data.data;
    })
    .catch((error) => {
      error = error.status;
    });

  return { products, error };
};
