import React, {useEffect, useState, useCallback, Suspense } from "react";
import { makeStyles, withWidth } from '@material-ui/core';
import { motion  } from "framer-motion";

import {data} from '../shared/HomeData';
import BackgroundDesktop from 'assets/images/customer/home-background-lg.jpg';
import BackgroundTablet from 'assets/images/customer/home-background-md.jpg';
import BackgroundMobile from 'assets/images/customer/home-background-xs.jpg';

import CardCarousel from '../components/CardCarousel';
import CardContainer from '../components/CardContainer';
import CardAbout from "../components/CardAbout";
import Trail from '../components/Trail';
import ListComponents from '../components/ListComponents';

const PageCarousel = React.lazy(() =>  import('../components/PageCarousel'));

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

const HomeStyles = makeStyles(theme => ({
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
    home: {
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
    home__page: {
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
    }
}));

let scroll = 1;
let timerHandle = 0; 
let heightScreen = 0;

function Home(props) {
    
    const classes = HomeStyles();
    const [y, setY] = useState(window.scrollY);
    const [step, setStep] = useState(data.filter(info => info.id === 1 )[0].id);
    const [component, setComponent] = useState(data.filter(info => info.id === 1 )[0].id);
    const [setup, setSetup] = useState(true);
    const [change, setChange] = useState(true);
    const [info, setupInfo] = useState(1);
    const listStep = [1,2,3];

    function moveTo(number, moveDisplay){
        switch (number) {
            case 1:
                setStep(1);
                setComponent(1);
                setupInfo(1);
                if(moveDisplay) window.scrollTo(0,0);
                break;
            case 2:
                setComponent(2);
                setStep(2);
                var stepTwo = (heightScreen/4) * 2
                if(moveDisplay) window.scrollTo(0,stepTwo);
                break;
            case 3: 
                setComponent(3);
                setStep(3);
                var stepThree = (heightScreen/4) * 3;
                if(moveDisplay) window.scrollTo(0,stepThree);
                break;
            default:
                break;
        }
    }

    const components= [
        {
            id: 1,
            data: [
                <CardContainer info={data.filter(info => info.id === 1 )[0].info}/>,
                <CardCarousel photos={data.filter(info => info.id === 2 )[0].info}/>,
                <CardAbout info={data.filter(info => info.id === 3 )[0].info}
                    photos={data.filter(info => info.id === 3 )[0].photos} open={1}/>
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

    const handleNavigation = useCallback(
        (e) => {

            const window = e.currentTarget;
            heightScreen = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
                document.documentElement.clientHeight, document.documentElement.scrollHeight, 
                document.documentElement.offsetHeight );
        
            if(y > window.scrollY){
                if(scroll > 1){ 
                    //console.log(`${scroll} arriba`);
                    setChange(false); 
                    scroll = scroll - 1;
                    moveTo(scroll, true);   
                    clearTimeout(timerHandle);
                    timerHandle = setTimeout(() => {
                        setChange(true); 
                    }, 3000);
                }
            }else if(y < window.scrollY){
                if(scroll < 3){
                    //console.log(`${scroll} abajo`);
                    setChange(false);
                    scroll = scroll + 1;
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
            if(scroll < 3){
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
            clearTimeout(timerHandle);
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
        <motion.div variants={pageVariants} exit="root_out"
        style={{position: setup ? "absolute" : "relative" }} className={classes.root}>
            <motion.div initial="initial" animate="in" exit="out"
                variants={pageVariants} transition={pageTransition} 
                className={classes.home}>
                <div className={classes.home__page}>
                    <Suspense fallback={<div ></div>}>
                        <PageCarousel onChange={handleChange} cards={infoComponents(component)} 
                        title={titleComponents(component)} step={step} listStep={listStep}/>
                    </Suspense>
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

export default withWidth()(Home);

