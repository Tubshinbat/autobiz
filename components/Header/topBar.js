import { useEffect, useState } from "react";
import { getRate } from "lib/rate";
import { useSocials } from "hooks/use-links";
import { useInfo } from "hooks/use-info";

const TopBar = () => {
  const [usd, setUsd] = useState("");
  const [jpy, setJpy] = useState("");
  const { socialLinks } = useSocials();
  const { info } = useInfo();

  useEffect(async () => {
    const { data } = await getRate();
    const usdIndex = await data.findIndex((x) => x.number === 1);
    const jpyIndex = await data.findIndex((x) => x.number === 3);
    if (data) {
      setUsd(
        data[usdIndex] &&
          data[usdIndex].cashSellRate &&
          data[usdIndex].cashSellRate
      );
      setJpy(
        data[jpyIndex] &&
          data[jpyIndex].cashSellRate &&
          data[jpyIndex].cashSellRate
      );
    }
  }, []);

  return (
    <div className="topbar">
      <div className="container">
        <div className="topbarContainer">
          <div className="topRate">
            Өнөөдрийн ханш: <b>¥ {jpy}</b>
          </div>
          <div className="topContact">
            <div className="topSocials">
              {socialLinks &&
                socialLinks.map((el) => (
                  <a href={el.link} target="_blank" key={el._id + "social"}>
                    <i class={`fa-brands fa-${el.name.toLowerCase()}`}></i>
                  </a>
                ))}
            </div>
            <div className="topLinks">
              <a href={`tel:${info.phone}`}>
                <i class="fa-solid fa-phone"></i>
                {info.phone}
              </a>
              <a href={`mailto:${info.email}`}>
                <i class="fa-solid fa-envelope"></i>
                {info.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
