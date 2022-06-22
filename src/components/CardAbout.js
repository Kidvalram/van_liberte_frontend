import React, {useState, useRef} from "react";
import { makeStyles, withWidth, isWidthUp, IconButton, Hidden } from "@material-ui/core";
import Carousel from 'react-bootstrap/Carousel';
import { motion } from "framer-motion";
import Profile from "assets/images/customer/karine-profile.jpg";
import PropTypes from 'prop-types';
import ProgressiveImage from "./ProgressiveImage";

import CircleLoader from "react-spinners/CircleLoader";

import Arrow from '@material-ui/icons/PlayArrowOutlined';

const quicksand =  "'Quicksand', bold";

const CardAboutStyle = makeStyles(theme => ({
    root:{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "2vh",
        alignItems: "center",
        [theme.breakpoints.down('lg')]: {
            paddingBottom: "1vh"
        },
    },
    content:{
        position: "absolute",
        opacity: "1",
        color: "white",
        display: "flex",
        justifyContent: "center",
        background: "linear-gradient(156deg, rgba(82,106,135,1) 0%, rgba(54,68,85,.95) 64%, rgba(82,106,135,1) 100%)",
        alignItems: 'center',
        borderRadius: "30px",
        flexDirection: 'column',
        textAlign: "center",
        boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.8)",
        [theme.breakpoints.up('lg')]: {
            position: 'absolute',
            textAlign: "center",
            top: "45%",
            transform: "translate(-50%, -50%)",
            width: "40vh",
            height: "52vh",
            paddingRight: "13%",
        },
        [theme.breakpoints.down('lg')]: {
            position: "relative",
            height: "61vh",
            width: "42vh",
            paddingTop: "6vh"
        },
        [theme.breakpoints.down('sm')]: {
            height: "55vh",
            width: "37vh",
        },
    },
    container:{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius:"30px ", 
        boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.8)",
        [theme.breakpoints.up('lg')]: {
            height: "61vh",
            width: "41vh",
        },
        [theme.breakpoints.down('lg')]: {
            height: "61vh",
            width: "42vh",
        },
        [theme.breakpoints.down('sm')]: {
            height: "55vh",
            width: "37vh",
        }
    },
    container__loading: {
        position: "absolute",
        opacity: 0.95,
        top: 0,
        left: 0,
        background: "linear-gradient(156deg, rgba(82,106,135,1) 0%, rgba(54,68,85,.95) 64%, rgba(82,106,135,1) 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center", 
        borderRadius:"30px ",
        [theme.breakpoints.up('lg')]: {
            height: "61vh",
            width: "41vh",
        },
        [theme.breakpoints.down('lg')]: {
            height: "61vh",
            width: "42vh",
        },
        [theme.breakpoints.down('sm')]: {
            height: "55vh",
            width: "37vh",
        }
    },
    description:{
        position: "relative",
        fontFamily: quicksand,
        whiteSpace: "pre-wrap",
        [theme.breakpoints.up('lg')]: {
            fontSize: "1.7vh",
            padding: "8%",
        },
        [theme.breakpoints.down('lg')]: {
            fontSize: "1.8vh",
            padding: "7%",
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: "1.8vh",
            paddingTop: "10%",
        },
    },
    carousel:{
        borderRadius: "30px",
        overflow: "hidden",
        position: "relative",
        height: "61vh",
        width: "41vh",
        boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.8)",
    },
    carousel__buttons: {
        position: "relative",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "2vw",
        [theme.breakpoints.down('lg')]: {
            position: "absolute",
            flexDirection: "column",
            top: "40%",
            right: "-12vw",
            gap: "2.5vh"
        },
        [theme.breakpoints.down('sm')]: {
            right: "-15vw",
            top: "50%",
            gap: "2vh",
            transform: "translateY(-45%)"
        },
    },
    buttonSize: {
        [theme.breakpoints.up('lg')]: {
            height: "5vh",
            width: "5vh",
          
          },
          [theme.breakpoints.down('lg')]: {
            height: "6.5vh",
            width: "6.5vh",
  
          },
          [theme.breakpoints.down('sm')]: {
              height: "5vh",
              width: "5vh",
          },
    },
    line: {
        borderTop: "3px solid white",
        width: "30%", 
    },
    imagen: {
        width: "110%",
        height: "110%"
    },
    imagen__profile: {
        position: "absolute",
        top: "-13%",
        right: "0",
        left: "0",
        marginLeft: "auto",
        marginRight: "auto",
        overflow: "hidden",
        borderRadius: "50%",
        backgroundImage: `url(${Profile})`,
        backgroundSize: 'cover',
        boxShadow: "0 1px 10px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 0, 0, 0.1) inset",
        [theme.breakpoints.down('lg')]: {
            width: "18vh",
            height: "18vh",
        },
        [theme.breakpoints.down('sm')]: {
            width: "17vh",
            height: "17vh",
        },
    },
    carousel: {
        overflow: "hidden",
        borderRadius:"30px",       
    },
    button:{
        background: "rgba(0, 0, 0, 0.1)",
        border: "1px solid white !important",
        transition: "all 1s !important",
        [theme.breakpoints.down('lg')]: {
            marginTop: "2.5vh"
        },
        '&:hover': {
            background: "rgba(0, 0, 0, 0.2)",
            transform: "scale(1.03)",
        },
    }
}));

const variables = {
    initial__desktop: {
        left: "41%"
    },
    animate__desktop: {
        left: "-34%",
        transition: { delay: 0.5, duration: 2  },
    },
    initial__mobile: {
        rotate: -40,
        scale: 0.9,
        opacity: 0.4
    },
    animate__mobile: {
        rotate: 0,
        scale: 1,
        opacity: 1,
        transition: { duration: 2  },
    }
};

function CardAbout({info, photos, width}) {;
    
    const classes = CardAboutStyle();
    const [index, setIndex] = useState(0);
    const ref = useRef(null);

    const onPrevClick = () => {
        ref.current.prev();
      };
      const onNextClick = () => {
        ref.current.next();
    };

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    if (isWidthUp("lg", width)) {
        return (
            <div className={classes.root}>
                <div className={classes.container__loading}>
                    <CircleLoader  color={"#ffffff"}loading={true}  size={130} />
                </div>
                <motion.div className={classes.content} 
                    initial="initial__desktop" animate="animate__desktop"
                    variants={variables}>
                        <div className={classes.line}/>
                        <div className={classes.description}>
                            {info}
                        </div>
                        <div className={classes.line}/>
                </motion.div>
                <Carousel className={classes.container} ref={ref} 
                interval={4500} indicators={false} fade={true}
                controls={false} activeIndex={index} onSelect={handleSelect}>
                    {photos.map((slide, i) => {
                        return (
                        <Carousel.Item className={classes.carousel} key={i} >   
                            <ProgressiveImage imgSrc={slide.image} />
                        </Carousel.Item>
                        )
                    })}
                </Carousel>
                <Hidden lgDown>
                    <div className={classes.carousel__buttons}>
                        <IconButton size="small" className={classes.button} onClick={onNextClick}>
                            <Arrow style={{color: "white",transform: "rotate(-180deg)"}} className={classes.buttonSize}/>
                        </IconButton> 
                        <IconButton size="small" className={classes.button} onClick={onPrevClick}>
                            <Arrow style={{color: "white"}} className={classes.buttonSize}/>
                        </IconButton>
                    </div>
                </Hidden>
            </div>
        )
    }else{

        return(
            <div className={classes.root}> 
                <div className={classes.content} >
                    <Hidden smDown>
                        <div className={classes.line}/>
                    </Hidden>
                    <div className={classes.description}>
                        {info}
                    </div>
                    <div className={classes.line}/>
                </div>
                <motion.div initial="initial__mobile" 
                animate="animate__mobile" variants={variables}
                className={classes.imagen__profile}/>                    
            </div>
        );
    }

}

CardAbout.propTypes = {
    width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default withWidth()(CardAbout);