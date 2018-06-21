import store from "../index";
import {makeErrorPage} from "../AppError";
import {getStateFromStore} from "../index";
import isError from "./isError"

const funcAll = (what) => {
    return function () {
        let state = getStateFromStore();
        let url;
        switch (what) {
            case 'ADDITIONALLY':
                url = state.reducerUser.user.organizations_url;
                break;
            case 'FOLLOWERS':
                url = state.reducerUser.user.followers_url;
                break;
            case 'REPOS':
                url = state.reducerUser.user.repos_url;
                break;
        }
        fetch(url)
            .then(response=>isError(response))
            .then(responseJSON => {
                store.dispatch({
                    type: what,
                    list: responseJSON
                });
            }).catch(e => makeErrorPage(e));
    }
};

const funcAddit = funcAll('ADDITIONALLY');
const funcFollowers = funcAll('FOLLOWERS');
const funcRepos = funcAll('REPOS');

export {funcAddit, funcFollowers, funcRepos};