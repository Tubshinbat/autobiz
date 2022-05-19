import base from "lib/base";
import useSWR from "swr";

export const useBanners = () => {
  const { data, error } = useSWR(`${base.apiUrl}/banners?status=true`);

  let banners = [];
  if (data) {
    banners = data.data;
  }

  return {
    banners,
    isLoading: !error && !data,
    error,
  };
};
