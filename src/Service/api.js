
import axios from "axios";

const url ="https://localhost:44332/api/";

const api = axios.create({
    baseURL:url,
})

export default  api;