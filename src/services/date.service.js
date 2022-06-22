import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://van-liberte.herokuapp.com/api/dates/";

const registerDate = (date) => {
  return axios.post(API_URL + "setDate", {
    date,
  }, { headers: authHeader() });
};

const deleteDate = (date) => {
  return axios.post(API_URL + "deleteDate", {
    date,
  }, { headers: authHeader() });
};

const getDates = () => {
  return axios.post(API_URL + "getDates");
};

const setDates = (date) => {
  return axios.post(API_URL + "setDates", {
    date,
  }, { headers: authHeader() });
};

const deleteDates = (date) => {
  return axios.post(API_URL + "deleteDates", {
    date,
  }, { headers: authHeader() });
};

export default {
    registerDate,
    deleteDate,
    getDates,
    setDates,
    deleteDates
};