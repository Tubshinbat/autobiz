import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import base from "lib/base";
import { useCookies } from "react-cookie";

import { useMenus } from "hooks/use-links";
import { useInfo } from "hooks/use-info";
import { checkToken } from "lib/token";
import { useUser } from "hooks/use-user";
import MobileHeader from "components/Mobile/MobileHeader";

const Header = () => {
  const [dataMenus, setDataMenus] = useState([]);
  const { info } = useInfo();
  const { menus } = useMenus();
  const router = useRouter();
  const [type, setType] = useState("products");
  const [searchText, setSearchText] = useState("");
  const [cookies] = useCookies(["autobiztoken"]);

  const { userInfo } = useUser(cookies.autobiztoken);

  useEffect(() => {
    if (menus) {
      setDataMenus(menus.data);
    }
  }, [menus]);

  useEffect(() => {
    window.onscroll = () => {
      let header = document.querySelector(".mainHeader");
      let sticky = header.offsetTop;
      if (window.pageYOffset > sticky) {
        header.classList.add(`headerSticky`);
        header.classList.add("animate__animated");
        header.classList.add("animate__slideInDown");
        header.classList.add("animate__delay-0.2s");
      } else {
        header.classList.remove(`headerSticky`);
        header.classList.remove("animate__animated");
        header.classList.remove("animate__slideInDown");
        header.classList.remove("animate__delay-0.2s");
      }
    };
  }, []);

  //FUNCTION

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "type") setType(value);
    if (name === "searchText") setSearchText(value);
  };

  const handleSearch = () => {
    router.push(`/${type}?title=${searchText}`);
  };

  return (
    <>
      <header className="mainHeader">
        <div className="container">
          <div className="headerContainer">
            <div className="headerLogo">
              {info.logo && (
                <Link href="/">
                  <img src={`${base.cdnUrl}/${info.logo}`} />
                </Link>
              )}
            </div>
            <div className="headerMid">
              <div className="searchBox">
                <select name="type" onChange={handleChange} value={type}>
                  <option value="products">Бэлэн байгаа</option>
                  <option value="beproducts"> Ачигдахад бэлэн </option>
                </select>
                <input
                  type="text"
                  name="searchText"
                  onChange={handleChange}
                  value={searchText}
                  placeholder="Эндээс машинаа хайна уу"
                />
                <button onClick={handleSearch}>
                  <i class="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
              <ul className="headerMenu">{renderMenu(dataMenus)}</ul>
            </div>
            <div className="headerButtons">
              {userInfo && userInfo.phone ? (
                <Link href="/login">
                  <div className="headerBottom">
                    <div className="BottomIcon">
                      <i class="fa-regular fa-user"></i>
                    </div>
                    <div className="BottomText">{userInfo.phone}</div>
                  </div>
                </Link>
              ) : (
                <Link href="/login">
                  <div className="headerBottom">
                    <div className="BottomIcon">
                      <i class="fa-regular fa-user"></i>
                    </div>
                    <div className="BottomText">Нэвтрэх</div>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
      <MobileHeader />
    </>
  );
};

export default Header;
