import base from "lib/base";
import useSWR from "swr";

export const useCarcolors = (query) => {
  let colors = [];
  const { data, error } = useSWR(`${base.apiUrl}/carcolors?${query}`);
  if (data) colors = data.data;

  return {
    colors,
    isLoading: !error && !data,
    error,
  };
};

export const useCarIndustries = (query) => {
  let industries = [];
  let products = [];
  const { data, error } = useSWR(`${base.apiUrl}/carindustrys?${query}`);

  if (data) {
    products = data.products;
    industries = data.data;
  }

  return {
    industries,
    isLoading: !error && !data,
    products,
    error,
  };
};

export const useCarzagvars = (query) => {
  let zagvars = [];
  const { data, error } = useSWR(`${base.apiUrl}/carzagvars?${query}`);

  if (data) zagvars = data.data;

  return {
    zagvars,
    isLoading: !error && !data,
    error,
  };
};

export const useCartypes = (query) => {
  let types = [];
  let countTypes = [];
  const { data, error, products } = useSWR(`${base.apiUrl}/cartypes?${query}`);

  if (data) {
    types = data.data;
    countTypes = data.products;
  }

  return {
    types,
    isLoading: !error && !data,
    error,
    countTypes,
  };
};
