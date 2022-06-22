import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect, useLocation, Router, BrowserRouter } from 'react-router-dom';

import Login from './containers/Login';
import Contact from './containers/Contact';
import Features from './containers/Features';
import Home from './containers/Home';
import Admin from './containers/Admin';
import Header from './components/Header';
import Loading from './containers/Loading';
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import Logo from 'assets/images/Logo.js';

import { history } from "./helpers/history";

function App(){

    const controlPages = useAnimation();
    const controlLoading = useAnimation();
    const location = useLocation();
    const [loaded, setState] = useState(0);
    const [changeLogo, setChangeLogo] = useState(0);

    const animation = {
        startPages: {
            opacity: 0
        },
        startLoading: {
            opacity: 1
        }
    }

    function handleChange(newValue) {
        setState(newValue);
        setTimeout(() => {
            setChangeLogo(1);
            controlPages.start(() => ({
                opacity: 1,
            }));  
            controlLoading.start(() => ({
                opacity: 0,
                transition:{ duration: 2},
                transitionEnd:{
                    display: "none",
                },
            }));     
        }, 5000);
    }

    return(
        
            <div>
                <motion.div variants={animation} initial="startPages" animate={controlPages}>

                    <Router history={history}>

                        <AnimatePresence>

                            <Switch location={location} key={location.pathname}>
                                <Route path="/levan" component={() => <Features/>} />
                                <Route path="/contact" component={() => <Contact/>} />
                                <Route path="/accueil" component={() => <Home/>} />
                                <Route path="/login" component={() => <Login/>} />
                                <Route path="/admin" component={() => <Admin/>} />
                                <Redirect to="/accueil"/>
                            </Switch>

                        </AnimatePresence>
                    </Router>
                <Header/>
            </motion.div>
            <motion.div variants={animation} initial="startLoading" animate={controlLoading}>
                <Loading onChange={handleChange}/>
            </motion.div>
            <Logo changeLogo={changeLogo} loaded={loaded}/> 

            </div>
    );
}

export default App;