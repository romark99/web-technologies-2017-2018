import {getStateFromStore} from '../index';
import {call, put} from 'redux-saga/effects';
import {requestSmth, requestFollowersSuccess,
    requestError, requestSuccess} from '../actions';
import isError from './isError';

export function* fetchFollowersAsync() {
    let state = getStateFromStore();
    let url = state.reducerUser.user.followers_url;
    try {
        yield put(requestSmth());
        const data = yield call(() => {
            return fetch(url)
                .then(response => isError(response));
        });
        yield put(requestFollowersSuccess(data));
        yield put(requestSuccess());
    } catch (error) {
        yield put(requestError(error));
    }
}
