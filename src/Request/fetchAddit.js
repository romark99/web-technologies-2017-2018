import {getStateFromStore} from '../index';
import {call, put} from 'redux-saga/es/effects';
import isError from './isError';

// Action Creators
function requestAddit () {
    return { type: 'REQUESTED'};
}

function requestAdditSuccess (data) {
    return { type: 'ADDITIONALLY', list: data};
}

function requestAdditError (error) {
    return { type: 'FAILED', errorMessage: error};
}

export function requestSuccess () {
    return {type: 'SUCCEEDED'};
}

export default function* fetchAdditAsync() {
    let state = getStateFromStore();
    let url = state.reducerUser.user.organizations_url;
    try {
        yield put(requestAddit());
        const data = yield call(() => {
            return fetch(url)
                .then(response => isError(response));
        });
        yield put(requestAdditSuccess(data));
        yield put(requestSuccess());
    } catch (error) {
        yield put(requestAdditError(error));
    }
}
