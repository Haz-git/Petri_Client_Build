import { BionoteActionType } from './action-types';
import { BionoteAction } from './bionoteInterfaces';

const initialState = {};

export default (state: Object = initialState, action: BionoteAction) => {
    switch (action.type) {
        case BionoteActionType.USER_ADD_BIONOTE:
            return { ...state, bionotes: action.payload };
        case BionoteActionType.USER_GET_BIONOTES:
            return { ...state, bionotes: action.payload };
        case BionoteActionType.USER_DELETE_BIONOTE:
            return { ...state, bionotes: action.payload };
        case BionoteActionType.USER_UPDATE_BIONOTE:
            return { ...state, bionotes: action.payload };
        default:
            return state;
    }
};
