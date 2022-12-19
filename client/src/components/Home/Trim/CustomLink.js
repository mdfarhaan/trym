import React, { useState } from "react";
import classes from "./CustomLink.module.css";
import Modal from "../../Modal/Modal";
import { TiArrowLeftOutline } from "react-icons/ti";
import Lottie from "react-lottie";
import Link from "../../../Assets/Lottie/Link_1.json";
import { constant } from "../../../utils/constants";
const validUrl = require("valid-url");

function CustomLink(props) {
  const [longUrl, setLongUrl] = useState("");
  const [code, setCode] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [error, setError] = useState(false);
  const [lottieComp, setLottieComp] = useState(false);

  const addUrl = async () => {
    if (validUrl.isUri(longUrl)) {
      if (code !== "") {
        setLottieComp(!lottieComp);
        const reqOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            longURL: longUrl,
            code: code,
            customCode: true,
          }),
        };
        await fetch(constant.API_URL + "tr/cu", reqOptions)
          .then((response) => {
            response.json().then((data) => {
              if (data.status === "success") {
                props.res(data);
              } else if (data.status === "failed") {
                setLottieComp(false);
                setError(!error);
                setErrMsg(data.msg);
              }
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setError(!error);
        setErrMsg("Please enter a valid code!");
      }
    } else {
      console.log("URL is not valid");
      setError(!error);
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

export default CustomLink;
