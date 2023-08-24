import axios from "axios";
const url="https://localhost:44332/api/";
const url2="https://localhost:7133/api/";
const api = axios.create({
    baseURL:url2
    // header:{"Authorization":"base urv"}
});
export default api;