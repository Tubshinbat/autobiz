import base from "lib/base";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
export default ({ user }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["autobiztoken"]);
  const router = useRouter();
  const logout = () => {
    removeCookie("autobiztoken");
    router.push("/");
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
            <a aria-label="Orders">Миний захиалгууд</a>
          </Link>
          {/* <span className="count">0</span> */}
        </li>

        <li className>
          <Link href="/userprofile/purchasies">
            <a aria-label="Orders">Худалдан авалт</a>
          </Link>
          {/* <span className="count">0</span> */}
        </li>

        <li className>
          <Link href="/userprofile/wallet">
            <a aria-label="Wallet">Хэтэвч</a>
          </Link>
          <span className="count">
            {new Intl.NumberFormat().format(user.wallet)} ₮
          </span>
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
