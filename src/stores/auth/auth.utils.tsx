import axios from "axios";
import {User} from "../../models/user.modal";

export type LoginCredentials = {email:string, password:string}

const API_PREFIX = "http://localhost:8081"

export  async function login(credentials : LoginCredentials) {
    try{
        return await axios.post(
            `${API_PREFIX}/api/user/login`,
            {credentials},
            {headers: {'Content-Type': 'application/json'},
            }).then(user => user.data);
    }
    catch(error) {
        return [];
    }
}