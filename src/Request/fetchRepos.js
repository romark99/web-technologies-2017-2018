import {getStateFromStore} from "../index";
import {call, put} from "redux-saga/es/effects";
import isError from "./isError";

// Action Creators
const requestAddit = () => {
    return { type: 'REQUESTED'}
};

const requestAdditSuccess = (data) => {
    return { type: 'REPOS', list: data}
};

const requestSuccess = ()=> {
    return {type: 'SUCCEEDED'}
};

const requestAdditError = (error) => {
    return { type: 'FAILED', errorMessage: error}
};

export default function* fetchReposAsync() {
    let state = getStateFromStore();
    let url = state.reducerUser.user.repos_url;
    try {
        yield put(requestAddit());
        const data = yield call(() => {
            return fetch(url)
                .then(response => isError(response));
        });
        yield put(requestAdditSuccess(data));
        yield put(requestSuccess());
    } catch (error) {
        yield put(requestAdditError(error))
    }
}