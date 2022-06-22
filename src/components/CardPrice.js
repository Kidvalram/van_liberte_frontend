import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

import { makeStyles, withWidth, withStyles, Input, Button, Box, FormControl } from '@material-ui/core';

import SweetAlert from 'react-bootstrap-sweetalert';
import PriceService from "../services/price.service";

import ProgressiveImage from "./ProgressiveImage";
import PropTypes from 'prop-types';
import Background from "assets/images/customer/home-concept-1.jpg";

import { motion, AnimatePresence } from "framer-motion";

const bebas_neue =  "'Bebas Neue'";
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
        overflow: "hidden",
        boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.8)",
        [theme.breakpoints.up('lg')]: {
            height: "61vh",
            width: "41vh",
        },
        [theme.breakpoints.down('lg')]: {
            marginTop: "15vh",
            height: "58vh",
            width: "55vw",
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: "12vh",
            height: "68vh",
            width: "75vw",
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
            height: "58vh",
            width: "55vw",
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
        height: "100%",
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
            width: "5vh"
          },
          [theme.breakpoints.down('lg')]: {
            height: "6.5vh",
            width: "6.5vh"
          },
          [theme.breakpoints.down('sm')]: {
              height: "5vh",
              width: "5vh"
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
    },
    textField: {
        width: '8ch',
        height: "auto",
    },
    margin: {
        margin: theme.spacing(1),
    },   
    prices: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "center",
        [theme.breakpoints.up('lg')]: {
            fontSize: "2.4vh",
        },
        [theme.breakpoints.down('lg')]: {
            fontSize: "2.2vh",
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: "4vw",
        }
    },
    alert: {
        position: "absolute" ,width: "100vw", height: "100vh",
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
    },
}));

const ColorButtonAdmin = withStyles((theme) => ({
    root: {
        background: "transparent !important",
        fontFamily: `${bebas_neue} !important`,
        borderRadius:"30px !important",
        background: "rgba(0, 0, 0, 0.3)",
        border: "1px groove white !important",
        color: "white",
        transition: "all 1s !important",
        boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.8) !important",
        fontSize: "2vh !important",        
        '&:hover': {
            color: "white",
            background: "rgba(0, 0, 0, 0.3)",
            transform: "scale(1.03)",
        },
    },
}))(Button);

function CardContainer(props) {
    
    const classes = CardContainerStyle();
    const [openSuccess, setOpenSuccess] = useState(0);
    const [openError, setOpenError] = useState(0);
    
    const [values, setValues] = React.useState({
        semaine: '',
        weekend: '',
        vacances: '',
    });

    const handleChange = (prop) => (e) => {
        setValues({ ...values, [prop]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        var error = true;
        PriceService.registerPrice(values.semaine,values.weekend,values.vacances)
        .catch(err => {
            if(err) {
                error = false;
                //setOpenError(1);
            }
        });
        setTimeout(() => {
            if (error) setOpenSuccess(1);
        }, 200);
    }

    useEffect(() => {
        PriceService.getPrice()
        .then(res => {
            setValues({
                semaine: res.data.week,
                weekend: res.data.weekend,
                vacances: res.data.holidays
            });
        })
        .catch(() => {
            //setOpenError(1);
        });
    },[]);

    return (
        <div className={classes.root}>
            {(openSuccess==1) && 
                <SweetAlert success title="Succès !" onConfirm={() => setOpenSuccess(0)}>
                    <strong>L’information a été transmise</strong>
                </SweetAlert>}
            {(openError==1) && 
                <SweetAlert error title="Essayez de nouveau !" onConfirm={() => setOpenError(0)}>
                    <strong>Impossible de se connecter à la base de données</strong>
                </SweetAlert>}
            <div className={classes.container}>
                <ProgressiveImage imgSrc={Background} />
                <div className={classes.card__filter}/>
                <div className={classes.info}>
                    <div className={classes.line}/>                            
                    <div className={classes.info__description}>
                    <div className={classes.prices}>
                                <Box width="100%" display="flex" justifyContent="center" alignItems="center"
                                alignContent="center"
                                flexWrap="wrap" color="white" css={{ maxWidth: 350 }}>
                                    <Box  display="flex" justifyContent="center" alignItems="center"
                                    alignContent="center" p={1}>
                                    <span style={{fontWeight: "bold"}}>Basse saison :</span>
                                    <FormControl className={clsx(classes.margin, classes.textField)}>
                                        <Input
                                            id="semaine"
                                            type="number"                                            
                                            value={values.semaine}
                                            onChange={handleChange('semaine')}
                                            style={{color: "white"}}                                            
                                            endAdornment="€"
                                            aria-describedby="standard-weight-helper-text"
                                            inputProps={{
                                            'aria-label': 'weight',
                                            }}
                                        />
                                    </FormControl>
                                    </Box>
                                    <Box isplay="flex" justifyContent="center" alignItems="center"
                                    alignContent="center" p={1}>
                                    <span style={{fontWeight: "bold"}}>Moyenne saison :</span>
                                    <FormControl className={clsx(classes.margin, classes.textField)}>
                                        <Input
                                            id="weekend"
                                            type="number"
                                            value={values.weekend}
                                            onChange={handleChange('weekend')}
                                            style={{color: "white"}}                                            
                                            endAdornment="€"
                                            aria-describedby="standard-weight-helper-text"
                                            inputProps={{
                                            'aria-label': 'weight',
                                            }}
                                        />
                                    </FormControl>
                                    </Box>
                                    <Box isplay="flex" justifyContent="center" alignItems="center"
                                    alignContent="center" p={1}>
                                    <span style={{fontWeight: "bold"}}>Haute saison :</span>
                                    <FormControl className={clsx(classes.margin, classes.textField)}>
                                        <Input
                                            id="vacances"
                                            type="number"
                                            value={values.vacances}
                                            onChange={handleChange('vacances')}
                                            style={{color: "white"}}                                            
                                            endAdornment="€"
                                            aria-describedby="standard-weight-helper-text"
                                            inputProps={{
                                            'aria-label': 'weight',
                                            }}
                                        />
                                    </FormControl>
                                    </Box>
                                </Box>
                            </div>
                    </div>
                    <div className={classes.line}/>                 
                </div>      
            </div>
            <ColorButtonAdmin variant="contained" color="primary"
                onClick={(e) => handleSubmit(e)}>
                        enregistrer
            </ColorButtonAdmin>
        </div>
    
    )
}

CardContainer.propTypes = {
    width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default withWidth()(CardContainer);
