import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:3001" //"https://heroku.app.blah.com"
})

//==================AUTH====================
//goes to http://localhost:3001/auth/signup
export const registerUser = async (registerData) => {
    const resp = await api.post('/auth/signup', registerData);
    console.log(resp)
    localStorage.setItem('authToken', resp.data.token);
    api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`;
    return resp.data.user;
}