import axios from 'axios';
import { USER_GET_NEWS } from './sciNewsTypes';

export function getNews() {
    return async dispatch => {

        const response = await axios.get('https://newsapi.org/v2/top-headlines?category=science&country=us&apiKey=3c9c2e2fa85142fb957890523a2bc4fc');

        dispatch({
            type: USER_GET_NEWS,
            payload: response,
        })
    }
}