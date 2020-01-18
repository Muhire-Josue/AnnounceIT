/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';
import mockData from './data/mockData';

chai.use(chaiHttp);
chai.should();
let userToken = '';
let anotherUserToken = '';
let announcementID;
let announcementStatus = '';
const { expect } = chai;

describe('User tests', () => {
  it('should display a welcome message', (done) => {
    chai.request(server)
      .get('/api/v1/')
      .end((error, res) => {
        res.body.status.should.be.equal(200);
        expect(res.body.message).to.equal('Welcome to this API enjoy!');
        done();
      });
  });

  it('should be signup', (done) => {
    const user = mockData[5];
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((error, res) => {
        userToken = res.body.data.token;
        res.body.status.should.be.equal(201);
        expect(res.body.message).to.equal('success');
        done();
      });
  });
  it('should be signup', (done) => {
    const user = mockData[9];
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((error, res) => {
        anotherUserToken = res.body.data.token;
        res.body.status.should.be.equal(201);
        expect(res.body.message).to.equal('success');
        done();
      });
  });

  it('should create an announcement', (done) => {
    const user = mockData[6];
    chai.request(server)
      .post('/api/v1/announcement')
      .send(user)
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        announcementID = res.body.data.id;
        announcementStatus = res.body.data.status;
        res.body.status.should.be.equal(201);
        expect(res.body.message).to.equal('success');
        done();
      });
  });
  it('should not create an announcement with invalid input', (done) => {
    const user = mockData[7];
    chai.request(server)
      .post('/api/v1/announcement')
      .send(user)
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(400);
        done();
      });
  });
  it('should not create an announcement if user did not sign in', (done) => {
    const user = mockData[6];
    chai.request(server)
      .post('/api/v1/announcement')
      .send(user)
      .end((error, res) => {
        res.body.status.should.be.equal(401);
        expect(res.body.error).to.equal('Unauthorized access');
        done();
      });
  });
  it('should not create an announcement with invalid token', (done) => {
    const user = mockData[6];
    chai.request(server)
      .post('/api/v1/announcement')
      .send(user)
      .set('Authorization', 'Bearer undefined')
      .end((error, res) => {
        res.body.status.should.be.equal(401);
        expect(res.body.error).to.equal('Invalid token');
        done();
      });
  });
  it('should not create duplicated announcement', (done) => {
    const user = mockData[6];
    chai.request(server)
      .post('/api/v1/announcement')
      .send(user)
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(409);
        expect(res.body.error).to.equal('Announcement already exists');
        done();
      });
  });

  it('should update an announcement', (done) => {
    const user = mockData[7];
    chai.request(server)
      .patch(`/api/v1/announcement/${announcementID}`)
      .send(user)
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(200);
        expect(res.body.message).to.equal('success');
        done();
      });
  });

  it('should not update an announcement if not found', (done) => {
    const user = mockData[7];
    chai.request(server)
      .patch('/api/v1/announcement/0')
      .send(user)
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(404);
        expect(res.body.error).to.equal('Announcement not found');
        done();
      });
  });
  it('should not update others announcements', (done) => {
    const user = mockData[7];
    chai.request(server)
      .patch(`/api/v1/announcement/${announcementID}`)
      .send(user)
      .set('Authorization', `Bearer ${anotherUserToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(401);
        expect(res.body.error).to.equal('Unauthorized access');
        done();
      });
  });
  it('should get all announcements', (done) => {
    chai.request(server)
      .get('/api/v1/announcement/')
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(200);
        expect(res.body.message).to.equal('success');
        done();
      });
  });
  it('should get all announcements with a specific status', (done) => {
    chai.request(server)
      .get(`/api/v1/announcements?status=${announcementStatus}`)
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(200);
        expect(res.body.message).to.equal('success');
        done();
      });
  });

  it('should not get all announcements with invalid status', (done) => {
    chai.request(server)
      .get('/api/v1/announcements?status=abc')
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(400);
        expect(res.body.error).to.equal('Invalid Status');
        done();
      });
  });

  it('should get an announcement', (done) => {
    chai.request(server)
      .get(`/api/v1/announcement/${announcementID}`)
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(200);
        expect(res.body.message).to.equal('success');
        done();
      });
  });

  it('should delete an announcement', (done) => {
    chai.request(server)
      .delete(`/api/v1/announcement/${announcementID}`)
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(200);
        expect(res.body.message).to.equal('success');
        done();
      });
  });
});
