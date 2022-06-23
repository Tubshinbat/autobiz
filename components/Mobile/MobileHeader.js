import { useInfo } from "hooks/use-info";
import base from "lib/base";
import Link from "next/link";
import { useMenus, useSocials } from "hooks/use-links";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default ({ text, page = false }) => {
  const { menus } = useMenus();
  const { info } = useInfo();
  const [dataMenus, setDataMenus] = useState([]);
  const { socialLinks } = useSocials();
  const router = useRouter();
  const [active, setActive] = useState(false);

  const backGo = () => {
    router.back();
  };

  useEffect(() => {
    if (menus) {
      setDataMenus(menus.data);
    }
  }, [menus]);

  const handleToggle = () => {
    setActive((ba) => {
      if (ba === true) return false;
      else return true;
    });
  };

  const renderMenu = (categories) => {
    let myCategories = [];
    categories &&
      categories.map((el) => {
        myCategories.push(
          <li key={el._id}>
            {!el.isDirect && !el.model && (
              <Link href={`/p/${el.slug}`}>
                <a>{el.name}</a>
              </Link>
            )}
            {el.isDirect && (
              <a href={el.direct} target="_blank">
                {el.name}
              </a>
            )}
            {el.model && (
              <Link href={`/${el.model}`}>
                <a>{el.name}</a>
              </Link>
            )}
          </li>
        );
      });

    return myCategories;
  };

  return (
    <>
      <div className={`mobileHeader `}>
        <div
          className={`back-button  ${
            page === true ? "displayBlock" : "displayNone"
          }`}
          onClick={backGo}
        >
          <i className="fa-solid fa-arrow-left"></i>
        </div>
        <div className="mid">
          {text ? (
            text
          ) : (
            <Link href="/">
              <img src={`${base.cdnUrl}/${info.logo}`} className="mobileLogo" />
            </Link>
          )}
        </div>
        <div className="burger-menu" onClick={handleToggle}>
          <span className="line"> </span>
          <span className="line"> </span>
          <span className="line"> </span>
        </div>
      </div>
      <div
        className={`menuMobile  ${
          active === true ? "displayBlock" : "displayNone"
        }`}
      >
        <h5>
          <i className="fa-solid fa-xmark" onClick={handleToggle}></i> Үндсэн
          цэс
        </h5>
        <ul>
          {renderMenu(dataMenus)}
          <li>
            <Link href="/lend">
              <a>Зээлийн тооцоолуур</a>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <a>Холбоо барих</a>
            </Link>
          </li>
        </ul>
        <div className="contactMobile">
          <li>
            <a href={`tel:${info.phone}`}> Утас: {info.phone} </a>
          </li>
          <li>
            <a href={`mailto:${info.email}`}> Имэйл: {info.email} </a>
          </li>
          <li>Хаяг: {info.address}</li>
        </div>
        <div className="socialMobile">
          {socialLinks &&
            socialLinks.map((el) => (
              <a href={el.link} key={`${el._id}-som`} target="_blank">
                <i
                  className={`fa-brands fa-${el.name.toLowerCase()}-square`}
                ></i>
              </a>
            ))}
        </div>
      </div>
      <div
        className={`menuMobile-bg ${
          active === true ? "displayBlock" : "displayNone"
        }`}
        onClick={handleToggle}
      ></div>
    </>
  );
};
