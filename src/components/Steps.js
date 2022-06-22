import React from 'react';
import { motion } from "framer-motion";
import { makeStyles,  withWidth, isWidthUp, IconButton } from '@material-ui/core';

import ArrowUpIcon from '@material-ui/icons/ExpandLess';
import ArrowDownIcon from '@material-ui/icons/ExpandMore';
import ArrowLeftIcon from '@material-ui/icons/NavigateBefore';
import ArrowRightIcon from '@material-ui/icons/NavigateNext';

const font =  "'Bebas Neue'";

const StepsStyles = makeStyles(theme => ({
    root: {
        position: "relative",
        display: "flex",
        justifyContent: "space-around",
        [theme.breakpoints.up('lg')]: {
            flexDirection: "column",
            height: "80vh",
            gap: "0.5rem",
        },
        [theme.breakpoints.down('lg')]: {
            flexDirection: "row",
            width: "75vw",
            gap: "0.2rem",
        }
    },
    steps: {
        position: "relative",
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "space-around",
        [theme.breakpoints.up('lg')]: {
            flexDirection: "column",
            height: "100%"
        },
        [theme.breakpoints.down('lg')]: {
            flexDirection: "row",
            width: "100%"
        }
    },
    circle: {
        position: "relative",
        backgroundColor: "white",
        fontFamily: font,
        opacity: "0.6",
        textAlign: "center",
        color: "#797C8A",
        [theme.breakpoints.up('lg')]: {
            width: "25px",
            height: "25px",
            borderRadius: "20px",
            fontSize: "18px",
        },
        [theme.breakpoints.down('lg')]: {
            width: "25px",
            height: "25px",
            borderRadius: "20px",
            fontSize: "18px",
        },
        [theme.breakpoints.down('md')]: {
            width: "18px",
            height: "18px",
            borderRadius: "20px",
            fontSize: "15px",
        },
    },
    line: {
        position: "absolute",
        border: "0",
        backgroundColor: "white",
        opacity: "0.5",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        [theme.breakpoints.up('lg')]: {
            height: "100%",
            width: "1px"
        },
        [theme.breakpoints.down('lg')]: {
            height: "2px",
            width: "100%"
        },
    },
    buttonArrow: {

    }
}));

function Step({ name, isVisible }) {
    const classes = StepsStyles();  

    return (
        <motion.div animate={{ scale: isVisible ? 1.4 : 0.9 }}
            transition={{ duration: 1 }}>
            <div className={classes.circle}>{name}</div>
        </motion.div>
    );   
}

function Steps({listStep, step, width, onChange}) {
    const classes = StepsStyles();
    
    function handleChange(value) {
        onChange(value);
    }

    if (isWidthUp("lg", width)) {
        return (
            <div className={classes.root}>
                <IconButton size="small" variant="inherit" 
                    onClick={()=> handleChange("preview")} >
                    <ArrowUpIcon style={{fill: "white"}}/>
                </IconButton>
                <div className={classes.steps}>
                    <div className={classes.line}/>
                    {listStep.map((listStep_id) => {
                        if(step == listStep_id) return(
                            <IconButton size="small" variant="inherit" 
                            key={listStep_id} style={{position: "relative"}}
                            onClick={()=> handleChange(listStep_id)}>
                                <Step isVisible={true} name={listStep_id}/>
                            </IconButton>
                        )
                        else return(
                            <IconButton size="small" variant="inherit"  
                            key={listStep_id} style={{position: "relative"}}
                            onClick={()=> handleChange(listStep_id)}>
                                <Step isVisible={false} name={listStep_id}/>
                            </IconButton>
                        )
                    })}
                </div>
                <IconButton size="small" variant="inherit" 
                    onClick={()=> handleChange("next")} >
                    <ArrowDownIcon style={{fill: "white"}}/>
                </IconButton>
            </div>
        )
    }else{
        return(
            <div className={classes.root}>
                <IconButton size="small" variant="inherit" 
                    onClick={()=> handleChange("preview")} >
                    <ArrowLeftIcon style={{fill: "white"}}/>
                </IconButton>
                <div className={classes.steps}>
                    <div className={classes.line}/>
                    {listStep.map((listStep_id) => {
                        if(step == listStep_id) return(
                            <IconButton size="small" variant="inherit"  
                            key={listStep_id} style={{position: "relative"}}
                            onClick={()=> handleChange(listStep_id)}>
                                <Step isVisible={true} name={listStep_id}/>
                            </IconButton>
                        )
                        else return(
                            <IconButton size="small" variant="inherit" 
                            key={listStep_id} style={{position: "relative"}}
                            onClick={()=> handleChange(listStep_id)}>
                                <Step isVisible={false} name={listStep_id}/>
                            </IconButton>
                        )
                    })}
                </div>
                <IconButton size="small" variant="inherit" 
                    onClick={()=> handleChange("next")} >
                    <ArrowRightIcon style={{fill: "white"}}/>
                </IconButton>
            </div>
        )
    }

}

export default withWidth()(Steps)
