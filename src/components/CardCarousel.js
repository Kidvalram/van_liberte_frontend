import React, { useState, useRef } from 'react';
import { makeStyles, IconButton, Hidden, withWidth } from '@material-ui/core';
import Carousel from 'react-bootstrap/Carousel';
import ProgressiveImage from "./ProgressiveImage";
import PropTypes from 'prop-types';

import Arrow from '@material-ui/icons/PlayArrowOutlined';

import CircleLoader from "react-spinners/CircleLoader";

const CardCarouselStyle = makeStyles(theme => ({
    root:{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "2vh",
        alignItems: "center",
        paddingBottom: "1vh"
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
    carousel: {
        overflow: "hidden",
        borderRadius:"30px",       
    },
    carousel__buttons: {
        position: "relative",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        [theme.breakpoints.up('lg')]: {
            gap: "2vw",
        },
        [theme.breakpoints.down('lg')]: {
            position: "absolute",
            flexDirection: "column",
            top: "40%",
            right: "-12vw",
        },
        [theme.breakpoints.down('sm')]: {
            right: "-14vw",
            top: "50%",
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

function CardCarousel({photos, width}) {;
    
    const classes = CardCarouselStyle();
    const [index, setIndex] = useState(0);
    const ref = useRef(null);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const onPrevClick = () => {
        ref.current.prev();
      };
      const onNextClick = () => {
        ref.current.next();
    };

    return (
        <div className={classes.root}>
            <div className={classes.container__loading}>
                <CircleLoader  color={"#ffffff"}loading={true}  size={130} />
            </div>
            <Carousel className={classes.container} ref={ref} interval={4000} 
            fade={true} indicators={false} controls={false} 
            activeIndex={index} onSelect={handleSelect}>
                {photos.map((slide, i) => {
                    return (
                    <Carousel.Item className={classes.carousel} key={i} >   
                           
                            <ProgressiveImage  imgSrc={slide.background} />

                    </Carousel.Item>
                    )
                })}
            </Carousel>
            <div className={classes.carousel__buttons}>
                <IconButton size="small" className={classes.button} onClick={onNextClick}>
                    <Hidden lgDown>
                        <Arrow style={{color: "white",transform: "rotate(-180deg)"}} className={classes.buttonSize}/>
                    </Hidden>
                    <Hidden lgUp>
                    <Arrow style={{color: "white",transform: "rotate(-90deg)"}} className={classes.buttonSize}/>
                    </Hidden>
                </IconButton> 
                <IconButton size="small" className={classes.button} onClick={onPrevClick}>
                    <Hidden lgDown>
                        <Arrow style={{color: "white"}} className={classes.buttonSize}/>
                    </Hidden>
                    <Hidden lgUp>
                        <Arrow style={{color: "white",transform: "rotate(90deg)"}} className={classes.buttonSize}/>
                    </Hidden>
                </IconButton>
            </div>
        </div>
    )

}

CardCarousel.propTypes = {
    width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default withWidth()(CardCarousel);