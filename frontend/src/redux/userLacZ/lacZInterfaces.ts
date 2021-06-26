import { LacZActionType } from './action-types';

//PROTOCOL-BASED ACTION INTERFACES

export interface IAddProtocol {
    type: LacZActionType.USER_ADD_PROTOCOL;
    payload?: any;
}

export interface IDeleteProtocol {
    type: LacZActionType.USER_DELETE_PROTOCOL;
    payload?: any;
}

export interface IEditProtocol {
    type: LacZActionType.USER_EDIT_NAME_PROTOCOL;
    payload?: any;
}

export interface IGetProtocol {
    type: LacZActionType.USER_GET_PROTOCOL;
    payload?: any;
}

//COLLECTION-BASED ACTION INTERFACES

export interface IAddStrain {
    type: LacZActionType.USER_ADD_STRAIN_TO_COLLECTION;
    payload?: any;
}

export interface IEditStrain {
    type: LacZActionType.USER_EDIT_STRAIN_IN_COLLECTION;
    payload?: any;
}

export interface IDeleteStrain {
    type: LacZActionType.USER_REMOVE_STRAIN_FROM_COLLECTION;
    payload?: any;
}

export interface IGetStrain {
    type: LacZActionType.USER_GET_STRAINS_FROM_COLLECTION;
    payload?: any;
}

export interface IAddCollection {
    type: LacZActionType.USER_ADD_COLLECTION_DATA_TO_STRAIN;
    payload?: any;
}

export interface IAddCollectionParsed {
    type: LacZActionType.USER_ADD_COLLECTION_PARSED_DATA_TO_STRAIN;
    payload?: any;
}

export interface IAddLacZ {
    type: LacZActionType.USER_ADD_LACZ_DATA_TO_STRAIN;
    payload?: any;
}

export interface IAddBgal {
    type: LacZActionType.USER_ADD_BGAL_DATA_TO_STRAIN;
    payload?: any;
}

//Added union type for easier interface access in reducer

export type ILacZ =
    | IAddProtocol
    | IDeleteProtocol
    | IEditProtocol
    | IGetProtocol
    | IAddStrain
    | IEditStrain
    | IDeleteStrain
    | IGetStrain
    | IAddCollection
    | IAddCollectionParsed
    | IAddLacZ
    | IAddBgal;
