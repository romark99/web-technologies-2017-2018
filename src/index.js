import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {takeEvery} from 'redux-saga';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import {fetchUserAsync} from './Request/fetchUser';
import createSagaMiddleware from 'redux-saga';
import {fetchAdditAsync} from './Request/fetchAddit';
import {fetchFollowersAsync} from './Request/fetchFollowers';
import {fetchReposAsync} from './Request/fetchRepos';
import {fetchSearchReposAsync} from './Request/fetchSearchRepos';
import {fetchSearchPopularAsync} from './Request/fetchSearchPopular';
import {fetchSearchNewestAsync} from './Request/fetchSearchNewest';

const gaearon = {
    login: 'gaearon',
    id: 810438,
    avatar_url: 'https://avatars0.githubusercontent.com/u/810438?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/gaearon',
    html_url: 'https://github.com/gaearon',
    followers_url: 'https://api.github.com/users/gaearon/followers',
    following_url:
        'https://api.github.com/users/gaearon/following{/other_user}',
    gists_url: 'https://api.github.com/users/gaearon/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/gaearon/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/gaearon/subscriptions',
    organizations_url: 'https://api.github.com/users/gaearon/orgs',
    repos_url: 'https://api.github.com/users/gaearon/repos',
    events_url: 'https://api.github.com/users/gaearon/events{/privacy}',
    received_events_url: 'https://api.github.com/users/gaearon/received_events',
    type: 'User',
    site_admin: false,
    name: 'Dan Abramov',
    company: '@facebook ',
    blog: 'http://twitter.com/dan_abramov',
    location: 'London, UK',
    email: null,
    hireable: null,
    bio: 'Working on @reactjs.' +
    ' Co-author of Redux and Create React App. Building tools for humans.',
    public_repos: 226,
    public_gists: 60,
    followers: 29240,
    following: 171,
    created_at: '2011-05-25T18:18:31Z',
    updated_at: '2018-04-19T01:00:14Z'
};

function anotherButton(prop, state, obj, type, list) {
    let obj2 = type?{inf: 'No information', mode: 'READ'}:{
        list: list
    };
    if (!(prop in state) || state[prop].list.length === 0) {
        obj = Object.assign({}, obj, {[prop]: obj2});
    }
    let arr = Object.getOwnPropertyNames(obj);
    for (let i=0; i<arr.length; i++) {
        if (arr[i]!==prop
            && arr[i]!=='shown'
            && obj[arr[i]]
            && typeof obj[arr[i]] === 'object'
            && 'mode' in obj[arr[i]]) {
            obj = Object.assign({}, obj, {[arr[i]]:
                    Object.assign({}, obj[arr[i]], {mode: 'READ'})});
        }
    }
    return Object.assign({}, obj, {shown: prop});
}

const reducerUser = ( state={user:gaearon, loading:false, error:false},
                      action) => {
    switch (action.type) {
        case 'REQUESTED':
            return Object.assign({}, state, {loading:true, error:false});
        case 'FAILED':
            return Object.assign({}, state,
                {loading:false, error:true, message: action.errorMessage});
        case 'REQUESTED_USER_SUCCEEDED':
            return Object.assign({}, state,
                {user: action.user, loading:false, error:false});
        case 'SUCCEEDED':
            return Object.assign({}, state, {loading:false, error:false});
        default:
            return state;
    }
};

const whatButton = (state={shown:null}, action) => {
    let obj = Object.assign({}, state);
    let str;
    switch (action.type) {
        case 'NONE':
            return Object.assign({}, obj, {shown: null});
        case 'MAIN': case 'EDUCATION': case 'CONTACTS':
            return anotherButton(action.type, state, obj, true);
        case 'ADDITIONALLY':
        case 'FOLLOWERS': case 'REPOS': case 'SEARCH_REPOS':
        case 'SEARCH_POPULAR': case 'SEARCH_NEWEST':
            return Object.assign(
                {}, state,
                anotherButton(action.type, state, obj, false, action.list));
        case 'SHOW_SEARCH_REPOS':
            return Object.assign(
                {}, state,
                anotherButton('SEARCH_REPOS', state, obj, false, []));
        case 'WRITING':
            str = obj.shown;
            return Object.assign(
                {}, obj, {[str]:
                        Object.assign({}, obj[str], {mode: 'WRITE'})});
        case 'SAVING':
            str = obj.shown;
            return Object.assign(
                {}, obj, {[str]:
                        Object.assign(
                            {}, obj[str], {mode: 'READ', inf: action.text})
                });
        case 'DELETE_ALL':
            return Object.assign({}, {shown:null});
        default:
            return state;
    }
};

const userApp = combineReducers({
    reducerUser,
    whatButton
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(userApp, applyMiddleware(sagaMiddleware));

function* watchFetches() {
    yield takeEvery('FETCHED_USER', fetchUserAsync);
    yield takeEvery('FETCHED_ADDIT', fetchAdditAsync);
    yield takeEvery('FETCHED_FOLLOWERS', fetchFollowersAsync);
    yield takeEvery('FETCHED_REPOS', fetchReposAsync);
    yield takeEvery('FETCHED_SEARCH_REPOS', fetchSearchReposAsync);
    yield takeEvery('FETCHED_SEARCH_POPULAR', fetchSearchPopularAsync);
    yield takeEvery('FETCHED_SEARCH_NEWEST', fetchSearchNewestAsync);
}

sagaMiddleware.run(watchFetches);

const render = () => {
    ReactDOM.render(<App />, document.getElementById('root'));
    console.log(store.getState());
};

store.subscribe(render);
render();

export default store;
export function getStateFromStore() {
    return store.getState();
}
export function getRender() {
    return render;
}
