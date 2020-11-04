import axios from "axios";
import getEnvVars from "../../enviroment";

const {apiURLGenius} = getEnvVars();

//Instancias de conexión
const instance = axios.create ({
    baseURLGenius : apiURLGenius
});

export default instance;