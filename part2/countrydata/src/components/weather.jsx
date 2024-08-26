const Weather = ({weatherData}) => {

    return(
        <>
        <h2>Weather in {weatherData.name}</h2>
        <div>temperature {(weatherData.main.temp - 273.15).toFixed(2)} Celcius</div>
        <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
        alt={weatherData.weather[0].description}
        ></img>
        <div>wind {weatherData.wind.speed} m/s </div>
        </>
    )
}

export default Weather