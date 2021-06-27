import { SciNewsActionType } from './action-types';

export interface GetNewsAction {
    type: SciNewsActionType.USER_GET_NEWS;
    payload?: any;
}
