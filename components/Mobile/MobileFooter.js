import Link from "next/link";

export default () => {
  return (
    <div className="footer-mobile-menus">
      <div className="footerBtn">
        <Link href="/">
          <a>
            <i className="fa-solid fa-house"></i> <span>Нүүр</span>
          </a>
        </Link>
      </div>
      <div className="footerBtn">
        <Link href="/search">
          <a>
            <i className="fa-solid fa-magnifying-glass"></i> <span>Хайлт </span>
          </a>
        </Link>
      </div>
      <div className="footerBtn">
        <Link href="/userprofile/orders">
          <a>
            <i className="fa-solid fa-file-invoice"></i> <span> Захиалга </span>
          </a>
        </Link>
      </div>
      <div className="footerBtn">
        <Link href="/userprofile">
          <a>
            <i className="fa-solid fa-user"></i> <span> Профайл </span>
          </a>
        </Link>
      </div>
    </div>
  );
};
