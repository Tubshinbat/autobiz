import base from "lib/base";
import useSWR from "swr";

export const useMenus = () => {
  const { data, error } = useSWR(
    `${base.apiUrl}/menu?status=true&sort={position: -1}`
  );

  let menus = [];

  return {
    menus: data,
    isLoading: !error && !data,
    error,
  };
};

export const useFooterMenu = () => {
  const { data, error } = useSWR(`${base.apiUrl}/footermenu?status=true`);

  let menus = [];
  if (data) {
    menus = data.data;
  }

  return {
    menus,
    isLoading: !error && !data,
    error,
  };
};
