import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {combineReducers, createStore} from 'redux'

const fetch = (state={user:{}}, action) => {
    switch (action.type) {
        case 'FETCH':
            console.log(state);
            return {
                ...state,
                user: action.user
            };
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
render();

export default store;