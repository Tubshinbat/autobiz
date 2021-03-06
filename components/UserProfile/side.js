import base from "lib/base";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
export default ({ user }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["autobiztoken"]);
  const router = useRouter();
  const logout = () => {
    removeCookie("autobiztoken");
    router.reload(window.location.pathname);
  };

  return (
    <div className="userInfoBox">
      <div className="userInfo">
        <div className="userPhoto">
          {user.image ? (
            <img src={`${base.cdnUrl}/${user.image}`} />
          ) : (
            <img src={`/images/no-avatar.png`} />
          )}
        </div>
        <div className="greetings">
          <h6>
            {user.lastname} {user.firstname}
          </h6>
          <h5>{user.email}</h5>
        </div>
        <div className="store-credit">
          <h5>таны хэтэвч</h5>
          <h4>{new Intl.NumberFormat().format(user.wallet)} ₮</h4>
        </div>
      </div>
      <ul className="userMenu">
        <li className="">
          <Link href="/userprofile/profile">
            <a aria-label="Personal Info" href="/account/profile">
              Хувийн мэдээлэл
            </a>
          </Link>
        </li>
        <li className>
          <Link href="/userprofile/orders">
            <a aria-label="Orders">Ачигдахад бэлэн</a>
          </Link>
          {/* <span className="count">0</span> */}
        </li>

        <li className>
          <Link href="/userprofile/purchasies">
            <a aria-label="Orders">Бэлэн машин </a>
          </Link>
          {/* <span className="count">0</span> */}
        </li>

        <li className>
          <a href="#" aria-label="Orders">
            Дуудлага худалдаа
          </a>

          {/* <span className="count">0</span> */}
        </li>

        <li className="logout">
          <button type="button" onClick={logout}>
            Гарах
          </button>
        </li>
      </ul>
    </div>
  );
};
