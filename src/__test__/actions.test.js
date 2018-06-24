import * as actions from '../actions';

const data1 = 'some data';
const data2 = [{data: 'another data'}];
const textError = 'Already text error';
const error = new Error(textError);

describe('ACTIONS:', () => {
    it('should check requestSuccess', () => {
        const expectedAction = {
            type: 'SUCCEEDED',
        };
        expect(actions.requestSuccess()).toEqual(expectedAction);
    });

    it('should check requestSmth', () => {
        const expectedAction = {
            type: 'REQUESTED',
        };
        expect(actions.requestSmth()).toEqual(expectedAction);
    });

    it('should check requestDeleteAll', () => {
        const expectedAction = {
            type: 'DELETE_ALL',
        };
        expect(actions.requestDeleteAll()).toEqual(expectedAction);
    });

    it('should check requestFollowersSuccess', () => {
        const expectedAction1 = {
            type: 'FOLLOWERS',
            list: data1
        };
        const expectedAction2 = {
            type: 'FOLLOWERS',
            list: data2
        };
        expect(actions.requestFollowersSuccess(data1)).toEqual(expectedAction1);
        expect(actions.requestFollowersSuccess(data2)).toEqual(expectedAction2);
    });

    it('should check requestReposSuccess', () => {
        const expectedAction1 = {
            type: 'REPOS',
            list: data1
        };
        const expectedAction2 = {
            type: 'REPOS',
            list: data2
        };
        expect(actions.requestReposSuccess(data1)).toEqual(expectedAction1);
        expect(actions.requestReposSuccess(data2)).toEqual(expectedAction2);
    });

    it('should check requestAdditSuccess', () => {
        const expectedAction1 = {
            type: 'ADDITIONALLY',
            list: data1
        };
        const expectedAction2 = {
            type: 'ADDITIONALLY',
            list: data2
        };
        expect(actions.requestAdditSuccess(data1)).toEqual(expectedAction1);
        expect(actions.requestAdditSuccess(data2)).toEqual(expectedAction2);
    });

    it('should check requestSearchNewestSuccess', () => {
        const expectedAction1 = {
            type: 'SEARCH_NEWEST',
            list: data1
        };
        const expectedAction2 = {
            type: 'SEARCH_NEWEST',
            list: data2
        };
        expect(actions.requestSearchNewestSuccess(data1))
            .toEqual(expectedAction1);
        expect(actions.requestSearchNewestSuccess(data2))
            .toEqual(expectedAction2);
    });

    it('should check requestSearchPopularSuccess', () => {
        const expectedAction1 = {
            type: 'SEARCH_POPULAR',
            list: data1
        };
        const expectedAction2 = {
            type: 'SEARCH_POPULAR',
            list: data2
        };
        expect(actions.requestSearchPopularSuccess(data1))
            .toEqual(expectedAction1);
        expect(actions.requestSearchPopularSuccess(data2))
            .toEqual(expectedAction2);
    });

    it('should check requestSearchReposSuccess', () => {
        const expectedAction1 = {
            type: 'SEARCH_REPOS',
            list: data1
        };
        const expectedAction2 = {
            type: 'SEARCH_REPOS',
            list: data2
        };
        expect(actions.requestSearchReposSuccess(data1))
            .toEqual(expectedAction1);
        expect(actions.requestSearchReposSuccess(data2))
            .toEqual(expectedAction2);
    });

    it('should check requestUserSuccess', () => {
        const expectedAction1 = {
            type: 'REQUESTED_USER_SUCCEEDED',
            list: data1
        };
        const expectedAction2 = {
            type: 'REQUESTED_USER_SUCCEEDED',
            list: data2
        };
        expect(actions.requestUserSuccess(data1))
            .toEqual(expectedAction1);
        expect(actions.requestUserSuccess(data2))
            .toEqual(expectedAction2);
    });

    it('should check requestError', () => {
        const expectedAction = {
            type: 'FAILED',
            errorMessage: textError
        };
        expect(actions.requestError(error))
            .toEqual(expectedAction);
        expect(actions.requestError(textError))
            .toEqual(expectedAction);
    });
});
