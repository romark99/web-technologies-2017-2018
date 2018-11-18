const controllers = require("../controllers");
const constants = require("../constants");

const someMovies = [
    {
        "vote_count": 1311,
        "id": 335983,
        "video": false,
        "vote_average": 6.6,
        "title": "Venom",
        "popularity": 473.089,
        "poster_path": "/2uNW4WbgBXL25BAbXGLnLqX71Sw.jpg",
        "original_language": "en",
        "original_title": "Venom",
        "genre_ids": [
            878,
            28
        ],
        "backdrop_path": "/VuukZLgaCrho2Ar8Scl9HtV3yD.jpg",
        "adult": false,
        "overview": "When Eddie Brock acquires the powers of a symbiote, he will have to release his alter-ego “Venom” to save his life.",
        "release_date": "2018-10-03"
    },
    {
        "vote_count": 738,
        "id": 332562,
        "video": false,
        "vote_average": 7.6,
        "title": "A Star Is Born",
        "popularity": 228.463,
        "poster_path": "/wrFpXMNBRj2PBiN4Z5kix51XaIZ.jpg",
        "original_language": "en",
        "original_title": "A Star Is Born",
        "genre_ids": [
            18,
            10402,
            10749
        ],
        "backdrop_path": "/840rbblaLc4SVxm8gF3DNdJ0YAE.jpg",
        "adult": false,
        "overview": "Seasoned musician Jackson Maine discovers—and falls in love with—struggling artist Ally. She has just about given up on her dream to make it big as a singer—until Jack coaxes her into the spotlight. But even as Ally's career takes off, the personal side of their relationship is breaking down, as Jack fights an ongoing battle with his own internal demons.",
        "release_date": "2018-10-03"
    },
    {
        "vote_count": 587,
        "id": 346910,
        "video": false,
        "vote_average": 5.3,
        "title": "The Predator",
        "popularity": 184.239,
        "poster_path": "/wMq9kQXTeQCHUZOG4fAe5cAxyUA.jpg",
        "original_language": "en",
        "original_title": "The Predator",
        "genre_ids": [
            27,
            878,
            28,
            53
        ],
        "backdrop_path": "/f4E0ocYeToEuXvczZv6QArrMDJ.jpg",
        "adult": false,
        "overview": "From the outer reaches of space to the small-town streets of suburbia, the hunt comes home. Now, the universe’s most lethal hunters are stronger, smarter and deadlier than ever before, having genetically upgraded themselves with DNA from other species. When a young boy accidentally triggers their return to Earth, only a ragtag crew of ex-soldiers and a disgruntled science teacher can prevent the end of the human race.",
        "release_date": "2018-09-13"
    }
];

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
        test('error = {details: "some details"}, should return true', () => {
            const json = jest.fn();
            const obj = {json};
            const status = jest.fn().mockReturnValue(obj);

            const res = {status};
            expect(controllers.isError(res, {'details': 'some details'})).toBe(true);
            expect(status.mock.calls).toHaveLength(1);
            expect(status.mock.calls[0][0]).toBe(400);
            expect(json.mock.calls).toHaveLength(1);
            expect(json.mock.calls[0][0]).toEqual(expect.objectContaining({
                details: 'some details'
            }));

        });

        test('error = {nodetails: "some details"}, should return false', () => {
            const json = jest.fn();
            const obj = {json};
            const status = jest.fn();

            const res = {status};
            expect(controllers.isError(res, {'nodetails': 'some details'})).toBe(false);
            expect(status.mock.calls).toHaveLength(0);
            expect(json.mock.calls).toHaveLength(0);

        });

        test('error = {}, should return false', () => {
            const json = jest.fn();
            const obj = {json};
            const status = jest.fn();

            const res = {status};
            expect(controllers.isError(res, {})).toBe(false);
            expect(status.mock.calls).toHaveLength(0);
            expect(json.mock.calls).toHaveLength(0);

        });
    });

    describe('getMovies(req, res)', () => {
        test("res = mock with 'send' function", async () => {
            const send = jest.fn();
            const req = {};
            const res = {send};
            await controllers.getMovies(req, res);
            expect(send.mock.calls).toHaveLength(1);
            const movies = send.mock.calls[0][0];
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

    describe('getMovieById(req, res)', () => {
        test("req = {params: {id: 332562 }}", async () => {
            const send = jest.fn().mockReturnValue(someMovies);
            const req = {params: {id: 332562 }};
            const res = {send};
            await controllers.getMovieById(req, res);
            expect(send.mock.calls).toHaveLength(1);
            const movie = send.mock.calls[0][0];
            expect(typeof movie).toBe('object');
            expect(movie).toHaveProperty('id');
            expect(movie).toHaveProperty('title');
            expect(movie).toHaveProperty('popularity');
            expect(movie).toHaveProperty('vote_count');
            expect(movie).toHaveProperty('release_date');
            expect(movie).toHaveProperty('overview');
        });

        test("req = {params: {id: -5 }}, Joi should work", () => {
            const send = jest.fn().mockReturnValue(someMovies);
            const req = {params: {id: -5 }};

            const json = jest.fn();
            const obj = {json};
            const status = jest.fn().mockReturnValue(obj);

            const res = {status, send};
            controllers.getMovieById(req, res);
            expect(send.mock.calls).toHaveLength(0);
            expect(status.mock.calls).toHaveLength(1);
            expect(json.mock.calls).toHaveLength(1);
        });

        test("req = {params: {id: 45 }}, return {}", async () => {
            const send = jest.fn().mockReturnValue(undefined);
            const req = {params: {id: 45 }};

            const res = {send};
            await controllers.getMovieById(req, res);
            expect(send.mock.calls).toHaveLength(1);
            const movie = send.mock.calls[0][0];
            //expect(movie).toBeUndefined();
            expect(movie).toBeNull();
        });
    });

    describe('getMoviesBySubstring(req, res)', () => {
        test("req = {params: {substring: 'Harry' }}, normal work", async () => {
            const send = jest.fn();
            const req = {params: {substring: 'Harry'}};
            const res = {send};
            await controllers.getMoviesBySubstring(req, res);
            expect(send.mock.calls).toHaveLength(1);
            const movies = send.mock.calls[0][0];
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

        test("req = {params: {substring: 5 }}, Joi should work", () => {
            const send = jest.fn().mockReturnValue(someMovies);
            const req = {params: {substring: -5 }};

            const json = jest.fn();
            const obj = {json};
            const status = jest.fn().mockReturnValue(obj);

            const res = {status, send};
            controllers.getMoviesBySubstring(req, res);
            expect(send.mock.calls).toHaveLength(0);
            expect(status.mock.calls).toHaveLength(1);
            expect(json.mock.calls).toHaveLength(1);
        });

        test("req = {params: {substring: 'q123a' }}, return {}", async () => {
            const send = jest.fn().mockReturnValue([]);
            const req = {params: {substring: 'q123a' }};

            const res = {send};
            await controllers.getMoviesBySubstring(req, res);
            expect(send.mock.calls).toHaveLength(1);
            const movies = send.mock.calls[0][0];
            expect(Array.isArray(movies)).toBe(true);
            expect(movies.length).toBe(0);
        });
    });

    describe('getPagination(req, res)', () => {
        test("req = {query: {offset: 2, limit: 5}}, normal work", async () => {
            const send = jest.fn();
            const req = {query: {offset: 2, limit: 5}};
            const res = {send};
            await controllers.getPagination(req, res);
            expect(send.mock.calls).toHaveLength(1);
            const movies = send.mock.calls[0][0];
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

        test("req = {query: {offset: 5}}, Joi should work", () => {
            const send = jest.fn();
            const req = {query: {offset: 5 }};

            const json = jest.fn();
            const obj = {json};
            const status = jest.fn().mockReturnValue(obj);

            const res = {status, send};
            controllers.getPagination(req, res);
            expect(send.mock.calls).toHaveLength(0);
            expect(status.mock.calls).toHaveLength(1);
            expect(json.mock.calls).toHaveLength(1);
        });

        test("req = {query: {limit: 5}}, Joi should work", () => {
            const send = jest.fn();
            const req = {query: {limit: 5 }};

            const json = jest.fn();
            const obj = {json};
            const status = jest.fn().mockReturnValue(obj);

            const res = {status, send};
            controllers.getPagination(req, res);
            expect(send.mock.calls).toHaveLength(0);
            expect(status.mock.calls).toHaveLength(1);
            expect(json.mock.calls).toHaveLength(1);
        });

        test("req = {query: {limit: 5}}, Joi should work", () => {
            const send = jest.fn();
            const req = {query: {limit: 'cfhjdt', offset: -56}};

            const json = jest.fn();
            const obj = {json};
            const status = jest.fn().mockReturnValue(obj);

            const res = {status, send};
            controllers.getPagination(req, res);
            expect(send.mock.calls).toHaveLength(0);
            expect(status.mock.calls).toHaveLength(1);
            expect(json.mock.calls).toHaveLength(1);
        });
    });

    describe('sortMovies(req, res)', () => {
        test("req = {query: {field: 'id', direction: 'asc' }}, normal work", async () => {
            const send = jest.fn();
            const req = {query: {field: 'id', direction: 'asc'}};
            const res = {send};
            await controllers.sortMovies(req, res);
            expect(send.mock.calls).toHaveLength(1);
            const movies = send.mock.calls[0][0];
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

        test("req = {query: {field: 'id', direction: 'sfg' }}, Joi should work", () => {
            const send = jest.fn().mockReturnValue(someMovies);
            const req = {query: {field: 'id', direction: 'sfg' }};

            const json = jest.fn();
            const obj = {json};
            const status = jest.fn().mockReturnValue(obj);

            const res = {status, send};
            controllers.sortMovies(req, res);
            expect(send.mock.calls).toHaveLength(0);
            expect(status.mock.calls).toHaveLength(1);
            expect(json.mock.calls).toHaveLength(1);
        });
    });

    describe('helloApi(req, res)', () => {
        test("req = {query: {field: 'id', direction: 'asc' }}, normal work", () => {
            const send = jest.fn();
            const req = {};
            const res = {send};
            controllers.helloApi(req, res);
            expect(send.mock.calls).toHaveLength(1);
            expect(send.mock.calls[0][0]).toBe("Hello API");
        });
    });
});
