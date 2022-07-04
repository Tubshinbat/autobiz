import base from "lib/base";
import useSWR from "swr";

export const useBeproducts = (slug) => {
  const products = null;
  let pagination = null;
  const { data, error } = useSWR(`${base.apiUrl}/beproducts?${slug}`);
  if (data) {
    products = data.data;
    pagination = data.pagination;
  }

  return {
    products,
    isLoading: !error && !data,
    error,
    pagination,
  };
};

export const useGetBeProduct = (id, product) => {
  const product = {};

  const { data, error } = useSWR(`${base.apiUrl}/beproducts/${id}`, {
    initialData: product,
  });

  if (data) {
    product = data.data;
  }

  return {
    product,
    isLoading: !error && !data,
    error,
  };
};

export const useGroupBeProduct = (group) => {
  let result = [];

  const { data, error } = useSWR(`${base.apiUrl}/beproducts/group/${group}`);
  if (data) {
    result = data.data;
  }

  return {
    groups: result,
    isLoading: !error && !data,
    error,
  };
};

export const useGroupFilterBeProduct = (query) => {
  let result = [];

  const { data, error } = useSWR(
    `${base.apiUrl}/beproducts/groupfilter?${query}`
  );
  if (data) {
    result = data.data;
  }

  return {
    filterGroups: result,
    isLoading: !error && !data,
    error,
  };
};
