import React, { useState } from "react";
import classes from "./Home.module.css";
import RandomLink from "./Trim/RandomLink";
import CustomLink from "./Trim/CustomLink";
import ViewLink from "./View/ViewLink";
import Footer from "../Footer/Footer";

function App() {
  const [customComp, setCustomComp] = useState(false);
  const [addLinkComp, setAddLinkComp] = useState(true);
  const [code, setCode] = useState("");

  const responseHandler = (data) => {
    if (data.status === "success") {
      setCode(data.code);
      setAddLinkComp(!addLinkComp);
    }
  };
  return (
    <>
      <div className={classes.header}>
        <a href="/" className={classes.title}>
          TRYM
        </a>
        <p>
          Do you have a <a href="/code">code</a> ?
        </p>
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
      <Footer />
    </>
  );
}

export default App;
