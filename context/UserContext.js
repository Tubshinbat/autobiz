import React, { useState } from "react";
import axios from "axios-base";
import { useCookies } from "react-cookie";
const UserContext = React.createContext();

const userState = {
  userData: null,
  userToken: null,
  userId: null,
  error: null,
  loading: false,
  success: null,
  price: null,
};

export const UserStore = (props) => {
  const [state, setState] = useState(userState);
  const [cookies, setCookie, removeCookie] = useCookies(["autobiztoken"]);

  const token = cookies.autobiztoken;

  const getPrice = (price) => {
    setState((bf) => ({ ...bf, price }));
  };

  const clear = () => {
    setState((bf) => ({
      ...bf,
      loading: false,
      error: null,
      success: null,
      price: null,
    }));
  };

  const allClear = () => {
    setState(() => userState);
  };

  const loadingStart = () => {
    setState((bf) => ({ ...bf, loading: true }));
  };

  const getUser = (token) => {
    loadingStart();
    axios
      .get(`users/userdata`, {
        withCredentials: true,
        headers: { Cookie: `autobiztoken=${token};` },
      })
      .then((res) => {
        setState((bfs) => ({
          ...bfs,
          loading: false,
          userData: res.data.data,
        }));
      })
      .catch((error) => {
        let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";
        if (error.message) {
          resError = error.message;
        }

        if (
          error.response !== undefined &&
          error.response.status !== undefined
        ) {
          resError = error.response.status;
        }
        if (
          error.response !== undefined &&
          error.response.data !== undefined &&
          error.response.data.error !== undefined
        ) {
          resError = error.response.data.error.message;
        }
        setState((bfs) => ({
          ...bfs,
          error: resError,
        }));
      });
    clear();
  };

  const loginUser = (data) => {
    loadingStart();
    axios
      .post("users/loginuser", data)
      .then((result) => {
        setState((bfs) => ({
          ...bfs,
          loading: false,
          userData: result.data.user,
          success: "Амжилттай нэвтэрлээ",
        }));
      })
      .catch((error) => {
        let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";
        if (error.message) {
          resError = error.message;
        }

        if (
          error.response !== undefined &&
          error.response.status !== undefined
        ) {
          resError = error.response.status;
        }
        if (
          error.response !== undefined &&
          error.response.data !== undefined &&
          error.response.data.error !== undefined
        ) {
          resError = error.response.data.error.message;
        }
        setState((bfs) => ({
          ...bfs,
          loading: false,
          error: resError,
        }));
      });
    clear();
  };

  const userRegister = async (formData) => {
    let data, resultError;

    await axios
      .post("users/register", formData)
      .then((result) => {
        data = result.data;
      })
      .catch((error) => {
        let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";

        if (error.message) {
          resError = error.message;
        }

        if (
          error.response !== undefined &&
          error.response.status !== undefined
        ) {
          resError = error.response.status;
        }
        if (
          error.response !== undefined &&
          error.response.data !== undefined &&
          error.response.data.error !== undefined
        ) {
          resError = error.response.data.error.message;
        }
        resultError = resError;
      });
  };

  const forgetPassword = async (email) => {
    let data = null;
    let resultError = null;

    await axios
      .post("/users/forgot-password", email)
      .then((result) => {
        data = result.data.message;
      })
      .catch((error) => {
        let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";

        if (error.message) {
          resError = error.message;
        }

        if (
          error.response !== undefined &&
          error.response.status !== undefined
        ) {
          resError = error.response.status;
        }
        if (
          error.response !== undefined &&
          error.response.data !== undefined &&
          error.response.data.error !== undefined
        ) {
          resError = error.response.data.error.message;
        }
        resultError = resError;
      });
  };

  const resetPassword = async (sendData) => {
    let data = null;
    let resultError = null;

    await axios
      .post("/users/reset-password", sendData)
      .then((result) => {
        data = result.data.user;
      })
      .catch((error) => {
        let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";

        if (error.message) {
          resError = error.message;
        }

        if (
          error.response !== undefined &&
          error.response.status !== undefined
        ) {
          resError = error.response.status;
        }
        if (
          error.response !== undefined &&
          error.response.data !== undefined &&
          error.response.data.error !== undefined
        ) {
          resError = error.response.data.error.message;
        }
        resultError = resError;
      });
  };

  return (
    <UserContext.Provider
      value={{ state, loginUser, getUser, allClear, clear, getPrice }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
