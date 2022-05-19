import axios from "axios-base";

export const getNews = async (query) => {
  let data = [];
  let error = null;
  let pagination = null;
  await axios
    .get("news?" + query)
    .then((res) => {
      data = res.data.data;
      pagination = res.data.pagination;
    })
    .catch((err) => {
      error = err.status;
    });

  return { news: data, error, pagination };
};

export const getSlug = async (slug) => {
  let news;
  let error = null;
  news = await axios
    .get(`news/s/${slug}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      error = err.status;
    });

  return { news, error };
};

export const getNewsMenus = async (query) => {
  let menus = [];
  let error = null;
  await axios
    .get("news-categories?" + query)
    .then((res) => {
      menus = res.data.data;
    })
    .catch((err) => {
      error = err.status;
    });

  return { menus, error };
};

export const updateView = async (slug) => {
  let data = {};
  let error;
  await axios
    .get(`news/view/${slug}`)
    .then((res) => {
      data = res.data.data;
    })
    .catch((err) => {
      error = err.status;
    });

  return { views: data, error };
};
