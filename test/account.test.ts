import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('POST api/v1/accounts/login', () => {

    it('responds with JSON array', () => {
        return chai.request(app).post('/api/v1/accounts/login',).send({email:"asas",password:"55"})
            .then(res => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.haveOwnProperty("Heroes");
            });
    });

    

});


describe('POST api/v1/accounts/signup', () => {


    it('should return Spider-Man', async () => {
        const res = await chai.request(app).get('/api/v1/heroes/2')
        expect(res.body.hero.name).to.equal('Spider-Man');
    });

});