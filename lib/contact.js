import axios from "axios-base";

export const sendData = async (data) => {
  let success = null;
  let error = null;
  await axios
    .post("contacts", data)
    .then((res) => (success = "Таны санал хүсэлтийг хүлээн авлаа"))
    .catch((err) => (error = err.status));

  return { success, error };
};
