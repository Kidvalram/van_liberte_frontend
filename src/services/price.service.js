
import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://van-liberte.herokuapp.com/api/price/";

const registerPrice = (week, weekend, holidays) => {
  return axios.post(API_URL + "updatePrice", {
    week,
    weekend,
    holidays,
  }, { headers: authHeader() });
};

const getPrice = () => {
    return axios.post(API_URL + "getPrice");
};

export default {
    registerPrice,
    getPrice
};