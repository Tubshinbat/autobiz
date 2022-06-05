import useSWR from "swr";

export const useRate = () => {
  let rate = [];
  const { data, error } = useSWR(`https://api.khanbank.com/v1/rates`);
  if (data) {
    rate = data;
  }

  return {
    data: rate,
    isLoading: !error && !rate,
    error,
  };
};
