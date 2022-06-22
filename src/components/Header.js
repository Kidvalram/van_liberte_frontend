import React, { useEffect, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';    
import { makeStyles, withWidth, isWidthUp, isWidthDown, IconButton, Hidden } from '@material-ui/core';
import { motion, AnimatePresence } from "framer-motion";
import InstagramIcon from '@material-ui/icons/Instagram';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const quicksand = "'Quicksand', bold";

const HeaderStyle = makeStyles(theme => ({
    root:{
        position: "fixed",
        display: "flex",
        justifyContent: "flex-end",
        flexDirection: "row",
        top: "0",
        width: "100%",
    },
    link__container: {
      position: "relative",
      display: "flex",
      height: "100%",
      [theme.breakpoints.up('lg')]: {
        flexDirection: "row",
        paddingTop: "3vh",
        justifyContent: "space-evenly",
      },
      [theme.breakpoints.down('lg')]: {   
        paddingTop: "2vh",
        justifyContent: "space-evenly",
      },
      [theme.breakpoints.down('sm')]: {
        flexDirection: "column",
        paddingRight: "3vw",
        alignItems: "flex-end",
      },
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
    logo__container: {
      position: "absolute",
      top: "0",
      left: "0",
      height: "100%",
      [theme.breakpoints.up('lg')]: {
        width: "100%",
      },
      [theme.breakpoints.down('lg')]: {
        width: "45vw",
      },
      [theme.breakpoints.down('sm')]: {
        width: "52vw",
      },
    },
    selected__link:{
      textDecoration: "underline !important",
      color: "white !important",
    },
    button__instagram:{
      display: "block",
      [theme.breakpoints.down('lg')]: {   
        display: "block !important",
      }
    },
    background:{
      position: "absolute",
      width: "100%",
      height: "100%",
    },
    logo__loading: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%) !important",
      [theme.breakpoints.up('lg')]: {
          height: "auto",
          width: "40vw",
        },
        [theme.breakpoints.down('lg')]: {
          height: "auto",
          width: "60vw",
        },
        [theme.breakpoints.down('sm')]: {
          height: "auto",
          width: "70vw",
        },
    },
    logo__header: {
        position: "absolute",
        top: "10px",
        left: "10px",
        [theme.breakpoints.up('lg')]: {
            height: "40%",
            width: "40%",
        },
        [theme.breakpoints.down('lg')]: {
        height: "auto",
        width: "18vw",
        },
        [theme.breakpoints.down('sm')]: {
        top: "1vh",
        left: "1vw",
        height: "auto",
        width: "22vw",
        },
    },
    insta__icon:{
      [theme.breakpoints.down('sm')]: {
        paddingTop: "2vh"
      }
    }
}));

function Links({width}){

  const classes = HeaderStyle();   
  const location = useLocation();

  function handleClick(e, link){
    if(location.pathname == link) {
      e.preventDefault();
    }
  }

  return(
    <div style={{ position: "relative"}}>
      <AnimatePresence>
        {!location.pathname.match(/admin/) &&
          <motion.div initial={{ opacity: 0, scale: 0.1 }}
          animate={{ opacity: 1, scale: 1}}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}>
            <Hidden lgDown>
              <div className={classes.link__container} style={{ width: "60vw"}}>
                <NavLink exact={true} onClick={(e) => {handleClick(e, "/accueil")}}
                  className={classes.link}
                  activeClassName={classes.selected__link} to='/accueil'>Accueil</NavLink>

                <NavLink exact={true} onClick={(e) => {handleClick(e, "/levan")}} 
                  className={classes.link}  
                  activeClassName={classes.selected__link} to='/levan'>Van tout équipé</NavLink>

                <NavLink exact={true} onClick={(e) => {handleClick(e, "/contact")}} 
                  className={classes.link} 
                  activeClassName={classes.selected__link} to='/contact'>Contact & Réservation</NavLink>
                  
                <IconButton size="small" variant="inherit" 
                  onClick={()=> window.open("https://www.instagram.com/van.liberte/", "_blank")} >
                  <InstagramIcon style={{fill: "white"}}/>
                </IconButton>
              </div>
            </Hidden>
            <Hidden lgUp>
              <div className={classes.link__container} style={{ width: "60vw"}}>
                <NavLink exact={true} onClick={(e) => {handleClick(e, "/contact")}} 
                  className={classes.link} activeStyle={{ color: "white" ,textDecoration: "underline"}}
                  activeClassName="selected" to='/contact'>Contact & Réservation</NavLink>
        
                <NavLink exact={true} onClick={(e) => {handleClick(e, "/levan")}} 
                  className={classes.link} activeStyle={{ color: "white" ,textDecoration: "underline"}}
                  activeClassName="selected" to='/levan'>Van tout équipé</NavLink>
        
                <NavLink exact={true} onClick={(e) => {handleClick(e, "/accueil")}} 
                  className={classes.link} activeStyle={{ color: "white" ,textDecoration: "underline"}}
                  activeClassName="selected" to='/accueil'>Accueil</NavLink>
        
                <IconButton size="small" variant="inherit" className={classes.insta__icon}
                  onClick={()=> window.open("https://www.instagram.com/van.liberte/", "_blank")} >
                  <InstagramIcon style={{fill: "white"}}/>
                </IconButton>
              </div>
            </Hidden>
          </motion.div>
        }
      </AnimatePresence>
    </div>
  );
  
}

function Header({width}) {

    const classes = HeaderStyle();     

    return (
      <div>
        <div className={classes.root}>
            <Links width={width}/>
        </div>
      </div>  
    )
    
}

export default withWidth()(Header);
