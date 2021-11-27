import React, { useState } from "react";
import classes from "./CustomLink.module.css";
import Modal from "../../Modal/Modal";
import { TiArrowLeftOutline } from "react-icons/ti";
const validUrl = require("valid-url");
require("dotenv").config();

function CustomLink(props) {
  const URL = process.env.REACT_APP_API;
  const [longUrl, setLongUrl] = useState("");
  const [code, setCode] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [error, setError] = useState(false);

  const addUrl = () => {
    if (validUrl.isUri(longUrl)) {
      if (code !== "") {
        const reqOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            longURL: longUrl,
            code: code,
            customCode: true,
          }),
        };
        fetch(URL + "tr/cu", reqOptions)
          .then((response) => {
            response.json().then((data) => {
              props.res(data);
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setError(true);
        setErrMsg("Please enter a valid code!");
      }
    } else {
      console.log("URL is not valid");
      setError(true);
      setErrMsg("Invalid URL! Please enter a valid URL");
    }
  };

  return (
    <>
      <h1 className={classes.phrase}>TRYM your URL with custom codes!</h1>
      <div className={classes.body}>
        <div className={classes.urlInputBox}>
          <input
            className={classes.urlInput}
            type="text"
            placeholder="URL"
            required
            onChange={(e) => setLongUrl(e.target.value)}
          />
        </div>
        <div className={classes.codeInputBox}>
          <input
            className={classes.codeInput}
            type="text"
            placeholder="Code"
            required
            onChange={(e) => setCode(e.target.value)}
          />
          <button type="submit" className={classes.inputBtn} onClick={addUrl}>
            Trym
          </button>
        </div>
      </div>
      <button onClick={props.arrowBtnHandler} className={classes.arrowBtn}>
        <TiArrowLeftOutline size={30} color={"black"} />
      </button>
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

export default CustomLink;
