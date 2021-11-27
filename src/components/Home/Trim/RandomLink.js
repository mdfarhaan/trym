import React, { useState } from "react";
import classes from "./RandomLink.module.css";
import Modal from "../../Modal/Modal";
import { TiArrowRightOutline } from "react-icons/ti";
const validUrl = require("valid-url");
require("dotenv").config();

function RandomLink(props) {
  const URL = process.env.REACT_APP_API;
  const [longUrl, setLongUrl] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [error, setError] = useState(false);

  const addUrl = () => {
    if (validUrl.isUri(longUrl)) {
      const reqOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          longURL: longUrl,
          customCode: false,
        }),
      };
      fetch(URL + "tr", reqOptions)
        .then((response) => {
          response.json().then((data) => {
            props.res(data);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Invalid URL! Please enter a valid URL");
      setError(true);
      setErrMsg("Invalid URL! Please enter a valid URL");
    }
  };

  return (
    <>
      <h1 className={classes.phrase}>Trym your URL</h1>
      <div className={classes.inputBox}>
        <input
          required
          className={classes.urlInput}
          type="url"
          placeholder="URL"
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <button type="submit" className={classes.inputBtn} onClick={addUrl}>
          Trym
        </button>
      </div>
      <div className={classes.radioContent}>
        <span>
          <h1 className={classes.radioLabel}>
            Custom Link{" "}
            <button
              className={classes.arrowBtn}
              onClick={props.arrowBtnHandler}
            >
              <TiArrowRightOutline size={25} color={"black"} />
            </button>
          </h1>
        </span>
      </div>
      {error && (
        <div className={classes.msgContainer}>
          <center>
            <Modal msg={errMsg} />
            {setTimeout(() => {
              setError(!error);
            }, 3000)}
          </center>
        </div>
      )}
    </>
  );
}

export default RandomLink;
