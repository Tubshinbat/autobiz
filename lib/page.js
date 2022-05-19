import axios from "axios-base";

export const getEmployees = async (ids) => {
  let employees, error;
  employees = [];
  await axios
    .get(`employees?status=true&limit=20&positionId=${ids}`)
    .then((res) => {
      employees = res.data.data;
    })
    .catch((error) => {
      error = error.status;
    });

  return { employees, error };
};

export const getPage = async (id) => {
  let page = {};
  let error = null;
  await axios
    .get("pages/menu/" + id)
    .then((res) => {
      page = res.data.data;
    })
    .catch((error) => {
      error = error.status;
    });

  return { page, error };
};

export const getPages = async (query) => {
  let pages = [];
  let error = null;
  await axios
    .get(`pages?${query}`)
    .then((res) => {
      pages = res.data.data;
    })
    .catch((error) => {
      error = error.status;
    });
  return { pages, error };
};

export const getFooterPage = async (id) => {
  let page = {};
  let error = null;
  await axios
    .get("pages/footermenu/" + id)
    .then((res) => {
      page = res.data.data;
    })
    .catch((error) => {
      error = error.status;
    });

  return { page, error };
};
