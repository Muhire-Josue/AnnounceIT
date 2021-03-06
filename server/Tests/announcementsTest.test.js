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

describe('Announcement tests', () => {
  it('should be signup', (done) => {
    const user = mockData[5];
    chai.request(server)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((error, res) => {
        userToken = res.body.data.token;
        res.body.status.should.be.equal(201);
        expect(res.body.message).to.equal('User created successfully');
        done();
      });
  });
  it('should be signup', (done) => {
    const user = mockData[9];
    chai.request(server)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((error, res) => {
        anotherUserToken = res.body.data.token;
        res.body.status.should.be.equal(201);
        expect(res.body.message).to.equal('User created successfully');
        done();
      });
  });

  it('should create an announcement', (done) => {
    const user = mockData[6];
    chai.request(server)
      .post('/api/v2/announcement')
      .send(user)
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        announcementID = res.body.data.id;
        announcementStatus = res.body.data.status;
        res.body.status.should.be.equal(201);
        expect(res.body.message).to.equal('Announcement created successully');
        done();
      });
  });
  it('should not create an announcement with invalid input', (done) => {
    const user = mockData[7];
    chai.request(server)
      .post('/api/v2/announcement')
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
      .post('/api/v2/announcement')
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
      .post('/api/v2/announcement')
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
      .post('/api/v2/announcement')
      .send(user)
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(409);
        expect(res.body.error).to.equal('Announcement already exists');
        done();
      });
  });
  it('should update an announcement', (done) => {
    const user = mockData[6];
    chai.request(server)
      .patch(`/api/v2/announcement/${announcementID}`)
      .send(user)
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(200);
        expect(res.body.message).to.equal('Announcement updated successfully');
        done();
      });
  });

  it('should not update an announcement if not found', (done) => {
    const user = mockData[6];
    chai.request(server)
      .patch('/api/v2/announcement/0')
      .send(user)
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(404);
        expect(res.body.error).to.equal('Announcement not found');
        done();
      });
  });
  it('should not update others announcements', (done) => {
    const user = mockData[6];
    chai.request(server)
      .patch(`/api/v2/announcement/${announcementID}`)
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
      .get('/api/v2/announcement/')
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(200);
        expect(res.body.message).to.equal('All your announcements');
        done();
      });
  });
  it('should get all announcements with a specific status', (done) => {
    chai.request(server)
      .get(`/api/v2/announcements?status=${announcementStatus}`)
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(200);
        expect(res.body.message).to.equal('Announcements by status');
        done();
      });
  });

  it('should not get all announcements if no announcement is found with that status', (done) => {
    chai.request(server)
      .get('/api/v2/announcements?status=active')
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(404);
        expect(res.body.error).to.equal('Announcement not found');
        done();
      });
  });

  it('should not get all announcements with invalid status', (done) => {
    chai.request(server)
      .get('/api/v2/announcements?status=abc')
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(400);
        expect(res.body.error).to.equal('Invalid Status');
        done();
      });
  });
  it('should get an announcement', (done) => {
    chai.request(server)
      .get(`/api/v2/announcement/${announcementID}`)
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(200);
        expect(res.body.message).to.equal('Here is your Annoucement');
        done();
      });
  });

  it('should work provided invalid routes', (done) => {
    chai.request(server)
      .put(`/api/v0/announcement/${announcementID}`)
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(400);
        expect(res.body.error).to.equal('Incorrect Route');
        done();
      });
  });

  it('should not get an announcement provided invalid id', (done) => {
    chai.request(server)
      .get('/api/v2/announcement/id')
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(400);
        expect(res.body.error).to.equal('Please provide a valid id');
        done();
      });
  });
  it('should change the status an announcement', (done) => {
    chai.request(server)
      .patch(`/api/v2/announcements/${announcementID}?status=active`)
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(200);
        expect(res.body.message).to.equal('Status changed successfully');
        done();
      });
  });

  it('should not change the status an announcement provided invalid status', (done) => {
    chai.request(server)
      .patch(`/api/v2/announcements/${announcementID}?status=notAStatus`)
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(400);
        expect(res.body.error).to.equal('Invalid Status');
        done();
      });
  });
  it('should view all announcements', (done) => {
    chai.request(server)
      .get('/api/v2/announcemente')
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(200);
        expect(res.body.message).to.equal('All announcements');
        done();
      });
  });
  it('should not delete an announcement if not an admin', (done) => {
    chai.request(server)
      .delete(`/api/v2/announcement/${announcementID}`)
      .set('Authorization', `Bearer ${anotherUserToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(403);
        expect(res.body.error).to.equal('Forbidden operation');
        done();
      });
  });

  it('should delete an announcement', (done) => {
    chai.request(server)
      .delete(`/api/v2/announcement/${announcementID}`)
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(200);
        expect(res.body.message).to.equal('Announcement Deleted successfully');
        done();
      });
  });
  it('should view all announcements', (done) => {
    chai.request(server)
      .get('/api/v2/announcemente')
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(404);
        expect(res.body.error).to.equal('Announcements not found');
        done();
      });
  });
});
