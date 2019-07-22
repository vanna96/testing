import axios from "axios";
export default axios.create({
  // baseURL: "https://roads-map.herokuapp.com/api",
  baseURL:"http://192.168.13.114:8283/api",
  responseType: "json"
});