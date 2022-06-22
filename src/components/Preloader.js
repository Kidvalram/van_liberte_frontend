import React, { memo } from "react";
import { makeStyles } from '@material-ui/core';
import { css } from "@emotion/core";
import CircleLoader from "react-spinners/CircleLoader";

const PreloaderStyle = makeStyles(theme => ({
   preloaderWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    position: "relative",
    width: "inherit",
    height: "inherit",
    backgroundColor: "rgba(82, 106, 135, 0.7)",
},
   preloader: {
    position: "absolute",
    top: "36%",
    left: "36%",
    transform: "translate(-33%, -33%)",
    width: "80px",
    height: "80px",
   }
}));

const Preloader = ({ children }) => {

    const classes = PreloaderStyle();

    const override = css`
    display: block;
    margin: 0 auto;
    border-color: white;
    `;

    const spinner = (
        <div className={classes.preloader}>
            <CircleLoader  color={"#ffffff"}loading={true} css={override} size={130} />
        </div>
    );

    return (
        <div className={classes.preloaderWrap}>
            {children}            
            {spinner}
        </div>
    );
};

export default memo(Preloader);
