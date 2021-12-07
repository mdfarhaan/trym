import React from "react";
import classes from "./Modal.module.css";

function Modal(props) {
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
