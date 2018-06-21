import {getStateFromStore} from "../index";
import {call, put} from "redux-saga/es/effects";
import isError from "./isError";

// Action Creators
const requestAddit = () => {
    return { type: 'REQUESTED_ADDITIONALLY'}
};

const requestAdditSuccess = (data) => {
    return { type: 'ADDITIONALLY', list: data}
};

const requestAdditError = (error) => {
    return { type: 'REQUESTED_ADDITIONALLY_FAILED', errorMessage: error}
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
    } catch (error) {
        yield put(requestAdditError(error))
    }
}