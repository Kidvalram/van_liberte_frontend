import React from 'react';
import { makeStyles, withWidth, isWidthUp, Grid } from '@material-ui/core';

import Steps from './Steps';

const PagesStyle = makeStyles(theme => ({
    root:{
        position: "relative",
    },
    title: {
        [theme.breakpoints.up('lg')]: {
            paddingRight: "1vw",
        },
        [theme.breakpoints.down('sm')]: {
            paddingRight: "20vw"
        }
    },
    steps: {
        
        [theme.breakpoints.down('sm')]: {
            paddingRight: "20vw"
        }
    },
    card: {
        [theme.breakpoints.down('sm')]: {
            paddingRight: "20vw"
        }
    }
}));

const PageCarousel = (props) => {

    const classes = PagesStyle(); 
    
    function handleChange(value) {
        props.onChange(value);
    }

    if (isWidthUp("lg", props.width)) {
        return (
            <div className={classes.root}>
                <div style={{display: "flex",  flexDirection: "row", 
                    justifyContent: "space-between", gap: "4rem"}}>
                    <Grid   container direction="column"
                    justify="center"
                    alignItems="flex-end" >
                        <div className={classes.title}>
                            {props.title}
                        </div>
                        {props.cards}
                    </Grid>
                    {   (props.listStep) &&
                        <div className={classes.steps}>
                            <Steps onChange={handleChange} listStep={props.listStep} step={props.step}/>
                        </div>
                    }
                </div>
            </div>
        );
    } else{
        return (
            <div>
            <Grid container direction="column"
            justify="center"
            alignItems="center">
                <div className={classes.card}>
                    {props.cards}
                </div>
                <div className={classes.title}>
                    {props.title}
                </div>
                {   (props.listStep) &&
                    <div className={classes.steps}>
                        <Steps onChange={handleChange} listStep={props.listStep} step={props.step}/>
                    </div>
                }
            </Grid>
        </div>

        );
    }
}

export default withWidth()(PageCarousel);

