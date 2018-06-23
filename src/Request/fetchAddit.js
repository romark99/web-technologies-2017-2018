import {getStateFromStore} from '../index';
import {call, put} from 'redux-saga/es/effects';
import isError from './isError';

// Action Creators
const requestAddit = () => {
    return { type: 'REQUESTED'};
};

const requestAdditSuccess = (data) => {
    return { type: 'ADDITIONALLY', list: data};
};

const requestAdditError = (error) => {
    return { type: 'FAILED', errorMessage: error};
};

const requestSuccess = ()=> {
    return {type: 'SUCCEEDED'};
};

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
