import React from "react";
import classes from "./Modal.module.css";
import Lottie from "react-lottie";

import Error from "../../Assets/Lottie/Cycle.json";

function Modal(props) {
  const lottiOptions = {
    loop: true,
    autoplay: true,
    animationData: Error,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <div className={classes.overlay}>
        <div className={classes.modal}>
          <span>
            <p className={classes.phrase}>{props.msg}</p>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Modal;
