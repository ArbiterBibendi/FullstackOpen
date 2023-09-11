import axios from "axios";

const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather'
const API_KEY = import.meta.env.VITE_SOME_KEY;

const getWeatherData = (latitude, longitude) => {
    const URL = `${WEATHER_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    return (
        axios.get(URL).then(response => response.data)
    )
}

export default { getWeatherData }