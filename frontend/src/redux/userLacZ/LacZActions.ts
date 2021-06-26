import api from '../../api';
import { Dispatch } from 'redux';
import { LacZActionType } from './action-types';
import { ILacZ } from './lacZInterfaces';

interface State {
    //Indexable Type:
    auth: {
        userLogIn: {
            data: {
                _id: String;
            };
        };
    };
}

export function getProtocols() {
    return async (dispatch: Dispatch<ILacZ>, getState: () => State) => {
        const {
            auth: {
                userLogIn: {
                    data: { _id },
                },
            },
        } = getState();

        const response = await api.post('/users/scitools/lacz/get', { _id });

        dispatch({
            type: LacZActionType.USER_GET_PROTOCOL,
            payload: response.data.laczAssayProtocols,
        });
    };
}

export function addNewProtocols(protocolName: String) {
    return async (dispatch: Dispatch<ILacZ>, getState: () => State) => {
        const {
            auth: {
                userLogIn: {
                    data: { _id },
                },
            },
        } = getState();

        const response = await api.post(`/users/scitools/lacz/add`, {
            protocolName,
            _id,
        });

        dispatch({
            type: LacZActionType.USER_ADD_PROTOCOL,
            payload: response.data.laczAssayProtocols,
        });
    };
}

export function editProtocolName(
    newProtocolName: String,
    currentProtocolId: String
) {
    return async (dispatch: Dispatch<ILacZ>, getState: () => State) => {
        const {
            auth: {
                userLogIn: {
                    data: { _id },
                },
            },
        } = getState();

        const response = await api.patch(`/users/scitools/lacz/edit`, {
            newProtocolName,
            currentProtocolId,
            _id,
        });

        dispatch({
            type: LacZActionType.USER_EDIT_NAME_PROTOCOL,
            payload: response.data.laczAssayProtocols,
        });
    };
}

export function deleteProtocol(currentProtocolId: String) {
    return async (dispatch: Dispatch<ILacZ>, getState: () => State) => {
        const {
            auth: {
                userLogIn: {
                    data: { _id },
                },
            },
        } = getState();

        const response = await api.post(`/users/scitools/lacz/delete`, {
            currentProtocolId,
            _id,
        });

        dispatch({
            type: LacZActionType.USER_EDIT_NAME_PROTOCOL,
            payload: response.data.laczAssayProtocols,
        });
    };
}

export function addStrainToCollection(
    collectionsObject: Object,
    currentProtocolId: String
) {
    return async (dispatch: Dispatch<ILacZ>, getState: () => State) => {
        const {
            auth: {
                userLogIn: {
                    data: { _id },
                },
            },
        } = getState();

        const response = await api.post(
            '/users/scitools/lacz/collection/addStrainToCollection',
            {
                collectionsObject,
                currentProtocolId,
                _id,
            }
        );

        //Successfully appending modified strains to collectionStrains array. Just need to render the state of that on the screen using collectionStrains...do we even need a getallStrains()?? I don't think so.

        dispatch({
            type: LacZActionType.USER_ADD_STRAIN_TO_COLLECTION,
            payload: response.data.laczAssayProtocols,
        });
    };
}

export function deleteStrainFromCollection(
    strainId: String,
    protocolId: String
) {
    return async (dispatch: Dispatch<ILacZ>, getState: () => State) => {
        const {
            auth: {
                userLogIn: {
                    data: { _id },
                },
            },
        } = getState();

        const response = await api.post(
            '/users/scitools/lacz/collection/deleteStrain',
            {
                _id,
                currentStrainId: strainId,
                currentProtocolId: protocolId,
            }
        );

        dispatch({
            type: LacZActionType.USER_REMOVE_STRAIN_FROM_COLLECTION,
            payload: response.data.laczAssayProtocols,
        });
    };
}

export function addCollectionInputDataToStrain(
    strainId: String,
    protocolId: String,
    inputArray: any
) {
    return async (dispatch: Dispatch<ILacZ>, getState: () => State) => {
        const {
            auth: {
                userLogIn: {
                    data: { _id },
                },
            },
        } = getState();

        const response = await api.post(
            '/users/scitools/lacz/collection/addCollectionData',
            {
                _id,
                currentStrainId: strainId,
                currentProtocolId: protocolId,
                collectionData: inputArray,
            }
        );

        dispatch({
            type: LacZActionType.USER_ADD_COLLECTION_DATA_TO_STRAIN,
            payload: response.data.laczAssayProtocols,
        });
    };
}

export function addCollectionChartParsedData(
    protocolId: String,
    newArray: any
) {
    return async (dispatch: Dispatch<ILacZ>, getState: () => State) => {
        const {
            auth: {
                userLogIn: {
                    data: { _id },
                },
            },
        } = getState();

        const response = await api.post(
            '/users/scitools/lacz/collection/updateParsedData',
            {
                _id,
                currentProtocolId: protocolId,
                parsedData: newArray,
            }
        );

        dispatch({
            type: LacZActionType.USER_ADD_COLLECTION_PARSED_DATA_TO_STRAIN,
            payload: response.data.laczAssayProtocols,
        });
    };
}

export function addlacZDataToStrain(
    strainId: String,
    protocolId: String,
    lacZArray: any,
    minutes: any,
    volume: any
) {
    return async (dispatch: Dispatch<ILacZ>, getState: () => State) => {
        const {
            auth: {
                userLogIn: {
                    data: { _id },
                },
            },
        } = getState();

        const response = await api.post(
            '/users/scitools/lacz/laczdata/addLacZData',
            {
                _id,
                currentStrainId: strainId,
                currentProtocolId: protocolId,
                lacZData: lacZArray,
                lacZMinutesTaken: minutes,
                lacZVolumeUsed: volume,
            }
        );

        dispatch({
            type: LacZActionType.USER_ADD_LACZ_DATA_TO_STRAIN,
            payload: response.data.laczAssayProtocols,
        });
    };
}

export function bgalDataToStrain(
    strainId: String,
    protocolId: String,
    bgalData: any
) {
    return async (dispatch: Dispatch<ILacZ>, getState: () => State) => {
        const {
            auth: {
                userLogIn: {
                    data: { _id },
                },
            },
        } = getState();

        const response = await api.post(
            '/users/scitools/lacz/laczdata/addbgaldata',
            {
                _id,
                currentStrainId: strainId,
                currentProtocolId: protocolId,
                bgalData: bgalData,
            }
        );

        dispatch({
            type: LacZActionType.USER_ADD_BGAL_DATA_TO_STRAIN,
            payload: response.data.laczAssayProtocols,
        });
    };
}
