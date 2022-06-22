import React, {useEffect, useState, useCallback } from "react";
import { makeStyles } from '@material-ui/core';
import { motion } from "framer-motion";
import {data} from '../shared/ContactData';

import DataPicker from "../components/DatePicker";
import PageCarousel from "../components/PageCarousel";
import Trail from '../components/Trail';
import FormTravel from "../components/FormTravel";
import FormContact from "../components/FormContact";
import ListComponents from '../components/ListComponents';

import BackgroundDesktop from 'assets/images/customer/contact-background-lg.jpg';
import BackgroundTablet from 'assets/images/customer/contact-background-md.jpg';
import BackgroundMobile from 'assets/images/customer/contact-background-xs.jpg';
import ReserveOptions from '../components/ReserveOptions';
import InstagramIcon from '@material-ui/icons/Instagram';

const bebas_neue =  "'Bebas Neue'";
const quicksand =  "'Quicksand', bold";

const pageVariants = {
    initial: {
      opacity: 0,
      x: "-100vw",
      scale: 0.7,
    },
    in: {
        opacity: 1,
        x: 0,
        scale: 1,
    },
    out: {
      opacity: 0,
      x: "100vw",
      scale: 1.3,
    },
    root_out:{
        position: "absolute",
    }
};
  
const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 2
};

const ContactStyles = makeStyles(theme => ({
    root:{
        [theme.breakpoints.up('lg')]: {
            height: "5000vh",
        },
        [theme.breakpoints.down('lg')]: {   
            height: "5000vh",
        },
        [theme.breakpoints.down('sm')]: {
            height: "5000vh",
        },
    },
    contact: {
        backgroundPosition: "center fixed",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "fixed",
        height: "100vh",
        width: "100vw",
        [theme.breakpoints.up('lg')]: {
            backgroundImage: `url(${BackgroundDesktop})`,
        },
        [theme.breakpoints.down('lg')]: {
            backgroundImage: `url(${BackgroundTablet})`,
        },
        [theme.breakpoints.down('sm')]: {
            backgroundImage: `url(${BackgroundMobile})`,
        },
    },
    contact__page: {
        [theme.breakpoints.up('lg')]: {
            alignItems: "center",
            justifyContent: "flex-end",
            display: "flex",
            paddingTop: "4vh",
            paddingRight: "2vw",
            height: "100vh"
        },
        [theme.breakpoints.down('lg')]: {
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "100%",
            transform: "translate(-50%, -50%)"
        },
    },
    info__left:{
        position: "absolute",
        left: "1vw",
        bottom: "1vh",
        color: "white",
        fontFamily: quicksand,
        [theme.breakpoints.up('lg')]: {
            fontSize: '2.3vh',
        },
        [theme.breakpoints.down('lg')]: {   
            fontSize: '1.9vh',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '2vh',
            left: "2.5vw",
        },
    },
    info__right:{
        position: "absolute",
        right: "1vw",
        bottom: "1vh",
        [theme.breakpoints.up('lg')]: {
            visibility: "hidden"
        },
        [theme.breakpoints.down('lg')]: {   
            visibility: "visible"
        }
    },
    margin: {
        margin: theme.spacing(1),
    },
}));

let scroll = 1;
let timerHandle = 0; 
let heightScreen = 0;

function Contact({}){
    
    const classes = ContactStyles();
    const [y, setY] = useState(window.scrollY);
    const [step, setStep] = useState(data.filter(info => info.id === 1 )[0].id);
    const [component, setComponent] = useState(data.filter(info => info.id === 1 )[0].id);
    const [title, setTitle] = useState(data.filter(info => info.id === 1 )[0].id);
    const [change, setChange] = useState(true);
    const [setup, setSetup] = useState(true);
    const [info, setupInfo] = useState(1);
    const listStep = [1,2,3,4];

    function moveTo(number, moveDisplay){
        switch (number) {
            case 1:
                setStep(1);
                setComponent(1);
                setupInfo(1);
                break;
            case 2:
                setComponent(2);
                setStep(2);
                break;
            case 3: 
                setComponent(3);
                setStep(3);
                break;
            case 4: 
                setComponent(4);
                setStep(4);
                break;
            default:
                break;
        }
    }

    const components= [
        {
            id: 1,
            data: [
                <ReserveOptions onChange={handleChange}/>,
                <DataPicker onChange={handleChange} version="contact"/>,
                <FormTravel onChange={handleChange}/>,
                <FormContact onChange={handleChange}/>,
            ],
            animations: {
                initial: { rotateY: -45, opacity: 0 },
                animate: { rotateY: 0, opacity: 1 },
                exit: { rotateY: 45, opacity: 0 }
            }
        },
        {
            id: 2,
            data: [
                <Trail title={data.filter(info => info.id === 1 )[0].title} />,
                <Trail title={data.filter(info => info.id === 2 )[0].title} />,
                <Trail title={data.filter(info => info.id === 3 )[0].title} />,
                <Trail title={data.filter(info => info.id === 3 )[0].title} />
            ],
            animations: {
                initial: { rotateX: -45, opacity: 0 },
                animate: { rotateX: 0, opacity: 1 },
                exit: { rotateX: 45, opacity: 0 },
            }
        }  
    ];

    const infoComponents = (index) => ListComponents(index, components.filter(info => info.id === 1 )[0].data,
        components.filter(info => info.id === 1 )[0].animations);

    const titleComponents = (index) =>  ListComponents(index, components.filter(info => info.id === 2 )[0].data,
        components.filter(info => info.id === 2 )[0].animations);

    function handleChange(value) {
        if(value === "next_contact"){
            if(scroll < 4){
                setChange(false); 
                scroll = scroll + 1;
                //console.log(scroll);
                moveTo(scroll, false);   
            } 
        }else if(value === "prev_contact"){
            if(scroll > 1){ 
                //console.log(scroll);
                setChange(false); 
                scroll = scroll - 1;
                moveTo(scroll, true);   
                clearTimeout(timerHandle);
                timerHandle = setTimeout(() => {
                    setChange(true); 
                }, 3000);
            }  
        }else if(value === "first_contact"){
            setChange(false); 
            scroll = 1;
            moveTo(scroll, true);   
            clearTimeout(timerHandle);
            timerHandle = setTimeout(() => {
                setChange(true); 
            }, 3000);
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setSetup(false);
        }, 800)
    },[setup]);

    useEffect(() => {
        scroll = 1;
    },[]);

    return(
        <motion.div variants={pageVariants} exit="root_out"
        style={{position: setup ? "absolute" : "relative" }} className={classes.root}>
            <motion.div initial="initial" animate="in" exit="out"
            variants={pageVariants} transition={pageTransition}
            className={classes.contact}>
                <div className={classes.contact__page}>
                    <PageCarousel onChange={handleChange} step={step} 
                        cards={infoComponents(component)}listStep={listStep}
                        title={titleComponents(component)}/>
                </div>
                <div className={classes.info__left}>
                    <div>Van Liberté</div>
                    <div>St Herblain - 44</div>
                    <div>+33 6 59 03 86 45</div>
                    <div>van.liberte.nantes@gmail.com</div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default Contact;