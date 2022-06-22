import React, {useEffect, useState, useCallback, Suspense } from "react";
import { makeStyles, withWidth } from '@material-ui/core';
import { motion } from "framer-motion";

import {data} from '../shared/FeaturesData';
import BackgroundDesktop from 'assets/images/customer/features-background-lg.jpg';
import BackgroundTablet from 'assets/images/customer/features-background-md.jpg';
import BackgroundMobile from 'assets/images/customer/features-background-xs.jpg';

import CardContainer from '../components/CardContainer';
import Trail from '../components/Trail';
import ListComponents from '../components/ListComponents';

const PageCarousel = React.lazy(() =>  import('../components/PageCarousel'));

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
        scale: 1
    },
    out: {
      opacity: 0,
      x: "100vw",
      scale: 1.3,
      delay: 1,
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

const FeaturesStyles = makeStyles(theme => ({
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
    features: {
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
    features__page: {
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
    content__promesses:{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        margin: 0,
        height: "100%",
        width: "100%",
    },
    content__equipements:{
        display: "flex",
        justifyContent: "space-evenly",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        textAlign: "end",
        padding: 0,
        margin: 0,
        height: "100%",
        width: "100%",
    },
    content__list:{
        margin:"5% 0 5% 0",
        listStyleType: "none",
    },
    card__promesses: {
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    card__promesses__category:{
        display: "flex",
        justifyContent: "space-around",
    },
    card__promesses__content:{
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "flex-start",
        fontFamily: quicksand,
        color: "white",
        width: "95%",
    },
    content__title__promesses:{
        [theme.breakpoints.up('lg')]: {
            fontSize: '2.6vh',
        },
        [theme.breakpoints.down('lg')]: {   
            fontSize: '2.4vh',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '2.3vh',
        },
    },
    content__description__promesses:{
        [theme.breakpoints.up('lg')]: {
            fontSize: '1.8vh',
        },
        [theme.breakpoints.down('lg')]: {   
            fontSize: '2vh',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.8vh',
        },
    },
    content__title__equipements:{
        [theme.breakpoints.up('lg')]: {
            fontSize: '3vh',
        },
        [theme.breakpoints.down('lg')]: {   
            fontSize: '3vh',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '3vh',
        },
    },
    content__description__equipements:{
        position: "relative",
        display: "flex",
        justifyContent: "space-evenly",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        textAlign: "end",
        [theme.breakpoints.up('lg')]: {
            fontSize: '2vh',
        },
        [theme.breakpoints.down('lg')]: {   
            fontSize: '2vh',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.8vh',
        },
    },
    icon__item: {
        [theme.breakpoints.up('lg')]: {
            width: "30%",
        },
        [theme.breakpoints.down('lg')]: {   
            width: "30%",
        },
    },
    icon: {
        [theme.breakpoints.up('lg')]: {
            height:"8.5vh",
            width:"8.5vh"
        },
        [theme.breakpoints.down('lg')]: {   
            height:"7vh",
            width:"7vh"
        },
    }
}));

let scroll = 1;
let timerHandle = 0; 
var heightScreen = 0;

function Features(props){

    const classes = FeaturesStyles();
    const [y, setY] = useState(window.scrollY);
    const [step, setStep] = useState(data.filter(info => info.id === 1 )[0].id);
    const [component, setComponent] = useState(data.filter(info => info.id === 1 )[0].id);
    const [title, setTitle] = useState(data.filter(info => info.id === 1 )[0].id);
    const [change, setChange] = useState(true);
    const [setup, setSetup] = useState(true);
    const [info, setupInfo] = useState(1);

    const listStep = [1,2];

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

    const CardContainerComponents = [
        [
            {
                background: `${data.filter(data => data.id === 1 )[0].background}`,
                description: <div className={classes.content__promesses}>
                            {data.filter(data => data.id === 1 )[0].info.map(card => {
                                return(
                                    <li className={classes.content__list} key={card.id} >
                                        { card.id % 2 === 0 &&
                                            <div className={classes.card__promesses}>
                                                <div className={classes.icon__item}>
                                                    <img className={classes.icon}
                                                        src={card.icon}
                                                    />
                                                </div>
                                                <div className={classes.card__promesses__content}>
                                                    <div className={classes.content__title__promesses}>
                                                        {card.title}
                                                    </div>
                                                    <div className={classes.content__description__promesses}>
                                                        {card.description}
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        { card.id % 2 !== 0 &&
                                            <div className={classes.card__promesses}>
                                                
                                                <div className={classes.card__promesses__content}>
                                                    <div className={classes.content__title__promesses}>
                                                        {card.title}
                                                    </div>
                                                    <div className={classes.content__description__promesses}>
                                                        {card.description}
                                                    </div>
                                                </div>
                                                <div className={classes.icon__item}>
                                                    <img className={classes.icon}
                                                        src={card.icon}
                                                    />
                                                </div>
                                            </div>
                                        }
                                    </li>
                                )})}
                        </div>
            },
            {
                background: `${data.filter(data => data.id === 2 )[0].background}`,
                description: <div className={classes.content__promesses}>
                                {data.filter(data => data.id === 2 )[0].info.map(card => {
                                    return(
                                        <li className={classes.content__list} key={card.id} >
                                            { card.id % 2 === 0 &&
                                                <div className={classes.card__promesses}>
                                                    <div className={classes.icon__item}>
                                                        <img className={classes.icon}
                                                            src={card.icon}
                                                        />
                                                    </div>
                                                    <div className={classes.card__promesses__content}>
                                                        <div className={classes.content__title__promesses}>
                                                            {card.title}
                                                        </div>
                                                        <div className={classes.content__description__promesses}>
                                                            {card.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            { card.id % 2 !== 0 &&
                                                <div className={classes.card__promesses}>
                                                    
                                                    <div className={classes.card__promesses__content}>
                                                        <div className={classes.content__title__promesses}>
                                                            {card.title}
                                                        </div>
                                                        <div className={classes.content__description__promesses}>
                                                            {card.description}
                                                        </div>
                                                    </div>
                                                    <div className={classes.icon__item}>
                                                        <img className={classes.icon}
                                                            src={card.icon}
                                                        />
                                                    </div>
                                                </div>
                                            }
                                        </li>
                                    )})}
                            </div>
            }
        ],
        [
            {
                title: "asdas",
                background: `${data.filter(info => info.id === 3 )[0].info
                    .filter(data => data.id === 1 )[0].background}`,
                description: <div className={classes.content__equipements}>
                                <div className={classes.content__title__equipements}>
                                    {data.filter(info => info.id === 3 )[0].info
                                    .filter(data => data.id === 1 )[0].title}
                                </div>
                                <div className={classes.content__description__equipements}>
                                    {data.filter(info => info.id === 3 )[0].info
                                    .filter(data => data.id === 1 )[0].description}
                                </div>
                            </div>
            },
            {
                title: "asdas",
                background: `${data.filter(info => info.id === 3 )[0].info
                    .filter(data => data.id === 1 )[0].background}`,
                description: <div className={classes.content__equipements}>
                                <div className={classes.content__title__equipements}>
                                    {data.filter(info => info.id === 3 )[0].info
                                    .filter(data => data.id === 2 )[0].title}
                                </div>
                                <div className={classes.content__description__equipements}>
                                    {data.filter(info => info.id === 3 )[0].info
                                    .filter(data => data.id === 2 )[0].description}
                                </div>
                            </div>
            },
            {
                title: "asdas",
                background: `${data.filter(info => info.id === 3 )[0].info
                    .filter(data => data.id === 1 )[0].background}`,
                description: <div className={classes.content__equipements}>
                                <div className={classes.content__title__equipements}>
                                    {data.filter(info => info.id === 3 )[0].info
                                    .filter(data => data.id === 3 )[0].title}
                                </div>
                                <div className={classes.content__description__equipements}>
                                    {data.filter(info => info.id === 3 )[0].info
                                    .filter(data => data.id === 3 )[0].description}
                                </div>
                            </div>
            }
        ]
    ]
    const components= [
        {
            id: 1,
            data: [
                <CardContainer info={CardContainerComponents[0]}/>,
                <CardContainer info={CardContainerComponents[1]}/>,
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
                <Trail title={data.filter(info => info.id === 3 )[0].title} />,
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

    return(
        <motion.div variants={pageVariants} exit="root_out"
        style={{position: setup ? "absolute" : "relative" }} className={classes.root}>
            <motion.div initial="initial" animate="in" exit="out"
                variants={pageVariants} transition={pageTransition} 
                className={classes.features}>
                <div className={classes.features__page}>
                    <Suspense fallback={<div ></div>}>
                        <PageCarousel onChange={handleChange} cards={infoComponents(component)} 
                        title={titleComponents(title)} step={step} listStep={listStep}/>
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

export default withWidth()(Features);