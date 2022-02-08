import React from "react";
import classes from "./Footer.module.css";
import { IoLogoGithub, IoLogoLinkedin } from "react-icons/io";
import { AiFillHeart } from "react-icons/ai";
import { BsGlobe } from "react-icons/bs";
function Footer() {
  return (
    <div className={classes.footer}>
      <div className={classes.social}>
        <a href="https://github.com/mdfarhaan">
          <IoLogoGithub size={40} color={"#000"} />
        </a>
        <a href="https://www.linkedin.com/in/mdfarhaan/">
          <IoLogoLinkedin
            size={43}
            color={"#000"}
            className={classes.linkedin}
          />
        </a>
        <a href="https://mdfarhaan.tk/">
          <BsGlobe size={32} color={"#000"} className={classes.globe} />
        </a>
      </div>
      <div className={classes.info}>
        <p>
          Made with{" "}
          <AiFillHeart size={30} className={classes.icon} color={"red"} /> by
          MdFarhaan
        </p>
      </div>
    </div>
  );
}

export default Footer;
