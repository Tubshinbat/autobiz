import { useGroupBeProduct } from "hooks/use-beproduct";

import Link from "next/link";
import { useEffect } from "react";

export default ({ active }) => {
  const { groups: marks } = useGroupBeProduct("mark_txt?limit=26");
  const { groups: types } = useGroupBeProduct("type_txt?limit=26");

  return (
    <div
      className={`homesides ${
        active !== "beproduct" ? "displayNone" : "displayBlock"
      }`}
    >
      <div className="side">
        <div className="sideTitle">Үйлдвэрлэгч</div>
        <ul className="makes">
          {marks &&
            marks.map((mark) => (
              <Link href={`/beproducts?make=${mark._id}`}>
                <li>
                  <div className="makeName">
                    <i
                      className={`icn-${
                        mark._id && mark._id.split(" ").join("").toLowerCase()
                      }`}
                    ></i>
                    {mark._id}
                  </div>
                  <span className="makeCount">{mark.count} </span>
                </li>
              </Link>
            ))}
        </ul>
      </div>
      <div className="side">
        <div className="sideTitle">Төрөл</div>
        <ul className="makes">
          {types &&
            types.map((type) => (
              <Link href={`/products?type_txt=${type._id}`}>
                <li>
                  <div className="makeName">{type._id}</div>
                  <span className="makeCount">{type.count} </span>
                </li>
              </Link>
            ))}
        </ul>
      </div>
    </div>
  );
};
