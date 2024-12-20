import axios from "axios";

const api = axios.create({
  baseURL: "https://6764cce652b2a7619f5d8306.mockapi.io/api/v1/"
})

export default api;