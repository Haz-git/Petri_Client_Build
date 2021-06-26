import { ILacZ } from './lacZInterfaces';
import { LacZActionType } from './action-types';

const initialState = {};

export default (state: Object = initialState, action: ILacZ) => {
    switch (action.type) {
        case LacZActionType.USER_GET_PROTOCOL:
            return { ...state, laczProtocol: action.payload };
        case LacZActionType.USER_ADD_PROTOCOL:
            return { ...state, laczProtocol: action.payload };
        case LacZActionType.USER_DELETE_PROTOCOL:
            return { ...state, laczProtocol: action.payload };
        case LacZActionType.USER_EDIT_NAME_PROTOCOL:
            return { ...state, laczProtocol: action.payload };
        case LacZActionType.USER_ADD_STRAIN_TO_COLLECTION:
            return { ...state, laczProtocol: action.payload };
        case LacZActionType.USER_EDIT_STRAIN_IN_COLLECTION:
            return { ...state, laczProtocol: action.payload };
        case LacZActionType.USER_REMOVE_STRAIN_FROM_COLLECTION:
            return { ...state, laczProtocol: action.payload };
        case LacZActionType.USER_GET_STRAINS_FROM_COLLECTION:
            return { ...state, laczProtocol: action.payload };
        case LacZActionType.USER_ADD_COLLECTION_DATA_TO_STRAIN:
            return { ...state, laczProtocol: action.payload };
        case LacZActionType.USER_ADD_COLLECTION_PARSED_DATA_TO_STRAIN:
            return { ...state, laczProtocol: action.payload };
        case LacZActionType.USER_ADD_LACZ_DATA_TO_STRAIN:
            return { ...state, laczProtocol: action.payload };
        case LacZActionType.USER_ADD_BGAL_DATA_TO_STRAIN:
            return { ...state, laczProtocol: action.payload };
        default:
            return state;
    }
};
