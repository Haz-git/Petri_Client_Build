import { LogInActionType } from './action-types';

export interface UserLogInActionInterface {
    type: LogInActionType.USER_LOG_IN;
    payload?: any;
}
