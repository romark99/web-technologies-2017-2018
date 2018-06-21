import store from "../index";
import {makeErrorPage} from "../AppError";
import {getStateFromStore} from "../index";
import isError from "./isError"

// function getAdditional(name) {
//     return 'https://api.github.com/users/' + name + '/orgs';
// }
//
// let funcAddit = (what)=> {
//     let foo;
//     switch (what) {
//         case 'ADDITIONALLY':
//             foo = (name) => 'https://api.github.com/users/' + name + '/orgs';
//             break;
//         case 'FOLLOWERS':
//             foo = (name) => 'https://api.github.com/users/' + name + '/followers';
//             break;
//         case 'REPOS':
//             foo = (name) => 'https://api.github.com/users/' + name + '/repos';
//             break;
//     }
//     let state = getStateFromStore();
//     fetch(foo(state.reducerUser.user.login))
//         .then(response=>isError(response))
//         .then(responseJSON => {
//             store.dispatch({
//                 type: what,
//                 list: responseJSON
//             });
//         }).catch(e => makeErrorPage(e));
// };

let funcAdditional = (what) => {
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
    return function () {
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

export {funcAdditional};