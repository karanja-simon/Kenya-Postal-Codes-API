"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_ENV = 'test';
const chai = require("chai");
const chaiHttp = require("chai-http");
const server_1 = require("../app/server");
chai.use(chaiHttp);
const expect = chai.expect;
let token = '';
const REG_DETAILS = {
    'email': 'test@gmail.com'
};
describe('API base routes', () => {
    it('It should be json', () => {
        return chai.request(server_1.default).get('/')
            .then((res) => {
            expect(res.type).to.eql('application/json');
        });
    });
    it('It should have a message', () => {
        return chai.request(server_1.default).get('/')
            .then((res) => {
            expect(res.status).to.equal(200);
            expect(res).to.be.json;
            expect(res.body.success).to.be.true;
        });
    });
});
describe('Generate & Authenticate a token', () => {
    before(function (done) {
        chai.request(server_1.default)
            .post('/api/ke-postalcodes/v1/key')
            .send(REG_DETAILS)
            .end(function (err, res) {
            let data = res.body;
            token = data.token;
            done();
        });
    });
    it(`It should validate a token for user: ${REG_DETAILS.email} `, (done) => {
        chai.request(server_1.default)
            .post('/api/ke-postalcodes/v1/verify/key')
            .set('Authorization', 'JWT ' + token)
            .then((res) => {
            expect(res.status).to.equal(200);
            expect(res).to.be.json;
            expect(res.body.success).to.be.true;
            expect(res.body).have.property('token');
            done();
        })
            .catch((err) => {
            console.log('err: ', err);
        });
    });
});
describe('Authenticated API data routes', () => {
    it(`It should get all KE postal codes as JSON array `, (done) => {
        chai.request(server_1.default)
            .get('/api/ke-postalcodes/v1/codes')
            .set('Authorization', 'JWT ' + token)
            .then((res) => {
            expect(res.status).to.equal(200);
            expect(res).to.be.json;
            expect(res.body.success).to.be.true;
            expect(res.body).have.property('data');
            expect(res.body.data).be.a('array');
            expect(res.body.data).length.greaterThan(0);
            done();
        })
            .catch((err) => {
            console.log('err: ', err);
        });
    });
    it(`It should get a single KE postal code data by the given code `, (done) => {
        chai.request(server_1.default)
            .post('/api/ke-postalcodes/v1/code/50244')
            .set('Authorization', 'JWT ' + token)
            .then((res) => {
            expect(res.status).to.equal(200);
            // expect(res).to.be.json;
            // expect(res.body.success).to.be.true;
            // expect(res.body).have.property('data');
            done();
        })
            .catch((err) => {
            console.log('err: ', err);
        });
    });
});
//# sourceMappingURL=codes.test.js.map