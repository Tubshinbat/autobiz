import base from "lib/base";
import useSWR from "swr";

export const useInfo = () => {
  const { data, error } = useSWR(`${base.apiUrl}/webinfo`);

  let info = {};
  if (data) {
    info = data.data;
  }

  return {
    info,
    isLoading: !error && !data,
    error,
  };
};
