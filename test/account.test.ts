import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('POST api/v1/accounts/login', () => {

    it('responds with JSON array', () => {
        return chai.request(app).post('/api/v1/accounts/login', )
        .send({ email: "as@as.c", password: "as" })
            .then(res => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.haveOwnProperty("email");
                expect(res.body).to.have.haveOwnProperty("avatar");
                expect(res.body).to.not.have.haveOwnProperty("password");
                expect(res.body).to.have.haveOwnProperty("_id");
            });
    });



});


describe('POST api/v1/accounts/signUp', () => {


    it('creation should return Success', async () => {
        const res = await chai.request(app).post('/api/v1/accounts/signUp')
            .send({ email: "wa@as.c", password: "as" })
            expect(res.status).to.equal(200);
            expect(res).to.be.json;
        expect(res.body.message).to.equal('Success');
    });

});