import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import base from "lib/base";
import { useCookies } from "react-cookie";

import { useMenus } from "hooks/use-links";
import { useInfo } from "hooks/use-info";

import { useUser } from "hooks/use-user";
import MobileHeader from "components/Mobile/MobileHeader";

const Header = ({ page, text }) => {
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
      } else {
        header.classList.remove(`headerSticky`);
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
              <ul className="headerMenu">{renderMenu(dataMenus)}</ul>
            </div>
            <div className="headerButtons">
              {userInfo ? (
                <Link href="/login">
                  <div className="headerBottom">
                    <div className="BottomIcon">
                      <i class="fa-regular fa-user"></i>
                    </div>
                    <div className="BottomText">
                      {(userInfo.phone && userInfo.phone) || userInfo.email}
                    </div>
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
      <MobileHeader page={page} text={text} />
    </>
  );
};

export default Header;
