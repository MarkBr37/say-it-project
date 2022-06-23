import axios from "axios";
import { getjwt } from './userServices';

axios.defaults.headers.common['x-auth-token'] = getjwt();

axios.interceptors.response.use(null, (error) => {

    const expectedError = error.response && error.response.status >= 403;
    if(expectedError) alert('An unexpected error');
    return Promise.reject(error);
});

const http = { 
    get: axios.get,
    post: axios.post,
    put: axios.put,
    patch: axios.patch,
    delete: axios.delete,
};

export default http;