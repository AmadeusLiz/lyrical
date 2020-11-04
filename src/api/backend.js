import axios from "axios";
import getEnvVars from "../../enviroment";

const { apiURLGenius } = getEnvVars();

//Instancias de conexión
const instance = axios.create ({
    baseURL: apiURLGenius
});

export default instance;