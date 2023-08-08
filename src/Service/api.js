
import axios from "axios";

// const url ="https://localhost:7133/api/";
const url = 'https://dummyjson.com/';
const api = axios.create({
    baseURL:url
})

export default  api;