import base from "lib/base";
import useSWR from "swr";

export const useHybrids = (query) => {
  const { data, error } = useSWR(`${base.apiUrl}/hybrids?${query}`);

  let hybrid = [];
  if (data) {
    hybrid = data.data;
  }

  return {
    hybrid,
    isLoading: !error && !data,
    error,
  };
};

export const useFree = (query) => {
  const { data, error } = useSWR(`${base.apiUrl}/freemods?${query}`);

  let free = [];
  if (data) {
    free = data.data;
  }

  return {
    free,
    isLoading: !error && !data,
    error,
  };
};
