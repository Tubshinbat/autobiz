import base from "lib/base";
import useSWR from "swr";

export const useTopNews = () => {
  const { data, error } = useSWR(
    `${base.apiUrl}/news?status=true&star=true&limit=6`
  );

  let topNews = [];
  if (data) {
    topNews = data.data;
  }

  return {
    topNews,
    isLoading: !error && !data,
    error,
  };
};

export const useNews = (init, slug) => {
  let news = [];
  const { data, error } = useSWR(`${base.apiUrl}/news?${slug}`);

  if (data) {
    news = data.data;
  }
  return {
    news,
    isLoading: !error && !data,
    error,
  };
};

export const useNewNews = (query) => {
  const { data, error } = useSWR(`${base.apiUrl}/news?${query}`);

  let news = [];
  if (data) {
    news = data.data;
  }

  return {
    news,
    isLoading: !error && !data,
    error,
  };
};
