import {User} from "../models/user.modal";
import axios from "axios";

const API_PREFIX = "http://localhost:8081"

export async function getAllUsers() {
    return await axios({
        url: `${API_PREFIX}/api/users`,
        method: 'get',
        timeout: 8000,
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(res => res.data)
        .catch((error) => {
            console.error(error);
            return [];
        })
}

export async function setUsername(user:User, newUsername:string) {
    try{
        console.log(JSON.stringify({user:user, username: newUsername}))
        var res = await axios.post(
            `${API_PREFIX}/api/user`,
            {user, newUsername},
            {headers: {'Content-Type': 'application/json'},
        })
    }catch(error) {
        return [];
    }
}