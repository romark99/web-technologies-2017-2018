import {getStateFromStore} from '../index';
import {call, put} from 'redux-saga/effects';
import isError from './isError';
import {requestSmth, requestAdditSuccess,
    requestError, requestSuccess} from '../actions';

export function* fetchAdditAsync() {
    let state = getStateFromStore();
    let url = state.reducerUser.user.organizations_url;
    try {
        yield put(requestSmth());
        const data = yield call(() => {
            return fetch(url)
                .then(response => isError(response));
        });
        yield put(requestAdditSuccess(data));
        yield put(requestSuccess());
    } catch (error) {
        yield put(requestError(error));
    }
}
