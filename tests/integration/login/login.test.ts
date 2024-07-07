import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import UserModel from '../../../src/database/models/user.model';

chai.use(chaiHttp);

describe('POST /login', function () { 
  beforeEach(function () { sinon.restore(); });

  it('Deve retornar status 400 se o login não tiver o campo "username"', async function () {
    const response = await chai.request(app)
    .post('/login')
    .send({ password: 'any-password'})

    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('"username" and "password" are required');
  })

  it('Deve retornar status 400 se o login não tiver o campo "password"', async function () {
    const response = await chai.request(app)
    .post('/login')
    .send({ username: 'any-username'})

    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('"username" and "password" are required');
  })

  it('Deve retornar status 401 se o login tiver o campo "username" e "password" inválidos', async function () {
    sinon.stub(UserModel, 'findOne').resolves(null);

    const response = await chai.request(app)
    .post('/login')
    .send({ username: 'any-username', password: 'any-password'})

    expect(response.status).to.be.equal(401);
    expect(response.body.message).to.be.equal('Username or password invalid');
  })

  it('Deve retornar status 200 se as credenciais estiverem corretas', async function () {
    sinon.stub(UserModel, 'findOne').resolves(UserModel.build({
      id: 1,
      username: 'Hagar',
      vocation: 'Guerreiro',
      level: 10,
      password: '$2a$10$e6LY5fGCL1R8KgugND30bOtFixs0fkPw4SK2expJddRMcYITRHX2W',
    }));

    const response = await chai.request(app)
    .post('/login')
    .send({ username: 'Hagar', password: 'terrível' })

    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.key('token');
    expect(response.body.token).to.be.a('string');
  })

  it('Deve retornar status 401 se as credenciais estiverem incorretas', async function () {
    sinon.stub(UserModel, 'findOne').resolves(UserModel.build({
      id: 1,
      username: 'Hagar',
      vocation: 'Guerreiro',
      level: 10,
      password: 'any-password',
    }));

    const response = await chai.request(app)
    .post('/login')
    .send({ username: 'Hagar', password: 'terrível' })

    expect(response.status).to.be.equal(401);
    expect(response.body).not.to.have.key('token');
  })

  afterEach(function () {
    sinon.restore();
  });
})