import http from "./httpService";
import apiUrl from "../config.json";

const {srverUrl, createPostUrl, allPosts, posts, myPosts} = apiUrl;

export async function getMyPosts(){

    const res = await http.get(srverUrl + myPosts);
    return res.data;
}


export async function deletePost(post_id){

    await http.delete(srverUrl + posts + post_id);
}


export async function editPost(post_id, data){

    await http.put(srverUrl + posts + post_id, data);
}


export async function getPost(post_id){

    const res = await http.get(srverUrl + posts + post_id);
    return res.data;
}


export async function getAllPost(){

    const res = await http.get(srverUrl + allPosts);
    return res.data;
}


export async function createPost(data){

    await http.post(srverUrl + createPostUrl, data);
}