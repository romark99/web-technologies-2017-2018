import {put, call} from "redux-saga/effects"
import isError from "./isError";

function getPageURL(name) {
    return 'https://api.github.com/users/' + name;
}

//Saga
function* fetchUserAsync() {
    let userLogin = document.getElementById("nickname").value;
    try{
        yield put(requestUser());
        const data = yield call(() => {
            return fetch(getPageURL(userLogin))
                .then(response => isError(response));
        });
        yield put(requestUserSuccess(data));
        yield put(requestDeleteAll());
    } catch (error) {
        yield put(requestUserError(error));
    }
}

// Action Creators
const requestUser = () => {
    return { type: 'REQUESTED' }
};

const requestUserSuccess = (data) => {
    return { type: 'REQUESTED_USER_SUCCEEDED', user: data}
};

const requestUserError = (error) => {
    return { type: 'FAILED', errorMessage: error.toString()}
};

const requestDeleteAll = () => {
    return {type: 'DELETE_ALL'}
};

export default fetchUserAsync;