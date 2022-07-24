export const useCal = (slug) => {
  const prices = null;
  let pagination = null;
  const { data, error } = useSWR(`${base.apiUrl}/prices?${slug}`);
  if (data) {
    prices = data.data;
  }

  return {
    prices,
    isLoading: !error && !data,
    error,
  };
};
