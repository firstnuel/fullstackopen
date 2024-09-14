import { useState, useEffect } from 'react'
import axios from 'axios'

const fetch = async (baseUrl) => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (baseUrl, newObj) => {
    const response = await axios.post(baseUrl, newObj)
    return response.data
}

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }

    const reset = () => setValue('')
  
    return {
      reset,
      type,
      value,
      onChange
    }
  }

  export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
  
    useEffect(() => {
        fetch(baseUrl)
        .then(data => setResources(data))
    }, [baseUrl])
  
    const create = (resource) => {
        createNew(baseUrl, resource)
        .then(data => setResources([...resources, data]), [baseUrl])
    }
  
    const service = {
      create
    }
  
    return [
      resources, service
    ]
  }