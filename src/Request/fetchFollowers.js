import {getStateFromStore} from "../index";
import {call, put} from "redux-saga/es/effects";
import isError from "./isError";

// Action Creators
const requestAddit = () => {
    return { type: 'REQUESTED_FOLLOWERS'}
};

const requestAdditSuccess = (data) => {
    return { type: 'FOLLOWERS', list: data}
};

const requestAdditError = (error) => {
    return { type: 'REQUESTED_FOLLOWERS_FAILED', errorMessage: error}
};

export default function* fetchFollowersAsync() {
    let state = getStateFromStore();
    let url = state.reducerUser.user.followers_url;
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