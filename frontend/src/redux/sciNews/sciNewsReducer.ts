import { SciNewsActionType } from './action-types';
import { IGetNewsAction } from './sciNewsInterfaces';

const initialState = {};

export default (state: Object = initialState, action: IGetNewsAction) => {
    switch (action.type) {
        case SciNewsActionType.USER_GET_NEWS:
            return { ...state, news: action.payload };
        default:
            return state;
    }
};
