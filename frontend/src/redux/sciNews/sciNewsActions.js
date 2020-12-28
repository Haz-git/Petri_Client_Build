import axios from 'axios';
import { USER_GET_NEWS } from './sciNewsTypes';


export function getNews() {
    return async dispatch => {

        const response = await axios.get('https://gnews.io/api/v4/top-headlines?topic=science&lang=en&country=us&token=dcb305090c56e2139f572d0533ff0802');

        dispatch({
            type: USER_GET_NEWS,
            payload: response,
        })
    }
}