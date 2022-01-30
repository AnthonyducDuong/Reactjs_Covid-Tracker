import axiosClient from "./axiosClient";

const nationApi = {
    getAll: (params) => {
        const url = '/countries';
        return axiosClient.get(url, { params })
    },

    //get by country name
    get: (name) => {
        const url = `/country/${name}`;
        return axiosClient.get(url)
    },
}

export default nationApi;