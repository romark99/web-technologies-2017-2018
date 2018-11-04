const controllers = require("../controllers")();

test("adds 1 + 2 to equal 3", () => {
    expect(controllers.sum(1, 2)).toBe(3);
});
