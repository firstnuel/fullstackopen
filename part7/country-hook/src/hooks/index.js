import { useState, useEffect } from "react";
import axios from 'axios'

const url = 'https://studies.cs.helsinki.fi/restcountries/api/name'

const fetchCountry = async country => {
    const response =  await axios.get(`${url}/${country}`)
    return response.data
}


export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
        setValue(event.target.value)
    }
    
    const reset = () => setValue('')

    return {
      type,
      value,
      onChange,
      reset
    }
  }
  

  export const useCountry = (name) => {
    const [country, setCountry] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      if (!name) return

      fetchCountry(name)
        .then(data => {
          setCountry(data);
          setError(null);
        })
        .catch(error => {
          setError(error);
          setCountry(null);
        })
    }, [name]);
  
    if (error) return { found: false, error : error }
  
    return {
      found: !!country,
      data: country,
    };
  };
