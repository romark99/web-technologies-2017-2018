const services = require("../services");

describe('Services', () => {

    describe('getMovies()', () => {
        test("return movies", () => {

            const movies = services.getMovies();
            expect(Array.isArray(movies)).toBe(true);

            movies.forEach((element) => {
                expect(element).toHaveProperty('id');
                expect(element).toHaveProperty('title');
                expect(element).toHaveProperty('popularity');
                expect(element).toHaveProperty('vote_count');
                expect(element).toHaveProperty('release_date');
                expect(element).toHaveProperty('overview');
            });
        });
    });

});