// Action Creators
export function requestSmth () {
    return { type: 'REQUESTED'};
}

export function requestSuccess () {
    return {type: 'SUCCEEDED'};
}

export function requestAdditSuccess (data) {
    return { type: 'ADDITIONALLY', list: data};
}

export function requestError (error) {
    return { type: 'FAILED', errorMessage: error.toString()};
}

export function requestFollowersSuccess (data) {
    return { type: 'FOLLOWERS', list: data};
}

export function requestReposSuccess (data) {
    return { type: 'REPOS', list: data};
}

export function requestSearchNewestSuccess (data) {
    return { type: 'SEARCH_NEWEST', list: data};
}

export function requestSearchPopularSuccess (data) {
    return { type: 'SEARCH_POPULAR', list: data};
}

export function requestSearchReposSuccess (data) {
    return { type: 'SEARCH_REPOS', list: data};
}

export function requestDeleteAll () {
    return {type: 'DELETE_ALL'};
}

export function requestUserSuccess (data) {
    return { type: 'REQUESTED_USER_SUCCEEDED', user: data};
}
