import axios from "axios";
const apiKey = import.meta.env.VITE_SOME_KEY;

const getCountryData = (searchValue) => {
    const request = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    return request.then(response => {
        return response.data.filter(country => {
            return country.name.common.slice(0, searchValue.length).toLowerCase() === searchValue.toLowerCase();
        });
    });
}

const getWeatherData = (country) => {

    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]},${country.cca2}&APPID=${apiKey}`)
    return request.then(response => response.data)
}

export default { getCountryData, getWeatherData };