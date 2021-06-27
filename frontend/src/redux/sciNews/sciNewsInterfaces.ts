import { SciNewsActionType } from './action-types';

export interface IGetNewsAction {
    type: SciNewsActionType.USER_GET_NEWS;
    payload?: any;
}
