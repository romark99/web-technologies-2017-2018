import {call, put} from 'redux-saga/es/effects';
import isError from './isError';

// Action Creators
const requestAddit = () => {
    return { type: 'REQUESTED'};
};

const requestAdditSuccess = (data) => {
    return { type: 'SEARCH_POPULAR', list: data};
};

const requestSuccess = ()=> {
    return {type: 'SUCCEEDED'};
};

const requestAdditError = (error) => {
    return { type: 'FAILED', errorMessage: error};
};

const getUrl = () => {
    let str =
        'https://api.github.com/search/repositories?q=stars:>1&sort=stars';
    return str;
};

export default function* fetchSearchPopular() {
    let url = getUrl();
    try {
        yield put(requestAddit());
        const data = yield call(() => {
            return fetch(url)
                .then(response => isError(response))
                .then(response => response.items);
        });
        yield put(requestAdditSuccess(data));
        yield put(requestSuccess());
    } catch (error) {
        yield put(requestAdditError(error));
    }
}
