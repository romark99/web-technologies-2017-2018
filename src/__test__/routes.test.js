const app = require("../../app");
const request = require("supertest");

describe('Integration test', () => {
    test("GET /", () => {
        return request(app)
            .get('/')
            .then((res) => {
                expect(res.status).toBe(200);
                expect(res.text).toBe('Hello API');
            });
    });

    test("GET /movies", () => {
        return request(app)
            .get('/movies')
            .then((res) => {
                const movies = res.body;
                expect(res.status).toBe(200);
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

    test("GET /movies/332562", () => {
        return request(app)
            .get('/movies/332562')
            .then((res) => {
                const movie = res.body;
                expect(res.status).toBe(200);
                expect(typeof movie).toBe('object');
                expect(movie).toHaveProperty('id', 332562);
                expect(movie).toHaveProperty('title');
                expect(movie).toHaveProperty('popularity');
                expect(movie).toHaveProperty('vote_count');
                expect(movie).toHaveProperty('release_date');
                expect(movie).toHaveProperty('overview');
            });
    });

    test("GET /movies/fgjhj", () => {
        return request(app)
            .get('/movies/fgjhj')
            .then((res) => {
                expect(res.status).toBe(400);
            });
    });

    test("GET /search/Harry", () => {
        return request(app)
            .get('/search/Harry')
            .then((res) => {
                expect(res.status).toBe(200);
                const movies = res.body;
                expect(Array.isArray(movies)).toBe(true);
                expect(movies.length).toBe(1);
                expect(movies[0]).toHaveProperty('title', "Harry Potter and the Philosopher's Stone");
            });
    });

    test("GET /pagination?offset=2&limit=1", () => {
        return request(app)
            .get('/pagination?offset=2&limit=1')
            .then((res) => {
                expect(res.status).toBe(200);
                const movies = res.body;
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

    test("GET /pagination?offset=-5&limit=1", () => {
        return request(app)
            .get('/pagination?offset=-5&limit=1')
            .then((res) => {
                expect(res.status).toBe(400);
            });
    });


    test("GET /sort?field=id&direction=asc", () => {
        return request(app)
            .get('/sort?field=id&direction=asc')
            .then((res) => {
                expect(res.status).toBe(200);
                const movies = res.body;
                expect(Array.isArray(movies)).toBe(true);
                expect(movies[0].id).toBe(671);
            });
    });

    test("GET /sort?field=title&direction=desc", () => {
        return request(app)
            .get('/sort?field=title&direction=desc')
            .then((res) => {
                expect(res.status).toBe(200);
                const movies = res.body;
                expect(Array.isArray(movies)).toBe(true);
                expect(movies[0].title).toBe('White Boy Rick');
            });
    });


    test("GET /sort", () => {
        return request(app)
            .get('/sort')
            .then((res) => {
                expect(res.status).toBe(400);
            });
    });

});
