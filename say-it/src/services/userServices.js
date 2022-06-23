import http from "./httpService";
import apiUrl from "../config.json";
import jwt_decode from "jwt-decode";

export function getjwt(){
    
    return localStorage.getItem('token');
}

export function logout(){
    localStorage.removeItem('token')
    window.location = apiUrl.home
}

export function getCurrentUser(){
    try{
        const jwt = localStorage.getItem('token')
        return jwt_decode(jwt)
    }catch(e){
        return null
    }
}

export async function login(user){
    const { srverUrl, signin } = apiUrl;
    const { data } = await http.post(srverUrl + signin, user);
    
    localStorage.setItem('token', data)
}
