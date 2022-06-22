import React, { useState, useRef } from 'react';
import { makeStyles, IconButton, Hidden, withWidth, Button } from '@material-ui/core';
import Carousel from 'react-bootstrap/Carousel';
import ProgressiveImage from "./ProgressiveImage";
import PropTypes from 'prop-types';

import Arrow from '@material-ui/icons/PlayArrowOutlined';

import CircleLoader from "react-spinners/CircleLoader";

let description =  "'Quicksand', sans-serif";

const CardContainerStyle = makeStyles(theme => ({
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
    info:{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "center",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "95%",
        height: "85%",
        paddingRight: "8%",
        paddingLeft: "8%",
        color: "white"
    },
    info__description:{
        fontFamily: description,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "center",
        marginLeft: "0.5%",
        marginRight: "0.5%",
        lineHeight: 1.2,
        whiteSpace: "pre-wrap",
        [theme.breakpoints.up('lg')]: {
            fontSize: "2.4vh",
        },
        [theme.breakpoints.down('lg')]: {
            fontSize: "2.5vh",
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: "4.2vw",
        }
    },
    line: {
        borderTop: "3px solid white",
        width: "30%", 
    },
    card__filter:{
        position: "absolute",
        top: 0,
        left: 0,
        background: "linear-gradient(156deg, rgba(82,106,135,1) 0%, rgba(54,68,85,.95) 64%, rgba(82,106,135,1) 100%)",
        width: "100%",
        height: "110%",
        opacity: 0.75, 
    },
    carousel__buttons: {
        position: "relative",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        [theme.breakpoints.up('lg')]: {
            gap: "2vw",
            top: "1vh",
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

function CardContainer(props) {
    
    const classes = CardContainerStyle();
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
                <CircleLoader color={"#ffffff"}loading={true} size={130} />
            </div>
            <Carousel className={classes.container} ref={ref} 
            interval={null} fade={true} indicators={false}
            controls={false} activeIndex={index} onSelect={handleSelect}>
                {props.info.map((info, i) => {
                    return (
                    <Carousel.Item className={classes.carousel} key={i} >   
                        <ProgressiveImage imgSrc={info.background} />
                        <div className={classes.card__filter}/>
                        <div className={classes.info}>
                            {!info.title && <div className={classes.line}/>}                
                            <div className={classes.info__description}>
                                {info.description}
                            </div>
                            {!info.title && <div className={classes.line}/>}   
                        </div>            
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

CardContainer.propTypes = {
    width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default withWidth()(CardContainer);
