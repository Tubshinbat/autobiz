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

export const getBeProducts = async (query) => {
  let products, error;

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
