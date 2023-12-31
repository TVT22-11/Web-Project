const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const pgpool = require('../src/database_tools/pg_connection');
const server = require('../src/server')

chai.use(chaiHttp);

describe('Endpoint tests', () =>{

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

        it('Reviews Should be working...', (done) => {

          chai.request(server)
          .get('/review?movie_id=238')  
          .end((err, res) =>{
              res.should.have.status(200);
              res.body.should.be.a('object');
          done();
          });
      });

      it('Accounts Should be working...', (done) => {

        chai.request(server)
        .get('/account')  
        .end((err, res) =>{
            res.should.have.status(403);
        done();
        });
    });
})


describe('Account tests', () => {
  let createdUserId; 

  it('Should create a new user', (done) => {
    chai.request(server)
      .post('/auth/register') 
      .send({
        username: 'testuser',
        password: 'testpassword',
        fname: 'testfname',
        lname: 'testlname',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('jwtToken');
        createdUserId = res.body.username;
        done();
      });
  });

  it('Should log in with the created user', (done) => {
    chai.request(server)
      .post('/auth/login')
      .send({
        username: 'testuser',
        password: 'testpassword',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('jwtToken');
        done();
      });
  });

  it('Should delete the created user', (done) => {
    chai.request(server)
        .delete('/auth/delete')
        .send({ username: createdUserId }) 
        .end((err, res) => {
            res.should.have.status(200);
            done();
        });
});
});


describe('Group page endpoint tests...', ()  => {
let createdparty;
  it('Should get groups', (done) =>{

    chai.request(server)
    .get('/group')
    .end((err, res) =>{
      res.should.have.status(200);
      res.body.should.be.a('object');
  done();
    });
  });

  it('should create a party', (done) =>{

    chai.request(server)
    .post('/group/post')
    .send({
      name: 'testuser',
      description: 'testdescription',
      isprivate: false,
      owner: 1,
    })
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      done();

    });
  });
  it('should find created party', (done) =>{
    chai.request(server)
    .get('/group/search?name=testuser')
    .end((err, res) =>{
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('GroupData');
      res.body.GroupData.should.be.an('array').that.is.not.empty;
      createdparty = res.body.GroupData[0].id_party;
  done();
  });
  });

  it('should delete created party', (done) =>{
    chai.request(server)
    .delete('/group/deleteParty') 
    .send({
      id_party: createdparty
    })
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      done();
    });
  });
  
});
