import axios from 'axios';

axios.defaults.withCredentials = true;

export { axios as appAxios };