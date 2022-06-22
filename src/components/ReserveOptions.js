import React, { useState, useRef } from 'react';
import { makeStyles, IconButton, Hidden, withWidth, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import background from 'assets/images/customer/home-photos-11.jpg';
import ProgressiveImage from "./ProgressiveImage";
import WikiLogo from 'assets/images/customer/wikicampers_logo.png';

let description =  "'Quicksand', sans-serif";
const bebas_neue =  "'Bebas Neue'";

const ReserveOptionsStyle = makeStyles(theme => ({
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
        overflow: "hidden",
        background: "linear-gradient(156deg, rgba(82,106,135,1) 0%, rgba(54,68,85,.95) 64%, rgba(82,106,135,1) 100%)",
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
    card__filter:{
        position: "absolute",
        top: 0,
        left: 0,
        background: "linear-gradient(156deg, rgba(82,106,135,1) 0%, rgba(54,68,85,.95) 64%, rgba(82,106,135,1) 100%)",
        width: "100%",
        height: "110%",
        opacity: 0.80, 
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
        gap: "5vh",
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
    button__info:{
        color: "white",
        border: "1px groove white",
        fontFamily: `${bebas_neue}`,
        borderRadius:"30px",
        paddingLeft: "2vh",
        paddingRight: "2vh",
        background: "rgba(0, 0, 0, 0.2)",
        [theme.breakpoints.up('lg')]: {
            fontSize: "3.5vh",
        },
        [theme.breakpoints.down('lg')]: {
            fontSize: "3.2vh"
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: "3.2vh",
        },
    },
    button__image: {
        margin: "0.5vh",
        [theme.breakpoints.up('lg')]: {
            height: "5vh",
        },
        [theme.breakpoints.down('lg')]: {
            height: "4vh"
        },
        [theme.breakpoints.down('sm')]: {
            height: "3.9vh",
        },
    }
}));

function ReserveOptions({onChange}) {
    
    const classes = ReserveOptionsStyle();

    function handleChange(value) {
        onChange(value);
    }

    return(
        <div className={classes.root}>
            <div className={classes.container} >
                <ProgressiveImage imgSrc={background} />
                <div className={classes.card__filter}/>

                <div className={classes.info}>
                    <div className={classes.line}/>
                    <div className={classes.info__description}>
                        <Button className={classes.button__info} onClick={(e) => {e.preventDefault(); 
                            window.open("https://www.wikicampers.fr/location-camping-car/van/saint-herblain/volkswagen-volkswagen-california/16500", "_blank")}}>
                            <div className={classes.button__image}>
                                <ProgressiveImage  imgSrc={WikiLogo} />
                            </div>
                        </Button>
                        <Button className={classes.button__info} onClick={()=> handleChange("next_contact")}>
                            <div style={{paddingLeft: "1vw", paddingRight: "1vw"}}>
                                Avec Karine
                            </div>
                        </Button>
                    </div>
                    <div className={classes.line}/>
                </div>        
            </div>
        </div>
    )
}

ReserveOptions.propTypes = {
    width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default withWidth()(ReserveOptions);
