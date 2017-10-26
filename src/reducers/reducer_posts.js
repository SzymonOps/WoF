import {FETCH_POST, SHOW_SINGLE_POST, DELETE_POST} from '../actions/index';
import _ from 'lodash';
import { dispatch } from 'redux';


export default function(state = {} , action){
    switch (action.type) {
        case SHOW_SINGLE_POST:
            const post = action.payload.data;
            const newState = { ...state };
            newState[post.id] = post;
            return newState;
            // return {...state} - fetch all the props.data and put to new one that we return
            // return { ...state, [action.payload.data.id]: action.payload.data };
        case FETCH_POST:
            return _.mapKeys(action.payload.data, "id");
        case DELETE_POST:
            return _.omit(state, action.payload)
        default:
            return state;
    }
}