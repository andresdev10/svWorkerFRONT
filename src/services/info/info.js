import axios from "axios";
const urlApi = import.meta.env.VITE_URL_API

export const getInfo = async () => {
    try {
        const resp = await axios.get(`${urlApi}/sendInfo`);
        return resp.data;
    } catch (error) {
        console.log("error", error);
        throw error;
    }
}

export const sendCategory = async (platform) => {
    try {
        const resp = await axios.get(`${urlApi}/sendCategory?platform=${platform}`);
        return resp.data;
    } catch (error) {
        console.log("error", error);
        throw error;
    }
}

export const getInfoScraping = async (platform, category) => {
    try {
        const resp = await axios.get(`${urlApi}/sendData?platform=${encodeURIComponent(platform)}&category=${encodeURIComponent(category)}`);
        return resp.data;
    } catch (error) {
        console.log("error", error);
        throw error;
    }
}

export const sendUrl = async (newData) => {
    try {
        const res = await axios.post(`${urlApi}/createUrl`, newData )
        return res
    } catch (error) {
        console.log("error", error);
        throw error;
    }
}