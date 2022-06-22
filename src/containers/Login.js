import React, {useState, useRef } from "react";
import { makeStyles, withWidth, Button } from '@material-ui/core';
import { motion  } from "framer-motion";

import { useDispatch, useSelector } from "react-redux";

import { NavLink, Redirect, Router, BrowserRouter, Route, useHistory } from "react-router-dom";

import Trail from "../components/Trail";
import PageCarousel from '../components/PageCarousel';
import ListComponents from '../components/ListComponents';
import TextField from '@material-ui/core/TextField';
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";

import BackgroundDesktop from 'assets/images/customer/login-background-lg.jpg';
import BackgroundTablet from 'assets/images/customer/login-background-md.jpg';
import BackgroundMobile from 'assets/images/customer/login-background-xs.jpg';

import { login } from "../actions/auth";

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
    login: {
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
    login__page: {
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
    button__link:{
        color: "white !important",
    }
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

const Login = (props) => {
    
    const classes = LoginStyles();
    const classesForm = formStyles();

    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);
  
    const history = useHistory();

    const dispatch = useDispatch();

    const required = (value) => {
        if (!value) {
          return (
            <div className="alert alert-danger" role="alert">
              This field is required!
            </div>
          );
        }
    };

    const onChangeUsername = (e) => {
      const username = e.target.value;
      setUsername(username);
    };
  
    const onChangePassword = (e) => {
      const password = e.target.value;
      setPassword(password);
    };
  
    const handleLogin = (e) => {
        e.preventDefault();
    
        setLoading(true);
    
        form.current.validateAll();
    
        if (checkBtn.current.context._errors.length === 0) {
            dispatch(login(username, password))
              .then(() => {
                history.push("/admin");
              })
              .catch(() => {
                setLoading(false);
              });
        } else {
            setLoading(false);
        }
        
    };
  
    if (isLoggedIn) {
        return <Redirect to="/admin"/>
    }

    const components= [
        {
            id: 1,
            data: [
                    <div className={classes.container}>
                        <div className={classes.info}>
                            <div className={classes.line}/>
                            <div className={classes.info__description}>
                                <div style={{height: "50%"}}>
                                    <Form onSubmit={handleLogin} ref={form} 
                                    className={classesForm.root} 
                                    onSubmit= {(event) => {event.preventDefault()}}
                                    autoComplete="off">
                                        <TextField
                                        variant="filled"
                                        type="text"
                                        name="username"
                                        value={username}
                                        onChange={onChangeUsername}
                                        validations={[required]}
                                        label="User" rows={1}/>
                                        <TextField 
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={onChangePassword}
                                        validations={[required]} 
                                        variant="filled"
                                        label="Password" rows={1}/>

                                        {message && (
                                                    <div className="form-group">
                                                    <div className="alert alert-danger" role="alert">
                                                        {message}
                                                    </div>
                                                    </div>
                                                )}
                                        <CheckButton style={{ display: "none" }} ref={checkBtn} />
                                    </Form>
                                </div>
                                <Button className={classes.button__info} onClick={handleLogin}
                                disabled={loading}>
                                    {loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                    <span>Entrer</span>
                                </Button>
                            </div>
                            <div className={classes.line}/>                            
                        </div>    
                </div>
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
                <Trail title="Connexion"/>,
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

    function handleFlipCard(){
        
    }

    return (
        <motion.div variants={pageVariants} exit="root_out"className={classes.root}>
            <motion.div initial="initial" animate="in" exit="out"
                variants={pageVariants} transition={pageTransition} 
                className={classes.login}>
                <div className={classes.login__page}>
                    <PageCarousel cards={infoComponents(1)} title={titleComponents(1)}/>
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

export default withWidth()(Login);