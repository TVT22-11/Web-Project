const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const pgpool = require('../src/database_tools/pg_connection');
const server = require('../src/server')

chai.use(chaiHttp);

describe('/First Test Collection', () =>{

        it('Server Should be running correctly...', (done) => {

            chai.request(server)
            .get('/test')  
            .end((err, res) =>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                const actualValue = res.body.message;
                expect(actualValue).to.be.equal('Server is running successfully!');
            done();
            });
        });

})

describe('/GET Tests', ()=>{

    it('Should get all the accounts...', (done) =>{
        chai.request(server)
        .get('/account')
        .end((err, res) =>{
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
        });

    });

    it('Should get all the Groups...', (done) =>{
        chai.request(server)
        .get('/group')
        .end((err, res) =>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    });
})

// Basic testi testaus
var assert = require('assert');
describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});