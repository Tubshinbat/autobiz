import base from "lib/base";
import useSWR from "swr";

export const usePage = (slug) => {
  const { data, error } = useSWR(`${base.apiUrl}/pages/slug/${slug}`);
  return {
    page: data,
    isLoading: !error && !data,
    error,
  };
};
