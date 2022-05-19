import base from "lib/base";
import useSWR from "swr";
import axios from "axios";

export const useUser = (token) => {
  let userInfo;

  const fetcher = (url) =>
    axios.post(url, { autobiztoken: token }).then((res) => res.data);

  const { data } = useSWR(`${base.apiUrl}/users/localuser`, fetcher);

  if (data) userInfo = data;

  return { userInfo };
};
