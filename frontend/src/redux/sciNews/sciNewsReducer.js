import { USER_GET_NEWS } from './sciNewsTypes';

const initialState = {};

export default (state = initialState, action) => {
    switch(action.type) {
        case USER_GET_NEWS:
            return {...state, news: action.payload};
        default:
            return state;
    }
}