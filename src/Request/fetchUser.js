import {put, call} from 'redux-saga/effects';
import isError from './isError';
import {
    requestSmth, requestUserSuccess,
    requestError, requestSuccess, requestDeleteAll
} from '../actions';

function getPageURL(name) {
    return 'https://api.github.com/users/' + name;
}

//Saga
function* fetchUserAsync() {
    let userLogin = document.getElementById('nickname').value;
    try{
        yield put(requestSmth());
        const data = yield call(() => {
            return fetch(getPageURL(userLogin))
                .then(response => isError(response));
        });
        yield put(requestUserSuccess(data));
        yield put(requestDeleteAll());
        yield put(requestSuccess());
    } catch (error) {
        yield put(requestError(error));
    }
}



export {fetchUserAsync};
