import axios from "axios";
const baseUrl = '/api/login'

const login = async userLogin => {
    const response = await axios.post(baseUrl, userLogin)
    return response.data
}


export default {login}