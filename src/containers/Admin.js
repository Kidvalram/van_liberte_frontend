import React, {useEffect, useState, useCallback, Suspense } from "react";
import { makeStyles, withWidth, Button, Hidden } from '@material-ui/core';
import { motion, AnimatePresence } from "framer-motion";

import Trail from "../components/Trail";
import PageCarousel from '../components/PageCarousel';
import ListComponents from '../components/ListComponents';
import TextField from '@material-ui/core/TextField';
import DataPicker from "../components/DatePicker";
import CardPrice from '../components/CardPrice';

import { NavLink, Redirect, Router, BrowserRouter, Route, useHistory } from "react-router-dom";

import {data} from '../shared/FeaturesData';

import { useSelector } from "react-redux";

import AuthService from "../services/auth.service";

import BackgroundDesktop from 'assets/images/customer/admin-background-lg.jpg';
import BackgroundTablet from 'assets/images/customer/admin-background-md.jpg';
import BackgroundMobile from 'assets/images/customer/admin-background-xs.jpg';

const quicksand =  "'Quicksand', bold";
const bebas_neue =  "'Bebas Neue'";

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

const LoginStyles = makeStyles(theme => ({
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
    admin: {
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
    admin__page: {
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
    container:{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius:"30px ", 
        background: "linear-gradient(156deg, rgba(82,106,135,1) 0%, rgba(54,68,85,.95) 64%, rgba(82,106,135,1) 100%)",
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
            height: "62vh",
            width: "40vh",
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
        height: "100%",
        padding: "8%",
        color: "white"
    },
    info__description:{
        fontFamily: quicksand,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        textAlign: "center",
        marginLeft: "0.5%",
        marginRight: "0.5%",
        height: "100%",
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
    form: {
        '& > *': {
          margin: theme.spacing(1),
          width: '25ch',
        },
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
            fontSize: "2.1vh",
        },
        [theme.breakpoints.down('lg')]: {
            fontSize: "2.2vh"
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: "1.7vh",
        },
    },
    header__link:{
        position: "absolute", 
        top: "1vh", 
        right: "2vw",
        "& > a:not(.activeLink):hover": {
            textDecoration: "none",
            color: "white"      
        }
    },
    link:{
        fontFamily: quicksand,
        color: "white",
        textTransform: "none",
        textDecoration: "none",
        display: "inline-flex",
        overflow: "hidden",
        [theme.breakpoints.up('lg')]: {
          fontSize: '1.5vw',
        },
        [theme.breakpoints.down('lg')]: {   
          fontSize: '2.1vw',
        },
        [theme.breakpoints.down('sm')]: {
          fontSize: '4vw',
          "&:not(:first-child)":{
            paddingTop: "2vh",
          }
        }
    },
    selected__link:{
        textDecoration: "underline !important",
        color: "white !important",
    },
}));

const formStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '23ch',
      },
      "& .MuiFilledInput-root": {
        background: "white",
        fontSize: 14
      },
     
    },
}));

let scroll = 1;
let timerHandle = 0; 
var heightScreen = 0; 

function Admin(props) {
    
    const classes = LoginStyles();
    const classesForm = formStyles();
    const listStep = [1,2];
    const history = useHistory();

    const [y, setY] = useState(window.scrollY);
    const [step, setStep] = useState(data.filter(info => info.id === 1 )[0].id);
    const [component, setComponent] = useState(data.filter(info => info.id === 1 )[0].id);
    const [title, setTitle] = useState(data.filter(info => info.id === 1 )[0].id);
    const [change, setChange] = useState(true);
    const [setup, setSetup] = useState(true);
    const [info, setupInfo] = useState(1);
    const [link, setupLink] = useState(1);

    const { user: currentUser } = useSelector((state) => state.auth);

    if (!currentUser) {
        return <Redirect to="/login" />;
    }

    const handleLogOut = () => {
        setupLink(0);
        AuthService.logout();
        return <Redirect to="/accueil" />;
    };

    function moveTo(number, moveDisplay){
        switch (number) {
            case 1:
                setStep(1);
                setTitle(1);
                setComponent(1);
                setupInfo(1);
                if(moveDisplay) window.scrollTo(0,0);
                break;
            case 2:
                setupInfo(1);
                setComponent(2);
                setStep(2);
                setTitle(2);
                var stepTwo = (heightScreen/4) * 3;
                if(moveDisplay) window.scrollTo(0,stepTwo);
                break;
            default:
                break;
        }
    }

    const components= [
        {
            id: 1,
            data: [
                <DataPicker onChange={handleChange} version="admin"/>,
                <CardPrice/>,
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
                <Trail title="calendrier"/>,
                <Trail title="prix"/>,
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
        console.log(value);
        if(value === "next_contact"){
            if(scroll < 3){
                setChange(false); 
                scroll = scroll + 1;
                moveTo(scroll, false);   
            } 
        }else if(value === "prev_contact"){
            if(scroll > 1){ 
                setChange(false); 
                scroll = scroll - 1;
                moveTo(scroll, true);   
                clearTimeout(timerHandle);
                timerHandle = setTimeout(() => {
                    setChange(true); 
                }, 3000);
            }  
        }
    }

    function handleFlipCard(){
    }

    const handleNavigation = useCallback(
        (e) => {

            const window = e.currentTarget;

            heightScreen = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
                document.documentElement.clientHeight, document.documentElement.scrollHeight, 
                document.documentElement.offsetHeight );

            if(window.scrollY > y){
                if(scroll < 2){
                    setChange(false);
                    scroll = scroll + 1;
                    moveTo(scroll, true);   
                    clearTimeout(timerHandle);
                    timerHandle = setTimeout(() => {
                        setChange(true); 
                    }, 3000);
                }
            }else if(window.scrollY < y){
                if(scroll > 1){ 
                    setChange(false); 
                    scroll = scroll - 1;
                    moveTo(scroll, true);   
                    clearTimeout(timerHandle);
                    timerHandle = setTimeout(() => {
                        setChange(true); 
                    }, 3000);
                }  
            }

            setY(window.scrollY);
        },[y]
    );

    function handleChange(value) {
        heightScreen = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
            document.documentElement.clientHeight, document.documentElement.scrollHeight, 
            document.documentElement.offsetHeight );

        if(value === "preview"){
            if(scroll > 1){ 
                setChange(false); 
                scroll = scroll - 1;
                moveTo(scroll, false);   
                clearTimeout(timerHandle);
                timerHandle = setTimeout(() => {
                        setChange(true); 
                }, 3000);
            }
            
        }else if(value === "next"){
            if(scroll < 2 ){
                setChange(false); 
                scroll = scroll + 1;
                moveTo(scroll, false);   
                clearTimeout(timerHandle);
                timerHandle = setTimeout(() => {
                        setChange(true); 
                }, 3000);
            }
        }else{
            setChange(false); 
            scroll = value;
            moveTo(scroll, false);   
            timerHandle = setTimeout(() => {
                setChange(true); 
            }, 3000);  
        }
    }

    useEffect(() => {
        setY(window.scrollY);
        if(change) window.addEventListener("scroll", handleNavigation);
        else window.removeEventListener("scroll", handleNavigation);
    
        return () => {
            window.removeEventListener("scroll", handleNavigation);
        };
    }, [handleNavigation, change]);

    useEffect(() => {
        setTimeout(() => {
            setSetup(false);
        }, 800)
    },[setup]);

    useEffect(() => {
        scroll = 1;
        window.clearTimeout(window.setTimeout(function() {}, 0));
    },[]);

    return (   
        <motion.div variants={pageVariants} exit="root_out"className={classes.root}>
            <motion.div initial="initial" animate="in" exit="out"
                variants={pageVariants} transition={pageTransition} 
                className={classes.admin}>
                <div className={classes.admin__page}>
                    <PageCarousel cards={infoComponents(component)} title={titleComponents(title)}
                    onChange={handleChange} step={step} listStep={listStep}/>
                </div>
                <Hidden mdDown>
                    <div className={classes.info__left}>
                        <div>Van Liberté</div>
                        <div>St Herblain - 44</div>
                        <div>+33 6 59 03 86 45</div>
                        <div>van.liberte.nantes@gmail.com</div>
                    </div>
                </Hidden>

                <AnimatePresence>
                    {link &&
                    <motion.div className={classes.header__link}
                    initial={{ opacity: 0, scale: 0.1 }}
                    animate={{
                        opacity: 1,
                        scale: 1
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}>
                        <NavLink exact={true} onClick={handleLogOut}
                            className={classes.link}
                            activeClassName={classes.selected__link} to='/accueil'>Déconnecter</NavLink>
                    </motion.div>
                    }
                </AnimatePresence>
                
            </motion.div>
        </motion.div>
    );
}

export default withWidth()(Admin);