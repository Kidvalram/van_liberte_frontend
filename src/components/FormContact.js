import React, { useState, useRef } from 'react';
import { makeStyles, withStyles, Hidden} from '@material-ui/core';
import ProgressiveImage from "./ProgressiveImage";
import { Button, IconButton, Box } from "@material-ui/core";

import TextField from '@material-ui/core/TextField';
import * as emailjs from 'emailjs-com'

import Arrow from '@material-ui/icons/PlayArrowOutlined';
import EmailIcon from '@material-ui/icons/MailOutline';

import Form from "react-validation/build/form";

import SweetAlert from 'react-bootstrap-sweetalert';

import Background from "assets/images/customer/home-concept-1.jpg";
import LeftButton from 'assets/images/customer/left-button.png';
import RightButton from 'assets/images/customer/right-button.png';
import UpButton from 'assets/images/customer/up-button.png';
import DownButton from 'assets/images/customer/down-button.png';

let description =  "'Quicksand', sans-serif";
const bebas_neue =  "'Bebas Neue'";

const FormContactStyle = makeStyles(theme => ({
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
        color: "white",
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
    },
    alert: {
        position: "absolute" ,width: "100vw", height: "100vh",
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
    },
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

const ColorButton = withStyles((theme) => ({
    root: {
        background: "transparent!important",
        fontFamily: `${bebas_neue} !important`,
        borderRadius:"30px !important",
        color: "white",
        border: "1px groove white !important",
        transition: "all 1s !important",
        boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.8) !important",
        [theme.breakpoints.up('lg')]: {
            fontSize: "2vh !important",
        },
        [theme.breakpoints.down('lg')]: {
            fontSize: "2vh !important",
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: "2vh !important",
        },
        '&:hover': {
            color: "white",
            transform: "scale(1.03)",
        },
      
    },
}))(Button);

function FormContact({onChange}) {
    const classes = FormContactStyle();
    const classesForm = formStyles();
    const [questions, setQuestions] = useState({
        startDate: new Date(localStorage.getItem("startDate")).toISOString().slice(0, 10),
        endDate: new Date(localStorage.getItem("endDate")).toISOString().slice(0, 10),
        from_name: localStorage.getItem("from_name"),
        experience: localStorage.getItem("experience"),
        permision: localStorage.getItem("permision"),
        project: localStorage.getItem("project"),
        persons: localStorage.getItem("persons") ? localStorage.getItem("persons") : '',
        etranger: localStorage.getItem("etranger") ? localStorage.getItem("etranger") : '',
        numero: localStorage.getItem("numero") ? localStorage.getItem("numero") : '',
        email: localStorage.getItem("email") ? localStorage.getItem("email") : ''
    });
    const [validate, setValidate] = useState(
        (questions.persons && questions.etranger && questions.numero && questions.email) ? true : false);
    const [message, setMessage] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(0);
    const [openError, setOpenError] = useState(0);

    function handleChange(value) {
        if(value === "send_email"){
            if(validate){ 
                setMessage(false);
                var error = true;
                let templateParams = {
                    from_name: questions.from_name,
                    reply_to: 'van.liberte.nantes@gmail.com',
                    startDate: questions.startDate,
                    endDate: questions.endDate,
                    experience: questions.experience,
                    permision: questions.permision,
                    project: questions.project,
                    persons: questions.persons,
                    etranger: questions.etranger,
                    numero: questions.numero,
                    email: questions.email,
                }
                emailjs.send(
                    'service_f3dlkv1',
                    'template_van_liberte',
                     templateParams,
                    'user_6OhUAfRSrFOpR7FxTjRgR'
                ).then(res => {
                    console.log(res);
                    localStorage.clear();
                }, err => {
                    console.log(err);
                    error = false;
                    setOpenError(1);
                }).catch(err => {
                    console.log(err);
                });
                setTimeout(() => {
                    if (error) {
                        setOpenSuccess(1);
                    }
                }, 200);
            }
            else {
                setMessage(true);
                //console.log("No validado");
            }
        }else{
            onChange(value);
        }
    }

    const handleQuestions = (prop) => (e) => {
        setQuestions({ ...questions, [prop]: e.target.value });
        localStorage.setItem([prop],e.target.value);
        if(questions.persons && questions.etranger && questions.numero && questions.email) setValidate(true);
        else setValidate(false);
    };

    return (
        <div className={classes.root}>
            {(openSuccess==1) && 
                <SweetAlert success title="Succès !" onConfirm={() => {setOpenSuccess(0); onChange("first_contact");}}>
                    <strong>L’information a été transmise</strong>
                </SweetAlert>}
            {(openError==1) && 
                <SweetAlert error title="Essayez de nouveau !" onConfirm={() => setOpenError(0)}>
                    <strong>Impossible d’envoyer la réservation</strong>
                </SweetAlert>}
            <div className={classes.container}>
                <ProgressiveImage imgSrc={Background} />
                <div className={classes.card__filter}/>
                <div className={classes.info}>
                    <div className={classes.line}/>                            
                    <div className={classes.info__description}>
                        <Form className={classesForm.root} 
                            autoComplete="off">
                            <TextField multiline variant="filled" onChange={handleQuestions('persons')} value={questions.persons}
                            label="En couple, entre amis, en famille, avec enfants ?" rows={1}/>

                            <TextField variant="filled" onChange={handleQuestions('etranger')} value={questions.etranger}
                            label="Allez-vous à l’étranger ?" rows={1}/>

                            <TextField variant="filled" type="tel" onChange={handleQuestions('numero')} value={questions.numero}
                            label="Quel est votre numéro de téléphone ?" rows={1}/>

                            <TextField variant="filled" onChange={handleQuestions('email')} value={questions.email}
                            label="E-mail" rows={1}/>
                            
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
                <IconButton size="small" className={classes.button} onClick={()=> handleChange("send_email")}>
                     <EmailIcon style={{color: "white", padding: "3px"}} className={classes.buttonSize}/>
                </IconButton>
            </div>
        </div>
    )
}

export default FormContact
