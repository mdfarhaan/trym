import React, { useState } from "react";
import classes from "./CodePage.module.css";
import { constant } from "../../utils/constants";

function RandomLink() {
  const [code, setCode] = useState("");

  return (
    <>
      <div className={classes.header}>
        <a href="/" className={classes.title}>
          TRYM
        </a>
      </div>
      <div className={classes.body}>
        <h1 className={classes.phrase}>Enter your Code</h1>
        <div className={classes.inputBox}>
          <input
            required
            className={classes.codeInput}
            type="text"
            placeholder="Code"
            onChange={(e) => setCode(e.target.value)}
          />
          <button
            type="submit"
            className={classes.inputBtn}
            onClick={() => (window.location.href = `${constant.Domain}${code}`)}
          >
            Visit
          </button>
        </div>
      </div>
    </>
  );
}

export default RandomLink;
