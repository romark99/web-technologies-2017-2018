import * as actions from '../actions';

describe('requestSuccess', () => {
    it('should return success action', () => {
        const data = 'some data';
        const expectedAction = {
            type: 'SUCCEEDED',
        };
        expect(actions.requestSuccess()).toEqual(expectedAction);
    });
});

function power(x) {
    return x*x;
}

describe('power', () => {
    it('should compute the sqare of x', function () {
        expect(power(2)).toEqual(4);
    });
});
