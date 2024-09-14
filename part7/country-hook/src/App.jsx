import React, { useState } from 'react'
import { useField, useCountry } from './hooks'


const Country = ({ country }) => {

  if (!country.found ) {
    return country.error?   
     ( <div>
        not found...
      </div> ): null
  }
  const countryName = country.data.name.common
  return (
    <div>
      <h3>{countryName} </h3>
      <div>capital {...country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flags.png} height='100' alt={`flag of ${country.data.flags.png}`}/>  
    </div>
  )
}

const App = () => {
  const {reset, ...nameInput} = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name) 
  
  
  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }
  
  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      {country && <Country country={country} />}
    </div>
  )
}

export default App