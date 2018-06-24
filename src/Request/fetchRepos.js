import {getStateFromStore} from '../index';
import {call, put} from 'redux-saga/effects';
import {requestSmth, requestReposSuccess,
    requestError, requestSuccess} from '../actions';
import isError from './isError';

export function* fetchReposAsync() {
    let state = getStateFromStore();
    let url = state.reducerUser.user.repos_url;
    try {
        yield put(requestSmth());
        const data = yield call(() => {
            return fetch(url)
                .then(response => isError(response));
        });
        yield put(requestReposSuccess(data));
        yield put(requestSuccess());
    } catch (error) {
        yield put(requestError(error));
    }
}
