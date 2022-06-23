import base from "lib/base";
import useSWR from "swr";
import axios from "axios";

export const useUser = (token) => {
  let userInfo;

  const fetcher = (url) =>
    axios
      .get(url, {
        headers: { Cookie: `autobiztoken=${token};` },
      })
      .then((res) => res.data);

  const { data } = useSWR(`${base.apiUrl}/users/userdata`, fetcher);

  if (data) userInfo = data.data;

  return { userInfo };
};
