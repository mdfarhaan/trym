import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Modal from "../Modal/Modal";
import classes from "./Redirect.module.css";
import Lottie from "react-lottie";
import CarLottie from "../../Assets/Lottie/Car_Lottie.json";
require("dotenv").config();

function Redirect() {
  const URL = process.env.REACT_APP_API;
  let { id } = useParams();
  const [redirecting, setRedirecting] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    getUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUrl = () => {
    fetch(URL + id)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          window.location.assign(data.link);
          setRedirecting(false);
        } else if (data.status === "failed") {
          setErrMsg(data.msg);
          setRedirecting(false);
          setError(!error);
        }
      });
  };

  const options = {
    loop: true,
    autoplay: true,
    animationData: CarLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <div className={classes.container}>
        {redirecting && (
          <div>
            <center>
              <h1>Redirecting</h1>
            </center>
            <Lottie options={options} height={400} width={400} />
          </div>
        )}
      </div>
      {error && (
        <div className={classes.msgContainer}>
          <center>
            <Modal msg={errMsg} />
          </center>
        </div>
      )}
    </>
  );
}

export default Redirect;
