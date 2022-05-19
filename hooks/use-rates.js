export const useRate = async () => {
  let data = [];
  let error;
  await axios
    .get("https://api.khanbank.com/v1/rates")
    .then((res) => {
      data = res;
    })
    .catch((err) => {
      error = err.status;
    });

  return {
    data,
    error,
  };
};
