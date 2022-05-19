import axios from "axios-base";

export const checkToken = async (token) => {
  let data;
  let name;
  let err = null;
  await axios
    .post("users/checktoken", {
      headers: { Authorization: "Bearer " + token },
    })
    .then((res) => {
      data = res.data.userId;
      name = res.data.name;
    })
    .catch((error) => {
      err = error.status;
    });

  return { data, name, error: err };
};
