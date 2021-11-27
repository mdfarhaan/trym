import React, { useState } from "react";
import classes from "./Home.module.css";
import RandomLink from "./Trim/RandomLink";
import CustomLink from "./Trim/CustomLink";
import ViewLink from "./View/ViewLink";
import Modal from "../Modal/Modal";

function App() {
  const [customComp, setCustomComp] = useState(false);
  const [addLinkComp, setAddLinkComp] = useState(true);
  const [code, setCode] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [error, setError] = useState(false);

  const responseHandler = (data) => {
    if (data.status === "success") {
      setCode(data.code);
      setAddLinkComp(!addLinkComp);
    } else if (data.status === "failed") {
      setErrMsg(data.msg);
      setError(!error);
    }
  };
  return (
    <>
      <div className={classes.header}>
        <a href="/" className={classes.title}>
          TRYM
        </a>
      </div>

      <div className={classes.body}>
        {addLinkComp ? (
          customComp ? (
            <CustomLink
              arrowBtnHandler={() => setCustomComp(!customComp)}
              res={responseHandler}
            />
          ) : (
            <RandomLink
              arrowBtnHandler={() => setCustomComp(!customComp)}
              res={responseHandler}
            />
          )
        ) : (
          <ViewLink code={code} />
        )}
      </div>
      {error && (
        <div className={classes.msgContainer}>
          <center>
            <Modal msg={errMsg} />
            {setTimeout(() => {
              setError(!error);
            }, 4500)}
          </center>
        </div>
      )}
    </>
  );
}

export default App;
