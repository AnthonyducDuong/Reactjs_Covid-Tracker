import axiosClient from "./axiosClient";

const covidApi = {
    //get by country name
    //ex: https://api.covid19api.com/total/dayone/country/south-africa
    get: (nation) => {
        const url = `/total/dayone/country/${nation}`;
        return axiosClient.get(url)
    },
}

export default covidApi;