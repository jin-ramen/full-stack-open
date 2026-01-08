import { useState, useEffect } from "react"
import axios from "axios"

const CountryWeather = ({ capital }) => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY
    console.log("API Key:", apiKey)
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`)
            .then(response => {setWeather(response.data)})
    }, [apiKey, capital])

    return (
    <div>
        <h3>Weather in {capital}</h3>
        <p>Temperature {weather ? weather.main.temp : "Loading..."} Celsius</p>
        <img src={weather ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` : "Loading..."} alt="Weather icon" />
        <p>Wind {weather ? weather.wind.speed : "Loading..."} m/s</p>
    </div>
    )
}

export default CountryWeather