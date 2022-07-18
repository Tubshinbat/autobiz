import axios from "axios-base";

export const getBanners = async () => {
  let banners = [];
  let err = null;
  await axios
    .get("banners?status=true")
    .then((res) => {
      banners = res.data.data;
    })
    .catch((error) => {
      err = error.status;
    });

  return { banners: banners[0], error: err };
};
