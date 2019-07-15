import axios from "axios";
export default axios.create({
  baseURL: "https://roads-map.herokuapp.com",
  responseType: "json"
});