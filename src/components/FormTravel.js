import React, { useState, useRef } from 'react';
import { makeStyles, IconButton, Hidden, withWidth } from '@material-ui/core';
import ProgressiveImage from "./ProgressiveImage";

import TextField from '@material-ui/core/TextField';
import Form from "react-validation/build/form";

import Arrow from '@material-ui/icons/PlayArrowOutlined';

import Background from "assets/images/customer/home-concept-1.jpg";
let description =  "'Quicksand', sans-serif";

const FormTravelStyle = makeStyles(theme => ({
    root:{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "2vh",
        alignItems: "center",
        paddingBottom: "1vh"
    },
    form: {
        '& > *': {
          margin: theme.spacing(1),
          width: '25ch',
        },
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
            height: "61vh",
            width: "42vh",
        },
        [theme.breakpoints.down('sm')]: {
            height: "59vh",
            width: "75vw",
        }
    },
    buttons: {
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
        height: "100%",
        padding: "8%",
        color: "white"
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
    card__filter:{
        position: "absolute",
        top: 0,
        left: 0,
        background: "linear-gradient(156deg, rgba(82,106,135,1) 0%, rgba(54,68,85,.95) 64%, rgba(82,106,135,1) 100%)",
        width: "100%",
        height: "100%",
        opacity: 0.75, 
    },
    section__description: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "start",
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

const formStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
      "& .MuiFilledInput-root": {
        background: "white",
        fontSize: 14
      },
     
    },
}));

function FormTravel({onChange}) {
    const classes = FormTravelStyle();
    const classesForm = formStyles();
    const [questions, setQuestions] = useState({
        from_name: localStorage.getItem("from_name") ? localStorage.getItem("from_name") : '',
        experience: localStorage.getItem("experience") ? localStorage.getItem("experience") : '',
        permision: localStorage.getItem("permision") ? localStorage.getItem("permision") : '',
        project: localStorage.getItem("project") ? localStorage.getItem("project") : '',
    });
    const [validate, setValidate] = useState((questions.from_name && questions.experience && questions.permision && questions.project) ? true : false);
    
    const [message, setMessage] = useState(false);

    function handleChange(value) {
        if(value === "next_contact"){
            if(validate){ 
                setMessage(false);
                onChange(value);
            }
            else {
                setMessage(true);
            }
        }else{
            onChange(value);
        }
    }

    const handleQuestions = (prop) => (e) => {
        setQuestions({ ...questions, [prop]: e.target.value });
        localStorage.setItem([prop],e.target.value);
        if(questions.from_name && questions.experience && questions.permision && questions.project) setValidate(true);
        else setValidate(false);
    };

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <ProgressiveImage imgSrc={Background} />
                <div className={classes.card__filter}/>
                <div className={classes.info}>
                    <div className={classes.line}/>                            
                    <div className={classes.info__description}>
                        <Form className={classesForm.root} autoComplete="off">
                            <TextField multiline variant="filled" onChange={handleQuestions('from_name')} value={questions.from_name}
                            label="Nom Prénom" rows={1}/>

                            <TextField variant="filled" onChange={handleQuestions('experience')} value={questions.experience}
                            label="Première expérience en van ?" rows={1}/>

                            <TextField variant="filled" onChange={handleQuestions('permision')} value={questions.permision}
                            label="Avez-vous 3 ans de permis ?" rows={1}/>

                            <TextField variant="filled" onChange={handleQuestions('project')} value={questions.project}
                            label="Quel est votre projet de vacances ?" rows={1}/>
                            
                            {message && (
                                <div className="alert-danger" role="alert"
                                style={{marginLeft: "1vw", marginRight: "1vw"}}>
                                    information incomplète
                                </div>
                            )}
                        </Form>
                    </div>
                    <div className={classes.line}/>                 
                </div>      
            </div>
            <div className={classes.carousel__buttons}>
                <IconButton size="small" className={classes.button} onClick={()=> handleChange("prev_contact")}>
                    <Hidden lgDown>
                        <Arrow style={{color: "white",transform: "rotate(-180deg)"}} className={classes.buttonSize}/>
                    </Hidden>
                    <Hidden lgUp>
                    <Arrow style={{color: "white",transform: "rotate(-90deg)"}} className={classes.buttonSize}/>
                    </Hidden>
                </IconButton> 
                <IconButton size="small" className={classes.button} onClick={()=> handleChange("next_contact")}>
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

export default FormTravel
