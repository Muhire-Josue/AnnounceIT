/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';
import mockData from './data/mockData';

chai.use(chaiHttp);
chai.should();
const { expect } = chai;

describe('User tests', () => {
  it('should display a welcome message', (done) => {
    chai.request(server)
      .get('/api/v2/')
      .end((error, res) => {
        res.body.status.should.be.equal(200);
        expect(res.body.message).to.equal('Welcome to this API enjoy!');
        done();
      });
  });

  it('should be signup', (done) => {
    const user = mockData[0];
    chai.request(server)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((error, res) => {
        res.body.status.should.be.equal(201);
        expect(res.body.message).to.equal('User created successfully');
        done();
      });
  });

  it('should not signup when provided invalid values', (done) => {
    const user = mockData[1];
    chai.request(server)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((error, res) => {
        res.body.status.should.be.equal(400);
        done();
      });
  });

  it('should not duplicate a user', (done) => {
    const user = mockData[0];
    chai.request(server)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((error, res) => {
        res.body.status.should.be.equal(409);
        expect(res.body.error).to.equal('Email already exists');
        done();
      });
  });

  it('Should login a user', (done) => {
    const user = mockData[2];
    chai.request(server)
      .post('/api/v2/auth/signin')
      .send(user)
      .end((error, res) => {
        res.body.status.should.be.equal(200);
        expect(res.body.message).to.equal('Logged in successfully');
        done();
      });
  });

  it('Should not login not found users', (done) => {
    const user = mockData[3];
    chai.request(server)
      .post('/api/v2/auth/signin')
      .send(user)
      .end((error, res) => {
        res.body.status.should.be.equal(404);
        expect(res.body.error).to.equal('User not found');
        done();
      });
  });

  it('Should not login a user with incorrect password', (done) => {
    const user = mockData[4];
    chai.request(server)
      .post('/api/v2/auth/signin')
      .send(user)
      .end((error, res) => {
        res.body.status.should.be.equal(400);
        expect(res.body.error).to.equal('Password do not match');
        done();
      });
  });
});
