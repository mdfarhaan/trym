import React, { useState } from "react";
import classes from "./RandomLink.module.css";
import Modal from "../../Modal/Modal";
import { TiArrowRightOutline } from "react-icons/ti";
import Lottie from "react-lottie";
import Link from "../../../Assets/Lottie/Link_1.json";
import { constant } from "../../../utils/constants";
const validUrl = require("valid-url");

function RandomLink(props) {
  const [longUrl, setLongUrl] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [error, setError] = useState(false);
  const [lottieComp, setLottieComp] = useState(false);

  const addUrl = () => {
    if (validUrl.isUri(longUrl)) {
      setLottieComp(!lottieComp);
      const reqOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          longURL: longUrl,
          customCode: false,
        }),
      };
      fetch(constant.API_URL + "tr", reqOptions)
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

  const lottiOptions = {
    loop: true,
    autoplay: true,
    animationData: Link,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
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
      <div className={classes.msgContainer}>
        {lottieComp && (
          <center>
            <h1>Trimming your URL</h1>
            <Lottie options={lottiOptions} height={150} width={150} />
          </center>
        )}
        {error && (
          <center>
            <Modal msg={errMsg} />
            {setTimeout(() => {
              setError(!error);
            }, 3000)}
          </center>
        )}
      </div>
    </>
  );
}

export default RandomLink;
