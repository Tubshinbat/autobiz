import axios from "axios-base";

export const checkToken = async (token) => {
  let data;
  let name;
  let err = null;
  await axios
    .post("/users/checktoken", token)
    .then((res) => {
      data = res.data.userId;
      name = res.data.name;
    })
    .catch((error) => {
      err = error.status;
    });

  return { data, name, error: err };
};

export const getUser = async (id, token) => {
  let user;

  await axios.post(`/users/userdata/${id}`, { token: token }).then((res) => {
    user = res.data;
  });

  return { user };
};
