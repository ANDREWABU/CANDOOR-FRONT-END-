import axios from 'axios'
import { getToken } from '../Helpers/Functions'

// axios.defaults.baseURL = `http://ec2-34-213-119-23.us-west-2.compute.amazonaws.com/admin/api`
axios.defaults.baseURL = process.env.REACT_APP_API_URL
axios.defaults.headers.common['Authorization'] = getToken()
axios.defaults.headers.common['CAYFOO-GUEST-REQUEST'] = 'GUEST_83422_REQUEST'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3000'
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Accept'
axios.defaults.headers.common['Accept'] = 'Accept: application/json'
// axios.defaults.headers.common['Access-Control-Request-Headers'] = 'Content-Type'

export default axios
