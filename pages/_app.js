import Head from "next/head";
import Script from "next/script";
const isServer = typeof window === "undefined";
import { SWRConfig } from "swr";
const WOW = !isServer ? require("wow.js") : null;
import { useCookies } from "react-cookie";
import Router from "next/router";
import Nprogress from "nprogress";
import { CookiesProvider } from "react-cookie";

import TimeAgo from "javascript-time-ago";
import mn from "javascript-time-ago/locale/mn.json";
import ru from "javascript-time-ago/locale/ru.json";
TimeAgo.addDefaultLocale(mn);
TimeAgo.addLocale(ru);

import "react-image-gallery/styles/css/image-gallery.css";
import "nprogress/nprogress.css";
import "react-toastify/dist/ReactToastify.css";
import "styles/hovereffects.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "styles/globals.css";
import "animate.css";

import { useEffect } from "react";
import { UserStore } from "context/UserContext";
Router.onRouteChangeStart = (url) => {
  Nprogress.start();
};

Router.onRouteChangeComplete = (url) => {
  Nprogress.done();
};

Router.onRouteChangeError = (url) => {
  Nprogress.done();
};

function MyApp({ Component, pageProps }) {
  // const [cookies, setCookie, removeCookie] = useCookies(["language"]);
  useEffect(() => {
    new WOW().init();

    window.fbAsyncInit = function () {
      FB.init({
        xfbml: true,
        version: "v6.0",
      });
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  const fetcher = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      const error = new Error("An error occurred while fetching the data.");
      error.info = await res.json();
      error.status = res.status;
      throw error;
    }
    return res.json();
  };

  return (
    <>
      <SWRConfig
        value={{
          refreshInterval: 30000,
          fetcher,
          onError: (error, key) => {
            if (error.status !== 403 && error.status !== 404) {
              console.log(error);
            }
          },
        }}
      >
        <Head>
          <link rel="stylesheet" href="/fonts/fonts.css" />
          <link rel="stylesheet" href="/css/all.min.css" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          ></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          ></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          ></link>
          <Script
            src="https://unpkg.com/react/umd/react.production.min.js"
            crossorigin
          ></Script>

          <script
            src="https://unpkg.com/react/umd/react.production.min.js"
            crossorigin
          ></script>

          <script
            src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
            crossorigin
          ></script>

          <script
            src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
            crossorigin
          ></script>

          <Script src="/js/all.min.js" crossorigin />
        </Head>{" "}
        <div id="fb-root"></div>
        <div
          className="fb-customerchat"
          attribution="setup_tool"
          page_id="1527576727488967"
        ></div>
        <UserStore>
          <Component {...pageProps} />
        </UserStore>
      </SWRConfig>
    </>
  );
}

export default MyApp;
