import {call, put} from 'redux-saga/effects';
import isError from './isError';
import {requestSmth, requestSearchPopularSuccess,
    requestError, requestSuccess} from '../actions';

const getUrl = () => {
    let str =
        'https://api.github.com/search/repositories?q=stars:>1&sort=stars';
    return str;
};

export function* fetchSearchPopularAsync() {
    let url = getUrl();
    try {
        yield put(requestSmth());
        const data = yield call(() => {
            return fetch(url)
                .then(response => isError(response))
                .then(response => response.items);
        });
        yield put(requestSearchPopularSuccess(data));
        yield put(requestSuccess());
    } catch (error) {
        yield put(requestError(error));
    }
}
