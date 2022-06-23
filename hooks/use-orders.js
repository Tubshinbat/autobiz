import axios from "axios";
import base from "lib/base";
import useSWR from "swr";

export const useBeOrders = (slug, token, initOrder) => {
  let orders = null;
  let pagination = null;

  const fetcher = (url) =>
    axios.get(url, {
      withCredentials: true,
      headers: { Cookie: `autobiztoken=${token};` },
    });

  const { data, error } = useSWR(
    `${base.apiUrl}/beorders/user?${slug}`,
    fetcher,
    {
      initialData: initOrder,
    }
  );

  if (data) {
    orders = data.data.data;
    pagination = data.data.pagination;
  }

  return {
    data,
    orders,
    isLoading: !error && !data,
    error,
    pagination,
  };
};

export const useOrders = (slug, token, initOrder) => {
  let orders = null;
  let pagination = null;

  const fetcher = (url) =>
    axios.get(url, {
      withCredentials: true,
      headers: { Cookie: `autobiztoken=${token};` },
    });

  const { data, error } = useSWR(
    `${base.apiUrl}/orders/user?${slug}`,
    fetcher,
    {
      initialData: initOrder,
    }
  );

  if (data) {
    orders = data.data.data;
    pagination = data.data.pagination;
  }

  return {
    data,
    orders,
    isLoading: !error && !data,
    error,
    pagination,
  };
};
