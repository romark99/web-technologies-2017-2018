const controllers = require("../controllers");

describe('Controllers', () => {

    describe('sum(a, b)', () => {
        test("adds 1 + 2 to equal 3", () => {
            expect(controllers.sum(1, 2)).toBe(3);
        });

        test("adds 2 + 2 not to equal 5", () => {
            expect(controllers.sum(2,2)).not.toBe(5);
        });
    });

    describe('isError(res, error)', () => {
        test("adds 1 + 2 to equal 3", () => {
            expect(controllers.sum(1, 2)).toBe(3);
        });

        test("adds 2 + 2 not to equal 5", () => {
            expect(controllers.sum(2,2)).not.toBe(5);
        });
    });
});
