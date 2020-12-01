import api from '../../api';
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

export function getProtocols() {
    return async (dispatch, getState) => {
        const { auth: { userLogIn: { data: { _id } }} } = getState();

        const response = await api.post('/users/scitools/lacz/get', { _id });

        dispatch({
            type: USER_GET_PROTOCOL,
            payload: response.data.laczAssayProtocols,
        })
    }
}

export function addNewProtocols(protocolName) {
    return async (dispatch, getState) => {
        const { auth: { userLogIn: { data: { _id } } } } = getState();

        const response = await api.post(`/users/scitools/lacz/add`, { protocolName, _id });

        dispatch({
            type: USER_ADD_PROTOCOL,
            payload: response.data.laczAssayProtocols,
        });
    }
}

export function editProtocolName(newProtocolName, currentProtocolId) {
    return async (dispatch, getState) => {
        const { auth: { userLogIn: { data: { _id } } } } = getState();

        const response = await api.patch(`/users/scitools/lacz/edit`, {newProtocolName, currentProtocolId, _id});

        dispatch({
            type: USER_EDIT_NAME_PROTOCOL,
            payload: response.data.laczAssayProtocols,
        });

    }
}

export function deleteProtocol(currentProtocolId) {
    return async (dispatch, getState) => {
        const { auth: { userLogIn: { data: { _id } } } } = getState();

        const response = await api.post(`/users/scitools/lacz/delete`, {currentProtocolId, _id});

        dispatch({
            type: USER_EDIT_NAME_PROTOCOL,
            payload: response.data.laczAssayProtocols,
        });
    }
}

export function addStrainToCollection(collectionsObject, currentProtocolId) {
    return async (dispatch, getState) => {
        const { auth: { userLogIn: { data: { _id } } } } = getState();

        const response = await api.post('/users/scitools/lacz/collection/addStrainToCollection', {
            collectionsObject,
            currentProtocolId,
            _id
        })

        //Successfully appending modified strains to collectionStrains array. Just need to render the state of that on the screen using collectionStrains...do we even need a getallStrains()?? I don't think so.

        dispatch({
            type: USER_ADD_STRAIN_TO_COLLECTION,
            payload: response.data.laczAssayProtocols,
        })
    }
}

export function deleteStrainFromCollection(strainId, protocolId) {
    return async (dispatch, getState) => {
        const { auth: { userLogIn: { data: { _id } } } } = getState();
        
        const response = await api.post('/users/scitools/lacz/collection/deleteStrain', {
            _id,
            currentStrainId: strainId,
            currentProtocolId: protocolId,
        });

        dispatch({
            type: USER_REMOVE_STRAIN_FROM_COLLECTION,
            payload: response.data.laczAssayProtocols,
        })
    }
}

export function addCollectionInputDataToStrain(strainId, protocolId, inputArray) {
    return async (dispatch, getState) => {
        const { auth: { userLogIn: { data: { _id } } } } = getState();

        const response = await api.post('/users/scitools/lacz/collection/addCollectionData', {
            _id,
            currentStrainId: strainId,
            currentProtocolId: protocolId,
            collectionData: inputArray,
        })


        dispatch({
            type: USER_ADD_COLLECTION_DATA_TO_STRAIN,
            payload: response.data.laczAssayProtocols,
        })
    }
}

export function addCollectionChartParsedData(protocolId, newArray) {
    return async(dispatch, getState) => {
        const { auth: { userLogIn: { data: { _id } } } } = getState();

        const response = await api.post('/users/scitools/lacz/collection/updateParsedData',{
            _id,
            currentProtocolId: protocolId,
            parsedData: newArray,
        })

        dispatch({
            type: USER_ADD_COLLECTION_PARSED_DATA_TO_STRAIN,
            payload: response.data.laczAssayProtocols,
        })
    }
}

export function addlacZDataToStrain(strainId, protocolId, lacZArray) {
    return async(dispatch, getState) => {
        const { auth: { userLogIn: { data: { _id } } } } = getState();

        const response = await api.post('/users/scitools/lacz/laczdata/addLacZData', {
            _id,
            currentStrainId: strainId,
            currentProtocolId: protocolId,
            lacZData: lacZArray,
        });

        dispatch({
            type: USER_ADD_LACZ_DATA_TO_STRAIN,
            payload: response.data.laczAssayProtocols,
        })
    }
}