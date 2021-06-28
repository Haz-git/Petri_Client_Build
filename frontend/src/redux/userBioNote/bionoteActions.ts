import api from '../../api';
import { Dispatch } from 'redux';
import { BionoteActionType } from './action-types';
import { BionoteAction } from './bionoteInterfaces';

import history from '../../historyObject';
import { v4 as uuid } from 'uuid';

interface State {
    //Indexable Type:
    auth: {
        userLogIn: {
            data: {
                _id: string;
            };
        };
    };
}

export function createNewBioNote(bioName: string, htmlState: any) {
    return async (dispatch: Dispatch<BionoteAction>, getState: () => State) => {
        const {
            auth: {
                userLogIn: {
                    data: { _id },
                },
            },
        } = getState();

        //Generating unique ID for the bionote:

        const bionote_ID = uuid();

        const response = await api.post('/users/bionote/create', {
            _id,
            bionote_ID,
            bioName,
            htmlState,
        });

        dispatch({
            type: BionoteActionType.USER_ADD_BIONOTE,
            payload: response.data.userNewBioNotesCollection.bionotes,
        });

        history.push('/createbionote');
    };
}

export function getBioNotes() {
    return async (dispatch: Dispatch<BionoteAction>, getState: () => State) => {
        const {
            auth: {
                userLogIn: {
                    data: { _id },
                },
            },
        } = getState();

        const response = await api.post('/users/bionote/load', { _id });

        dispatch({
            type: BionoteActionType.USER_GET_BIONOTES,
            payload: response.data.userExistingBioNotesCollection.bionotes,
        });
    };
}

export function updateBioNote(bionote_ID: any, updatedHTMLState: any) {
    return async (dispatch: Dispatch<BionoteAction>, getState: () => State) => {
        const {
            auth: {
                userLogIn: {
                    data: { _id },
                },
            },
        } = getState();

        //This data object is too large to store on mongoDB ~ >16 mb. We'll need to figure out a way to store this. Check out GridFS for mongodb. The alternative is to prevent the user from storing images as base 64 to prevent huge documents.

        //Ultimately, I went for the latter. Storing images and uploading personal files are not an option at the moment. This decision was made with the use-case of this feature in the app in mind. In a survey of the lab group, it turns out many members will not use this feature anyways.

        const response = await api.patch('/users/bionote/update', {
            _id,
            bionote_ID,
            updatedHTMLState,
        });

        dispatch({
            type: BionoteActionType.USER_UPDATE_BIONOTE,
            payload: response.data.updatedUserBioNoteCollection.bionotes,
        });

        history.push('/createbionote');
    };
}

export function deleteBioNote(bionote_ID: any) {
    return async (dispatch: Dispatch<BionoteAction>, getState: () => State) => {
        const {
            auth: {
                userLogIn: {
                    data: { _id },
                },
            },
        } = getState();

        const response = await api.patch('/users/bionote/delete', {
            _id,
            bionote_ID,
        });

        dispatch({
            type: BionoteActionType.USER_DELETE_BIONOTE,
            payload: response.data.deletedUserBioNoteCollection.bionotes,
        });

        //history object to push to '/createbionote'
        history.push('/createbionote');
    };
}
