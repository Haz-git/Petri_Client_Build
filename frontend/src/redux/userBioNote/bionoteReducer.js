import {
    USER_ADD_BIONOTE,
    USER_DELETE_BIONOTE,
    USER_UPDATE_BIONOTE,
    USER_GET_BIONOTES,
} from './bionoteTypes';

const initialState = {};

export default (state = initialState, action) => {
    switch(action.type) {
        case USER_ADD_BIONOTE:
            return {...state, bionotes: action.payload};
        case USER_GET_BIONOTES:
            return {...state, bionotes: action.payload};
        case USER_DELETE_BIONOTE:
            return {...state, bionotes: action.payload};
        case USER_UPDATE_BIONOTE:
            return {...state, bionotes: action.payload};
        default:
            return state;
    }
}