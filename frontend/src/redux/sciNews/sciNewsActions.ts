import axios from 'axios';
import { Dispatch } from 'redux';
import { SciNewsActionType } from './action-types';
import { GetNewsAction } from './sciNewsInterfaces';

export function getNews() {
    return async (dispatch: Dispatch<GetNewsAction>) => {
        const response = await axios.get(
            'https://gnews.io/api/v4/top-headlines?topic=science&lang=en&country=us&token=dcb305090c56e2139f572d0533ff0802'
        );

        dispatch({
            type: SciNewsActionType.USER_GET_NEWS,
            payload: response,
        });
    };
}
