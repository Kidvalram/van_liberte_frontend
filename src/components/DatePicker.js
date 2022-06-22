import React, {useState, useRef, useEffect, useReducer} from 'react';
import { DateRange, DateRangePicker, Calendar } from "react-date-range";
import clsx from 'clsx';
import axios from 'axios';
import ParseDate from 'date-fns/parse';

import PeopleIcon from "@material-ui/icons/People";
import { addDays, isSameDay, isWeekend} from 'date-fns';
import format from "date-fns/format";
import { Button, Box, Checkbox, FormControlLabel, FilledInput, InputAdornment, FormControl } from "@material-ui/core";
import ReactCardFlip from 'react-card-flip';
import ProgressiveImage from "./ProgressiveImage";

import SweetAlert from 'react-bootstrap-sweetalert';

import DateService from "../services/date.service";

import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/core";

import { makeStyles, withStyles, Hidden} from '@material-ui/core';
import {fr as french} from 'react-date-range/src/locale/index';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import Background from "assets/images/customer/home-photos-8.jpg";

import { transform } from 'framer-motion';

const bebas_neue =  "'Bebas Neue'";
let description =  "'Quicksand', sans-serif";

const DatePickerStyle = makeStyles(theme => ({
    root:{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "2vh",
        alignItems: "center",
    },
    container:{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "white",
        alignItems: "center",
        borderRadius:"30px ", 
        overflow: "hidden",
        boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.8)",
        [theme.breakpoints.down('lg')]: {
            marginTop: "6vh",
            height: "61vh",
            width: "55vw",
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: "6vh",
            width: "75vw",
        },
    },
    container__admin:{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "white",
        alignItems: "center",
        borderRadius:"30px ", 
        overflow: "hidden",
        boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.8)",
        [theme.breakpoints.down('lg')]: {
            marginTop: "20vh",
            height: "58vh",
            width: "55vw",
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: "16vh",
            height: "67vh",
            width: "75vw",
        },
    },
    prices: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "2.5vh",
        [theme.breakpoints.up('lg')]: {
            fontSize: "2.2vh",
        },
        [theme.breakpoints.down('lg')]: {
            fontSize: "2.4vh",
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: "2.4vh",
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
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        marginLeft: "0.5%",
        marginRight: "0.5%",
        lineHeight: 1.2,
        whiteSpace: "pre-wrap",
        height: "90%",
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
    button: {
        position: "absolute",
        right: "6%",
        bottom: "4%",
        [theme.breakpoints.down('lg')]: {
            position: "relative",
            display: "flex",
            paddingBottom: "1vh",
            right: "auto",
            bottom: "auto",
            width: "100%",
            justifyContent: "space-evenly",
            alignItems: "center",
            height: "18%",
            background: "linear-gradient(156deg, rgba(82,106,135,1) 0%, rgba(54,68,85,.95) 64%, rgba(82,106,135,1) 100%)",
        },
    },
    buttonSize: {
        [theme.breakpoints.up('lg')]: {
            height: "6vh",
            width: "6vh",
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
    button__calendar:{
        position: "relative",
        display: "flex",
        [theme.breakpoints.up('lg')]: {
            gap: "1vw",
        },
        [theme.breakpoints.down('lg')]: {
            gap: "2vw",
        },
        [theme.breakpoints.down('sm')]: {
            gap: "3vw",
        },
    },
    card__filter:{
        position: "absolute",
        top: 0,
        left: 0,
        background: "linear-gradient(156deg, rgba(82,106,135,1) 0%, rgba(54,68,85,.95) 64%, rgba(82,106,135,1) 100%)",
        width: "100%",
        height: "110%",
        opacity: 0.75, 
    },
    line: {
        borderTop: "3px solid white",
        width: "30%", 
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
            fontSize: "1.vh",
        },
    },
    card__boxes:{
        display: "flex", 
    },
    textField: {
        width: '7ch',
        margin: theme.spacing(1),
    },
    loading__page: {
        position: "absolute",
        width: "100%",
        height: "100%" ,
        backgroundColor: "rgba(0, 0, 0, 0.8)",  
    },
    loading:{
        position: "absolute",
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontFamily: bebas_neue,
        color: "white",
        [theme.breakpoints.up('lg')]: {
            fontSize: '2.8vw',
        },
        [theme.breakpoints.down('lg')]: {   
            fontSize: '5vw',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '10vw',
        }
    },
}));

const ColorButton = withStyles((theme) => ({
    root: {
        background: "transparent !important",
        fontFamily: `${bebas_neue} !important`,
        borderRadius:"30px !important",
        background: "rgba(0, 0, 0, 0.3)",
        border: "1px groove white !important",
        color: "white",
        transition: "all 1s !important",
        boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.8) !important",
        [theme.breakpoints.up('lg')]: {
            fontSize: "2.6vh !important",
        },
        [theme.breakpoints.down('lg')]: {
            fontSize: "2vh !important",
            whiteSpace: "pre-line",
            textAlign: "center",
            position: "absolute",
            top: "40%",
            right: "-12vw",
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: "2vh !important",
            right: "-14vw",
            top: "50%",
            transform: "translateY(-45%)"
        },
        '&:hover': {
            color: "white",
            background: "rgba(0, 0, 0, 0.3)",
            transform: "scale(1.03)",
        },
      
    },
}))(Button);

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

let dates = [];
let saveDates = [];

function DatePicker({onChange, version}) {

    const classes = DatePickerStyle();
    const ref = useRef(null);
    const [flipCard, setFlipCard] = useState(false);
    const [startDate, setStartDate] = useState(localStorage.getItem("startDate") ? new Date(localStorage.getItem("startDate")) : new Date());
    const [endDate, setEndDate] = useState(localStorage.getItem("endDate") ? new Date(localStorage.getItem("endDate")) : new Date());

    const [openSuccess, setOpenSuccess] = useState(0);
    const [openError, setOpenError] = useState(0);
    const [disable, setDisable] = useState(false);
    const [enable, setEnable] = useState(false);

    const [loading, setLoading] = useState(0);

    const override = css`
    display: block;
    margin: 0 auto;
    border-color: white;
    `;

    const [values, setValues] = useState({
        semaine: '',
        weekend: '',
        vacances: ''
    });

    const selectionRange = [
        {startDate: startDate,
        endDate: endDate,
        color: "#526A87",
        key: "selection",},
    ];

    function customDayContent(day){
        var extraDot = null;
        var nDay = day;
        nDay.setHours(0, 0, 0, 0);
        if (dates.some(date => isSameDay(date,day))) {
            extraDot = (
                <div
                style={{
                    height: "5px",
                    width: "5px",
                    borderRadius: "100%",
                    background: "orange",
                    position: "absolute",
                    top: 2,
                    right: 2,
                }}
                />
            )
        }
        return (
          <div>
            {extraDot}
            <span>{format(day, "d")}</span>
          </div>
        )
    }

    Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }
    
    function getDates(startDate, stopDate) {
        var dateArray = new Array();
        var currentDate = startDate;
        while (currentDate <= stopDate) {
            dateArray.push(new Date (currentDate));
            currentDate = currentDate.addDays(1);
        }
        return dateArray;
    }

    function handleSaveDates(ranges) {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
        saveDates = [getDates(ranges.selection.startDate,ranges.selection.endDate)];
    }

    function handleSelectDates(ranges){
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    }

    useEffect(() => {

        axios.post('https://van-liberte.herokuapp.com/api/price/getPrice')
        .then(res => {
            setValues({
                semaine: res.data.week,
                weekend: res.data.weekend,
                vacances: res.data.holidays
            });
        })

        setLoading(1);

        DateService.getDates()
        .then(res => {
            var data = res.data;
            dates = [];
            data.forEach(item => {
                dates.push(new Date(item));
            })
            setLoading(0);
        })
        .catch(err => {
            console.log(err);
            setLoading(0);
        });

    }, []);

    const WhiteCheckbox = withStyles({
        root: {
          color: "white",
          '&$checked': {
            color: "white",
          },
        },
        checked: {},
    })((props) => <Checkbox color="default" {...props} />);

    const OrangeCheckbox = withStyles({
        root: {
          color: "white",
          '&$checked': {
            color: "orange",
          },
        },
        checked: {},
    })((props) => <Checkbox color="default" {...props} />);

    function handleChange(value) {
        localStorage.setItem("startDate",startDate);
        localStorage.setItem("endDate",endDate);
        onChange(value);
    }

    function handleOption(e,value){
        e.preventDefault();
        if(value === "disable"){
            setDisable(true);
            setEnable(false);
        }else{
            setDisable(false);
            setEnable(true);
        }
    }

    function handleSave(e){
        e.preventDefault();
        if(disable === true){
            /* var error = true;
            saveDates.forEach(item => item.forEach(date => {
                date.setHours(0, 0, 0, 0);
                DateService.registerDate(date)
                .then(() => {
                    console.log("registro exitoso");
                })
                .catch(err => {
                    if(err) {
                        error = false;
                        setOpenError(1);
                    }
                });
            }));  
            setTimeout(() => {
                if (error) {
                    setOpenSuccess(1);
                    dates = [];
                    DateService.getDates()
                    .then(res => {
                        var data = res.data;
                        data.forEach(item => {
                            dates.push(new Date(item));
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    });
                }
            }, 400); */
            registerDates();
        }
        if(enable === true){
            /* var error = true;

            DateService.getDates()
            .then(res => {
                var data = res.data;

                saveDates.forEach(item => item.forEach(date => {
                    date.setHours(0, 0, 0, 0);
                    if (data.includes(date.toISOString())){                    
                        
                        DateService.deleteDate(date)
                        .catch(err => {
                         if(err) {
                                error = false;
                                setOpenError(1);
                            }
                        });
                    }
                }));

                setTimeout(() => {
                    if (error) {
                        setOpenSuccess(1);
                        dates = [];
                        DateService.getDates()
                        .then(res => {
                            var data = res.data;
                            data.forEach(item => {
                                dates.push(new Date(item));
                            })
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    }
                }, 400); 
            })
            .catch(err => {
                console.log(err);
            }); */
            deletingDates();
        }
    }

    function registerDates(){
        setLoading(1);

        let arrayDates = [];

        DateService.getDates()
        .then(res => {
            var data = res.data;
            saveDates.forEach(item => item.forEach(date => {
                date.setHours(0, 0, 0, 0);
                if(!data.includes(date.toISOString())){                    
                    arrayDates.push(date);
                }
            }));
            
            DateService.setDates(arrayDates).then(res => {
                console.log(res.data);
                setOpenSuccess(1);
                dates = [];
                DateService.getDates()
                .then(res => {
                    var data = res.data;
                    data.forEach(item => {
                        dates.push(new Date(item));
                    })
                    setLoading(0);
                })
                .catch(err => {
                    console.log(err);
                    setLoading(0);
                });
            }).catch(err => {
                console.log(err);
                setLoading(0);
            });

        })
        .catch(err => {
            setLoading(0);
            console.log(err);
        });
    }

    function deletingDates(){
        setLoading(1);
        let arrayDates = [];

        DateService.getDates()
        .then(res => {
            var data = res.data;
            saveDates.forEach(item => item.forEach(date => {
                date.setHours(0, 0, 0, 0);
                if (data.includes(date.toISOString())){                    
                    arrayDates.push(date);
                }
            }));

            DateService.deleteDates(arrayDates).then(res => {
                console.log(res.data);
                setOpenSuccess(1);
                dates = [];
                DateService.getDates()
                .then(res => {
                    var data = res.data;
                    data.forEach(item => {
                        dates.push(new Date(item));
                    })
                    setLoading(0);
                })
                .catch(err => {
                    console.log(err);
                    setLoading(0);
                });
            }).catch(err => {
                console.log(err);
                setLoading(0);
            });
        })
        .catch(err => {
            console.log(err);
            setLoading(0);
        });
    }

    function handleFlipCard(){
        setFlipCard(prevState => !prevState);
    }

    return (
        <div>
            {
                (version == "contact") &&
                <div className={classes.root}>
                    <Hidden lgDown>
                        <div className={classes.container}>
                            <DateRange className={classes.calendar} ranges={selectionRange} 
                            disabledDates={dates} locale={french} onChange={handleSelectDates}
                            retainEndDateOnFirstSelection={true} showDateDisplay={false}/>
                            <div className={classes.prices}
                            style={{ boxShadow: "0px -1px 3px rgba(50, 50, 50, 0.75)",
                            background: "linear-gradient(156deg, rgba(82,106,135,1) 0%, rgba(54,68,85,.95) 64%, rgba(82,106,135,1) 100%)"}}>
                                <Box width="100%" display="flex" justifyContent="center" 
                                flexWrap="wrap" color="white" css={{ maxWidth: 350 }}>
                                    <Box p={1}>
                                    <span style={{fontWeight: "bold"}}>Basse saison :</span> {values.semaine}€
                                    </Box>
                                    <Box p={1}>
                                    <span style={{fontWeight: "bold"}}>Moyenne saison :</span> {values.weekend}€
                                    </Box>
                                    <Box p={1}>
                                    <span style={{fontWeight: "bold"}}>Haute saison :</span> {values.vacances}€
                                    </Box>
                                </Box>
                            </div>
                        </div>
                        <div className={classes.button__calendar}>
                            <ColorButton variant="contained" color="primary" onClick={()=> {handleChange("prev_contact"); }}>
                                    RETOUR
                            </ColorButton>
                            <ColorButton variant="contained" color="primary" onClick={()=> {handleChange("next_contact"); }}>
                                    PRE-RÉSERVATION
                            </ColorButton>
                        </div>  
                    </Hidden>
                    <Hidden lgUp>
                        <ReactCardFlip isFlipped={flipCard} flipDirection="vertical">
                            <div className={classes.container}>
                                <ProgressiveImage imgSrc={Background} />
                                <div className={classes.card__filter}/>
                                <div className={classes.info}>  
                                    <div className={classes.line}/>                            
                                    <div className={classes.info__description}>
                                        <div className={classes.prices}>
                                            <Box width="100%" display="flex" justifyContent="center" 
                                                flexWrap="wrap" color="white" css={{ maxWidth: 350 }}>
                                                <Box p={1}>
                                                <span style={{fontWeight: "bold"}}>Basse saison :</span> {values.semaine}€
                                                </Box>
                                                <Box p={1}>
                                                <span style={{fontWeight: "bold"}}>Moyenne saison :</span> {values.weekend}€
                                                </Box>
                                                <Box p={1}>
                                                <span style={{fontWeight: "bold"}}>Haute saison :</span> {values.vacances}€
                                                </Box>
                                            </Box>
                                        </div>  
                                    </div>
                                    <div className={classes.button__calendar}>
                                        <Button className={classes.button__info} onClick={()=> {handleChange("prev_contact"); }}>
                                                RETOUR
                                        </Button>
                                        <Button className={classes.button__info} onClick={handleFlipCard}>
                                            voir la disponibilité
                                        </Button>
                                    </div>  
                                    <div className={classes.line} style={{marginTop: "1vh"}}/>                            
                                </div>
                            </div>

                            <div className={classes.container}>
                                <DateRange className={classes.calendar} ranges={selectionRange} 
                                locale={french} disabledDates={dates} onChange={handleSelectDates}
                                retainEndDateOnFirstSelection={true} showDateDisplay={false}/>
                                <div  className={classes.button}>
                                    <Button className={classes.button__info} onClick={handleFlipCard}>
                                        retour
                                    </Button>
                                    <Button className={classes.button__info} onClick={()=> handleChange("next_contact")}>
                                        PRE-RÉSERVATION
                                    </Button>
                                </div>
                                
                            </div>
                        </ReactCardFlip>
                    </Hidden>
                </div>
            }
            {
                (version == "admin") &&
                <div className={classes.root}>
                    {(openSuccess==1) && 
                        <SweetAlert  className={classes.alert} success title="Succès !" onConfirm={() => setOpenSuccess(0)}>
                            <strong>L’information a été transmise</strong>
                        </SweetAlert>}
                    {(openError==1) && 
                        <SweetAlert error title="Essayez de nouveau !" onConfirm={() => setOpenError(0)}>
                            <strong>Impossible de se connecter à la base de données</strong>
                        </SweetAlert>}
                    <div>
                        <div className={classes.container__admin}>
                            <DateRange dayContentRenderer={customDayContent}
                            className={classes.calendar} ranges={selectionRange} 
                            locale={french} onChange={handleSaveDates} showDateDisplay={false}
                            retainEndDateOnFirstSelection={true}/>
                            <div className={classes.prices}
                            style={{ boxShadow: "0px -1px 3px rgba(50, 50, 50, 0.75)",
                            background: "linear-gradient(156deg, rgba(82,106,135,1) 0%, rgba(54,68,85,.95) 64%, rgba(82,106,135,1) 100%)"}}>
                                <Box width="100%" display="flex" justifyContent="center" 
                                flexDirection="column" alignContent="center"
                                flexWrap="wrap" color="white" >
                                    <FormControlLabel style={{color:"white"}} checked={enable}
                                    control={<WhiteCheckbox onChange={(e) => {handleOption(e, "enable")}}/>}
                                        label="Date disponible"
                                    />
                                    <FormControlLabel style={{color:"white"}} checked={disable}
                                    control={<OrangeCheckbox onChange={(e) => {handleOption(e, "disable")}}/>}
                                        label="Date non disponible"
                                    />
                                </Box>
                            </div>
                            {
                                (loading == 1) &&
                                <div className={classes.loading__page}>
                                    <div className={classes.loading}>
                                        <div>
                                            <BounceLoader color={"#FFFFFF"} loading={true} css={override} size={120} />
                                            chargement
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <ColorButtonAdmin variant="contained" color="primary"
                        onClick={handleSave}>
                                enregistrer
                    </ColorButtonAdmin>
                    
                </div>
            }
        </div>
    )
}

export default DatePicker
