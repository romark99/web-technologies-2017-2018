import {getStateFromStore} from "../index";
import {call, put} from "redux-saga/es/effects";
import isError from "./isError";

// Action Creators
const requestAddit = () => {
    return { type: 'REQUESTED'}
};

const requestAdditSuccess = (data) => {
    return { type: 'SEARCH_NEWEST', list: data}
};

const requestSuccess = ()=> {
    return {type: 'SUCCEEDED'}
};

const requestAdditError = (error) => {
    return { type: 'FAILED', errorMessage: error}
};

const getWeekAgoDate = () => {
    let today = new Date();
    today.setDate(today.getDate() - 7);
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    }

    if(mm<10) {
        mm = '0'+mm
    }

    return yyyy + '-' + mm + '-' + dd;
};

const getUrl = () => {
    let str = 'https://api.github.com/search/repositories?q=stars:>=1+created:>='+getWeekAgoDate()+'&sort=stars';
    return str;
};

export default function* fetchSearchNewest() {
    let state = getStateFromStore();
    let url = getUrl();
    try {
        yield put(requestAddit());
        const data = yield call(() => {
            return fetch(url)
                .then(response => isError(response))
                .then(response => response.items);
        });
        yield put(requestAdditSuccess(data));
        yield put(requestSuccess());
    } catch (error) {
        yield put(requestAdditError(error))
    }
}