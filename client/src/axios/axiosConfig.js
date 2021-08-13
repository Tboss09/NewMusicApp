import axios from 'axios'

const instance = axios.create({
 baseURL: 'https://peaceful-dry-tortugas-71515.herokuapp.com/',
})
export default instance
