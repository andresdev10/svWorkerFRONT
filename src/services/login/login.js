import axios from "axios";

const urlApi = import.meta.env.VITE_URL_API

export const login = async (userName, password) => {
    try {
        const resp = await axios.post(`${urlApi}/login`, {
            userName: userName,
            password: password
        }, { withCredentials: true })
        return resp.data;
    } catch (error) {
        console.log("error en la funcions: ", error)
        throw error;
    }
}