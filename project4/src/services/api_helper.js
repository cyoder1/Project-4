import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:3001" //"https://cdy-project4-backend.herokuapp.com/"
    // baseURL: "https://cdy-project4-backend.herokuapp.com"
})

//==================AUTH====================
//goes to http://localhost:3001/auth/signup
export const registerUser = async (registerData) => {
    console.log(registerData)
    const resp = await api.post('/auth/signup', registerData);
    // console.log(resp)
    localStorage.setItem('authToken', resp.data.token);
    api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`;
    return resp.data.user;
}

// goes to http://localhost:3001/auth/login
export const loginUser = async (loginData) => {
    const resp = await api.post('/auth/login', loginData);
    // console.log(resp)
    localStorage.setItem('authToken', resp.data.token);
    api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`;
    return resp.data.user;
}

//===============Projects=====================
export const allProjects = async(id) => {
        const resp = await api.get(`/project/${id}`);
        // console.log(resp)
        return resp;
    }

export const verifyUser = async () => {
    const token = localStorage.getItem('authToken');

    if (token) {
        api.defaults.headers.common.authorization = `Bearer ${token}`;
        const resp = await api.get('/auth/verify');
        // console.log(resp)
        return resp.data
    }
    return false;
}

// //===================CITIES========================
// //goes to http://localhost:3001/city/all
// export const allCities = async() => {
//     const resp = await api.get('/city/all');
//     return resp;
// }

// //=======================POSTS========================
// export const indexPosts = async () => {
//     const resp = await api.get('/post/all');
//     console.log(resp);
//     return resp.data;
// }

// //localhost:3001/post/:cityid
export const postProject = async (projectData, id) => {
    const resp = await api.post(`/project/${id}`, projectData);
    console.log(resp)
    return resp.data;
}

// //=================PUT=====================
export const putProject = async (projectId, projectData) => {
    console.log(projectId)
    const resp = await api.put(`/project/${projectId}`, projectData);
    return resp.data;
}
// //===================delete===================
export const destroyProject = async (id, projectData) => {
    await api.delete(`/project/${id}/${projectData.id}`, projectData);
}
// /* 
//     /auth/signup
//     /auth/login
//     /auth
// */



//===============COSTS=====================
export const allCosts = async(id) => {
    const resp = await api.get(`/cost/${id}`);
    // const resp = await api.get(`/cost/1`);
    console.log(resp)
    return resp;
}

export const postCost = async (costData, id) => {
    const resp = await api.post(`/cost/${id}`, costData);
    console.log(resp)
    return resp.data;
}

export const putCost = async (costId, costData) => {
    console.log(costId)
    const resp = await api.put(`/cost/${costId}`, costData);
    return resp.data;
}