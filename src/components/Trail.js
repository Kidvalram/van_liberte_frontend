import React from 'react';
import { makeStyles } from '@material-ui/core';

const bebasNeue =  "'Bebas Neue'";

const TrailStyle = makeStyles(theme => ({
    trailsMain:{
        position: "relative",
        justifyContent: "center",
        alignItems: "center"
    },
    trailsText: {
        position: "relative",
        width: "auto",
        fontFamily: bebasNeue,
        color: "white",
        fontWeight: "500",
        letterSpacing: "2px",
        willChange: "transform, opacity",
        overflow: "hidden",
        [theme.breakpoints.up('lg')]: {
            fontSize: "7.5vh",
        },
        [theme.breakpoints.down('lg')]: {
            fontSize: "5.6vh",
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: "3.6vh",
        },
    },
    "&>div": {
        overflow: "hidden"
    },
}));

function Trail({title}) {

    const classes = TrailStyle();

    return (
        <div className={classes.titleCard} >
            <div className={classes.trailsText}>
                {title}
            </div>
        </div>
    );
}

export default Trail;
