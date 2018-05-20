import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {combineReducers, createStore} from 'redux'

const gaearon = {
    login: "gaearon",
    id: 810438,
    avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/gaearon",
    html_url: "https://github.com/gaearon",
    followers_url: "https://api.github.com/users/gaearon/followers",
    following_url: "https://api.github.com/users/gaearon/following{/other_user}",
    gists_url: "https://api.github.com/users/gaearon/gists{/gist_id}",
    starred_url: "https://api.github.com/users/gaearon/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/gaearon/subscriptions",
    organizations_url: "https://api.github.com/users/gaearon/orgs",
    repos_url: "https://api.github.com/users/gaearon/repos",
    events_url: "https://api.github.com/users/gaearon/events{/privacy}",
    received_events_url: "https://api.github.com/users/gaearon/received_events",
    type: "User",
    site_admin: false,
    name: "Dan Abramov",
    company: "@facebook ",
    blog: "http://twitter.com/dan_abramov",
    location: "London, UK",
    email: null,
    hireable: null,
    bio: "Working on @reactjs. Co-author of Redux and Create React App. Building tools for humans.",
    public_repos: 226,
    public_gists: 60,
    followers: 29240,
    following: 171,
    created_at: "2011-05-25T18:18:31Z",
    updated_at: "2018-04-19T01:00:14Z"
};

const fetch = (state={user:gaearon}, action) => {
    switch (action.type) {
        case 'FETCH':
            console.log(state);
            return Object.assign({}, state, {user: action.user});
        default:
            return state;
    }
};

const userApp = combineReducers({
   fetch
});

const store = createStore(userApp);

const render = () => {
    ReactDOM.render(<App />, document.getElementById('root'))
};

store.subscribe(render);
console.log(store.getState());
render();

export default store;
export function getUserFromStore() {
    return store.getState();
}