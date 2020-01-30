/* eslint-disable no-undef */
import chai from 'chai';
import userSchema from '../../Validations/userValidation';
import mockData from '../data/mockData';

const user = mockData[0];

describe('validation test', () => {
  it('Should validate empty firstname', () => {
    const validateUser = userSchema.validate({ ...user, firstName: '' });
    chai.expect(validateUser).to.have.property('error');
  });
  it('Should validate the data type of firstname', () => {
    const validateUser = userSchema.validate({ ...user, firstName: [] });
    chai.expect(validateUser).to.have.property('error');
  });
  it('Should validate required firstname', () => {
    const validateUser = userSchema.validate({ ...user, firstName: undefined });
    chai.expect(validateUser).to.have.property('error');
  });
  it('Should validate the length of firstname', () => {
    const validateUser = userSchema.validate({ ...user, firstName: 'j' });
    chai.expect(validateUser).to.have.property('error');
  });

  it('Should validate empty lastname', () => {
    const validateUser = userSchema.validate({ ...user, lastName: '' });
    chai.expect(validateUser).to.have.property('error');
  });
  it('Should validate the data type of lastname', () => {
    const validateUser = userSchema.validate({ ...user, lastName: [] });
    chai.expect(validateUser).to.have.property('error');
  });
  it('Should validate required lastname', () => {
    const validateUser = userSchema.validate({ ...user, lastName: undefined });
    chai.expect(validateUser).to.have.property('error');
  });
  it('Should validate the length of lastname', () => {
    const validateUser = userSchema.validate({ ...user, lastName: 'j' });
    chai.expect(validateUser).to.have.property('error');
  });

  it('Should validate empty email', () => {
    const validateUser = userSchema.validate({ ...user, email: '' });
    chai.expect(validateUser).to.have.property('error');
  });

  it('Should validate required email', () => {
    const validateUser = userSchema.validate({ ...user, email: undefined });
    chai.expect(validateUser).to.have.property('error');
  });

  it('Should validate the data type of email', () => {
    const validateUser = userSchema.validate({ ...user, email: 123 });
    chai.expect(validateUser).to.have.property('error');
  });
  it('Should validate invalid email', () => {
    const validateUser = userSchema.validate({ ...user, email: 'josue' });
    chai.expect(validateUser).to.have.property('error');
  });
  it('Should validate empty lastname', () => {
    const validateUser = userSchema.validate({ ...user, phoneNumber: '' });
    chai.expect(validateUser).to.have.property('error');
  });
  it('Should validate the data type of phoneNumber', () => {
    const validateUser = userSchema.validate({ ...user, phoneNumber: [] });
    chai.expect(validateUser).to.have.property('error');
  });
  it('Should validate required phoneNumber', () => {
    const validateUser = userSchema.validate({ ...user, phoneNumber: undefined });
    chai.expect(validateUser).to.have.property('error');
  });
  it('Should validate the length of phoneNumber', () => {
    const validateUser = userSchema.validate({ ...user, phoneNumber: 'j' });
    chai.expect(validateUser).to.have.property('error');
  });
});
