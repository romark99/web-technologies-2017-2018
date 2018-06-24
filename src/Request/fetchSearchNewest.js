import {call, put} from 'redux-saga/effects';
import isError from './isError';
import {requestSmth, requestSearchNewestSuccess,
    requestError, requestSuccess} from '../actions';

const getWeekAgoDate = () => {
    let today = new Date();
    today.setDate(today.getDate() - 7);
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd;
    }

    if(mm<10) {
        mm = '0'+mm;
    }

    return yyyy + '-' + mm + '-' + dd;
};

const getUrl = () => {
    let str =
        'https://api.github.com/search/repositories?q=stars:>=1+created:>='
        +getWeekAgoDate()
        +'&sort=stars';
    return str;
};

export function* fetchSearchNewestAsync() {
    let url = getUrl();
    try {
        yield put(requestSmth());
        const data = yield call(() => {
            return fetch(url)
                .then(response => isError(response))
                .then(response => response.items);
        });
        yield put(requestSearchNewestSuccess(data));
        yield put(requestSuccess());
    } catch (error) {
        yield put(requestError(error));
    }
}
