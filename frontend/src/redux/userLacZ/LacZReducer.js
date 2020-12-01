import {
    USER_ADD_PROTOCOL,
    USER_DELETE_PROTOCOL,
    USER_EDIT_NAME_PROTOCOL,
    USER_GET_PROTOCOL,
    USER_ADD_STRAIN_TO_COLLECTION,
    USER_EDIT_STRAIN_IN_COLLECTION,
    USER_REMOVE_STRAIN_FROM_COLLECTION,
    USER_GET_STRAINS_FROM_COLLECTION,
    USER_ADD_COLLECTION_DATA_TO_STRAIN,
    USER_ADD_COLLECTION_PARSED_DATA_TO_STRAIN,
    USER_ADD_LACZ_DATA_TO_STRAIN,
} from './LacZTypes';

const initialState = {};

export default (state = initialState, action) => {
    switch(action.type) {
        case USER_GET_PROTOCOL:
            return {...state, laczProtocol: action.payload};
        case USER_ADD_PROTOCOL:
            return {...state, laczProtocol: action.payload};
        case USER_DELETE_PROTOCOL:
            return {...state, laczProtocol: action.payload};
        case USER_EDIT_NAME_PROTOCOL:
            return {...state, laczProtocol: action.payload};
        case USER_ADD_STRAIN_TO_COLLECTION:
            return {...state, laczProtocol: action.payload};
        case USER_EDIT_STRAIN_IN_COLLECTION:
            return {...state, laczProtocol: action.payload};
        case USER_REMOVE_STRAIN_FROM_COLLECTION:
            return {...state, laczProtocol: action.payload};
        case USER_GET_STRAINS_FROM_COLLECTION:
            return {...state, laczProtocol: action.payload};
        case USER_ADD_COLLECTION_DATA_TO_STRAIN:
            return {...state, laczProtocol: action.payload};
        case USER_ADD_COLLECTION_PARSED_DATA_TO_STRAIN:
            return {...state, laczProtocol: action.payload};
        case USER_ADD_LACZ_DATA_TO_STRAIN:
            return {...state, laczProtocol: action.payload};
        default:
            return state;
    }
}