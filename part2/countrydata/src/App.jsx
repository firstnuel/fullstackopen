import { useState, useEffect } from 'react'
import Country from './components/Country'
import Listcountry from './components/Listcountry'
import dataService from './services/dataService'
import Weather from './components/weather'


const App = () => {
  const [countries, setCountries] = useState([])
  const [value, setValue] = useState('')
  const [expandedCountry, setExpandedCountry] = useState(null);
  const [weatherData, setWeatherData] = useState(null)

  useEffect(()=> {
    if (value) {
      dataService
        .getCountryData(value)
        .then(filteredData => setCountries(filteredData))
        .catch(error => console.error(error));
    }
  }, [value])

  useEffect(() => {
    if(countries.length === 1){
      dataService
        .getWeatherData(countries[0])
        .then(response => setWeatherData(response))
        .catch(error => console.error(error))
    }
  }, [countries])

  const handleChange = event => {
    setValue(event.target.value)
  }

  const handleClick = (countryName) => {
    setExpandedCountry(expandedCountry === countryName ? null : countryName);
  };

  return (
    <div>
      find countries
      <input value={value}
        onChange={handleChange}
      ></input>
      {countries.length > 10? 
        <div>Too many matches, specify another filter</div> : (countries.length !== 1? 
          countries.map(country => <Listcountry
            key={country.name.common} 
            country={country}
            handleclick={() => handleClick(country.name.common)} 
            expand={expandedCountry === country.name.common}/>) : <div>
          <Country country={countries[0]} /> 
           {weatherData && <Weather weatherData={weatherData} />}
          </div>
        )
      }
    </div>
  )
}

export default App
