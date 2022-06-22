import React, { useEffect, useState } from 'react';
import { makeStyles, withWidth, isWidthUp } from '@material-ui/core';
import DesktopVideo from "assets/videos/desktop-liberte.mp4";
import MobileVideo from "assets/videos/mobile-liberte.mp4";
import TabletVideo from "assets/videos/tablet-liberte.mp4";
import { motion } from "framer-motion";

import ReactPlayer from 'react-player'


const LoadingStyle = makeStyles(theme => ({
    root:{
        position: "fixed",
        top: "0",
    },
}));

function VideoLoading(props){

    function handleChange(value) {
        props.onChange(value);  
    }

    let video = DesktopVideo;

    if (isWidthUp("lg", props.width)) video = DesktopVideo
    else if (isWidthUp("md", props.width)) video = TabletVideo
    else video = MobileVideo;

    const onProgress = () => {
        setTimeout(() => {
            handleChange(1);
        }, 100);
    };
    return ( 
        <ReactPlayer url= {video} width='auto' onPlay={onProgress}
        height='120vh' controls = { false } playing = { true } muted = {true}
        playsinline = {true}
    />

    );
    
}
function Loading(props) {

    const classes = LoadingStyle();
    const [startVideo, setStartVideo] = useState(0);

    useEffect(() => {
        setStartVideo(1);
        //console.log("rendered");
    }, [/*Here can enter some value to call again the content inside useEffect*/])

    function handleChange(value) {
        props.onChange(value);
    }

    return (
        <motion.div className={classes.root} initial={{ opacity: 0 }} 
            animate={{ opacity: startVideo}} 
            transition={{ duration: 1 }}>
                <VideoLoading onChange={handleChange} width={props.width}/>
        </motion.div>
    )
}

export default withWidth()(Loading);
