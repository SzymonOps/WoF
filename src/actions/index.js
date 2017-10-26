import axios from 'axios';

export const FETCH_POST = 'FETCH_POST';
export const CREATE_POST = 'CREATE_POST';
export const SHOW_SINGLE_POST = 'SHOW_SINGLE_POST';
export const DELETE_POST = 'DELETE_POST';


const ROOT_API = 'http://reduxblog.herokuapp.com/api'
const API_KEY = '?key=DUNE321'

export function fetchPosts(){
    const request = axios.get(`${ROOT_API}/posts${API_KEY}`);
        return (dispatch) => {
        request.then((data) =>{
            dispatch({type: 'FETCH_POST', payload: data})
        });
    }

}

export function createPost(values, callback){
    const request = axios.post(`${ROOT_API}/posts${API_KEY}`, values)
    .then(()=> callback())
    return {
        type: CREATE_POST,
        payload: request
    }
}


export function showSinglePost(id){
    const request = axios.get(`${ROOT_API}/posts/${id}`)
    return {
        type: SHOW_SINGLE_POST,
        payload: request
    }
}


export function deletePost(id, callback){
    const request = axios.delete(`${ROOT_API}/posts/${id}${API_KEY}`)
    .then(() => callback())
    return {
        type: DELETE_POST,
        payload: request
    }
}