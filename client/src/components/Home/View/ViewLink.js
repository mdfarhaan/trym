import React, { useState } from "react";
import classes from "./ViewLink.module.css";
import Modal from "../../Modal/Modal";
import { constant } from "../../../utils/constants";

function ViewLink(props) {
  const [msg, setMsg] = useState(false);

  const copyText = () => {
    setMsg(!msg);
    navigator.clipboard.writeText(constant.Domain + props.code);
  };

  return (
    <>
      <h1 className={classes.phrase}>Your URL!</h1>
      <div className={classes.box}>
        <p className={classes.urlPhrase}>{constant.Domain + props.code}</p>
        <button type="submit" className={classes.copyBtn} onClick={copyText}>
          copy
        </button>
      </div>

      {msg && (
        <div className={classes.msgContainer}>
          <center>
            <Modal msg="URL copied to clipboard" />
            {setTimeout(() => {
              setMsg(!msg);
            }, 2500)}
          </center>
        </div>
      )}
    </>
  );
}

export default ViewLink;
