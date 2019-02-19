import React from "react";
import spinner from "./spinner.gif";

// provides the spinner-gif that indicates loading of a page
export default () => {
  return (
    <div>
      <img
        src={spinner}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </div>
  );
};
