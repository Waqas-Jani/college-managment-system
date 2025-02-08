import axios from "axios";
// http://pdh-estore.akcybex.com:3000/
export default axios.create({
  baseURL: "http://localhost:8000",
  responseType: "json",
});
