import axios from "axios-base";

export const checkToken = async (token) => {
  let data;
  let name;
  let err = null;
  await axios
    .post("users/checktoken", "", {
      headers: { Cookie: `autobiztoken=${token}` },
    })
    .then((res) => {
      data = res.data.userId;
      name = res.data.name;
    })
    .catch((error) => {
      let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";

      if (error.message) {
        resError = error.message;
      }

      if (error.response !== undefined && error.response.status !== undefined) {
        resError = error.response.status;
      }
      if (
        error.response !== undefined &&
        error.response.data !== undefined &&
        error.response.data.error !== undefined
      ) {
        resError = error.response.data.error.message;
      }
      err = resError;
    });

  return { data, name, error: err };
};
