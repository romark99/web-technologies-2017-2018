import {call, put} from 'redux-saga/effects';
import isError from './isError';
import {
    requestSmth, requestSearchReposSuccess,
    requestError, requestSuccess, requestDeleteAll
} from '../actions';



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
                + (filterWithoutStars ? 'stars:0' : '');
        }
    }
    return str;
};

export function* fetchSearchReposAsync() {
    let repo = document.getElementById('repo').value;
    let filterJS = document.getElementById('filterJavaScript').checked;
    let filterWithoutStars =
        document.getElementById('filterWithoutStars').checked;
    try {
        yield put(requestSmth());
        yield put(requestDeleteAll());
        const data = yield call(() => {
            return fetch(getUrl(repo, filterJS, filterWithoutStars))
                .then(response => isError(response))
                .then(response => response.items);
        });
        yield put(requestSearchReposSuccess(data));
        yield put(requestSuccess());
    } catch (error) {
        yield put(requestError(error));
    }
}
