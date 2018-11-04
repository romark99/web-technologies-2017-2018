const app = require("../../app");
const request = require("supertest");

describe('Integration test', () => {
    test("GET /", () => {
        return request(app)
            .get('/')
            .then((res) => {
                //console.log('++++++++++++++++++++++++++');
                expect(res.text).toBe('Hello API')
            })
    });


});
