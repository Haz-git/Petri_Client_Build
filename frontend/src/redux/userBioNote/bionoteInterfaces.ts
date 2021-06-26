import { BionoteActionType } from './action-types';

export interface AddBionote {
    type: BionoteActionType.USER_ADD_BIONOTE;
    payload?: any;
}

export interface UpdateBionote {
    type: BionoteActionType.USER_UPDATE_BIONOTE;
    payload?: any;
}

export interface DeleteBionote {
    type: BionoteActionType.USER_DELETE_BIONOTE;
    payload?: any;
}

export interface GetBionote {
    type: BionoteActionType.USER_GET_BIONOTES;
    payload?: any;
}

export type BionoteAction =
    | AddBionote
    | UpdateBionote
    | DeleteBionote
    | GetBionote;
