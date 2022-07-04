import base from "lib/base";
import useSWR from "swr";

export const useProducts = (slug) => {
  const products = null;
  let pagination = null;
  const { data, error } = useSWR(`${base.apiUrl}/products?${slug}`);
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

export const useGetProduct = (id, init) => {
  const product = {};

  const { data, error } = useSWR(`${base.apiUrl}/products/${id}`, {
    initialData: init,
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

export const useGroupProduct = (group) => {
  const groupData = [];
  const { data, error } = useSWR(`${base.apiUrl}/products/group/${group}`);
  if (data) groupData = data.data;

  return {
    groupData,
    isLoading: !error && !data,
    error,
  };
};
