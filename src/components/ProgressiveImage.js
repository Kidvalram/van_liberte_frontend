import React, { memo, useState, useCallback } from "react";
import { makeStyles } from '@material-ui/core';
import { motion } from "framer-motion";

import Preloader from "./Preloader";

const ProgressiveImageStyle = makeStyles(theme => ({
    progressiveImage: {
        width: "inherit",
        height: "inherit",
        boxSizing: "border-box",
    }
}));

const ProgressiveImage = ({ imgSrc }) => {
  const [imageLoaded, setImageLoading] = useState("");
  const classes = ProgressiveImageStyle();

  // Our events handlers
  const handleLoad = useCallback(() => setImageLoading(true), []);
  const handleError = useCallback(() => setImageLoading(false), []);

  // Here we use "[]" to fire useCallback only once (aka onMount)
  const showImage = !imageLoaded ? { display: "none" } : {};


  const ImageToRender = (
    <motion.img
      alt=""
      src={imgSrc}
      animate={{
        opacity: 1,
        transition: { duration: 1 }
      }}
      className={classes.progressiveImage}
      onLoad={handleLoad}
      onError={handleError}
      style={showImage}
    />
  );

  if (!imageLoaded) {
    // We use preloader along with image to allow image
    // load its resource while spinner is on screen.
    // Otherwise the image will never be loaded, because it
    // was never shown in fact. Keep it in mind while using Hooks.
    return <Preloader>{ImageToRender}</Preloader>;
  }

  return ImageToRender;
};

export default memo(ProgressiveImage);