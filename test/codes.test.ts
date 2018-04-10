process.env.NODE_ENV = 'test';

import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../app/server';
import Code from '../app/models/Code';

chai.use(chaiHttp);

const expect = chai.expect;
let token = '';
const REG_DETAILS = {
    'email': 'test@gmail.com'
};

describe('API base routes', () => {
    it('It should be json', () => {
        return chai.request(app).get('/')
            .then((res) => {
                expect(res.type).to.eql('application/json');
            })
    });

    it('It should have a message', () => {
        return chai.request(app).get('/')
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;
                expect(res.body.success).to.be.true;
            });
    });
});

describe('Generate & Authenticate a token', () => {

    before(function (done) {
        chai.request(app)
            .post('/api/ke-postalcodes/v1/key')
            .send(REG_DETAILS)
            .end(function (err, res) {
                let data = res.body;
                token = data.token;
                done();
            });
    });

    it(`It should validate a token for user: ${REG_DETAILS.email} `, (done) => {
        chai.request(app)
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
            })

    });
});

describe('Authenticated API data routes', () => {

    it(`It should get all KE postal codes as JSON array `, (done) => {
        chai.request(app)
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
            })

    });

    it(`It should get a single KE postal code data by the given code `, (done) => {

        let nairobiPostalData = {
            postalCode: 0,
            postalName: "",
            _id: "5ac378420bc05840d27dfe41",
            code: 100,
            name: "Nairobi General Post"
        };

        chai.request(app)
            .get('/api/ke-postalcodes/v1/code/00100')
            .set('Authorization', 'JWT ' + token)
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.a('object');
                expect(res.body.data[0]).have.property('code').eql(nairobiPostalData.code);
                done();

            })
            .catch((err) => {
                console.log('err: ', err);
            })

    });

    it(`It should get a single KE postal code data by the given Postal name `, (done) => {

        let kanjukuPostalData = {
            postalCode: 0,
            postalName: "",
            _id: "5ac378420bc05840d27dfe41",
            code: 1004,
            name: "Kanjuku"
        };

        chai.request(app)
            .get('/api/ke-postalcodes/v1/name/Kanjuku')
            .set('Authorization', 'JWT ' + token)
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.a('object');
                expect(res.body.data[0]).have.property('code').eql(kanjukuPostalData.code);
                done();

            })
            .catch((err) => {
                console.log('err: ', err);
            })

    });
});