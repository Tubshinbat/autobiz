import { useInfo } from "hooks/use-info";
import base from "lib/base";
import React from "react";

const Spinner = (props) => {
  const { info } = useInfo();
  return (
    <div className="fullSpinner">
      <div class="loader"> </div>
    </div>
  );
};

export default Spinner;
