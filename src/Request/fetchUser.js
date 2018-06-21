import store from "../index";
import {makeErrorPage} from "../AppError";
import {getStateFromStore} from "../index";
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
    return { type: 'REQUESTED_USER' }
};

const requestUserSuccess = (data) => {
    return { type: 'REQUESTED_USER_SUCCEEDED', user: data}
};

const requestUserError = (error) => {
    return { type: 'REQUESTED_USER_FAILED', errorMessage: error.toString()}
};

const requestDeleteAll = () => {
    return {type: 'DELETE_ALL'}
};


let func = (userLogin)=> {
    let state = getStateFromStore();
    if (userLogin!== state.reducerUser.user.login) {
        fetch(getPageURL(userLogin))
            .then(function (response) {
                if (response.status > 100 && response.status <= 400)
                    return response.json();
                else if (response.status === 404) {
                    throw new Error("Error 404: NOT FOUND");
                }
                else if (response.status > 400 && response.status < 500) {
                    throw new Error("Error " + response.status + ": SOME CLIENT ERROR");
                }
                else if (response.status > 500 && response.status < 600) {
                    throw new Error("Error " + response.status + ": SOME SERVER ERROR");
                }
                else {
                    throw new Error("Error " + response.status + ": UNEXPECTED STATE");
                }
            })
            .then(responseJSON => {
                store.dispatch({
                    type: "FETCH_USER",
                    user: responseJSON
                });
                store.dispatch({
                    type: "DELETE_ALL"
                })
            }).catch(e => makeErrorPage(e));
    }
};

export default fetchUserAsync;