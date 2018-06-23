import {call, put} from "redux-saga/es/effects";
import isError from "./isError";

// Action Creators
const requestAddit = () => {
    return { type: 'REQUESTED'}
};

const requestAdditSuccess = (data) => {
    return { type: 'SEARCH_REPOS', list: data}
};

const requestSuccess = ()=> {
    return {type: 'SUCCEEDED'}
};

const requestAdditError = (error) => {
    return { type: 'FAILED', errorMessage: error.toString()}
};

const requestDeleteAll = () => {
    return {type: 'DELETE_ALL'}
};

const getUrl = (repo, filterJS, filterWithoutStars) => {
    let str = 'https://api.github.com/search/repositories?q=';
    if (repo !== '') {
        str = str
            + repo
            + (filterJS ? '+language:JavaScript' : '')
            + (filterWithoutStars ? '+stars:0' : '');
    } else {
        if (filterJS) {
            str = str
                + 'language:JavaScript'
                + (filterWithoutStars ? '+stars:0' : '');
        }
        else {
            str = str
                + (filterWithoutStars ? 'stars:0' : "''");
        }
    }
    return str;
};

export default function* fetchReposAsync() {
    let repo = document.getElementById("repo").value;
    let filterJS = document.getElementById("filterJavaScript").checked;
    let filterWithoutStars = document.getElementById("filterWithoutStars").checked;
    try {
        yield put(requestAddit());
        yield put(requestDeleteAll());
        const data = yield call(() => {
            return fetch(getUrl(repo, filterJS, filterWithoutStars))
                .then(response => isError(response))
                .then(response => response.items)
        });
        yield put(requestAdditSuccess(data));
        yield put(requestSuccess());
    } catch (error) {
        yield put(requestAdditError(error))
    }
}