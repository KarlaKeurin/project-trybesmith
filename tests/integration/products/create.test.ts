import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../../src/app';

import ProductModel from '../../../src/database/models/product.model';

chai.use(chaiHttp);

describe('Testa POST /products', function () { 
  beforeEach(function () { sinon.restore(); });

  it('Verifica se o produto é criado corretamente', async function () {
    const mockRequest = {
      name: 'Uniforme do Homem Aranha',
      price: '40 peças de ouro',
      userId: 3,
    }
    
      const request = ProductModel.build(mockRequest);
      sinon.stub(ProductModel, 'create').resolves(request);
  
      const response = await chai.request(app).post('/products').send(mockRequest);
  
      expect(response.status).to.equal(201);
      expect(response.body).to.be.deep.equal({
        id: null,
        name: 'Uniforme do Homem Aranha',
        price: '40 peças de ouro',
        userId: 3,
      });
  });

  it('Verifica se aparece o status 400 se o userId não for informado', () => {
    const mockRequest = {
      name: 'Uniforme do Homem Aranha',
      price: '40 peças de ouro',
    }
  
    chai.request(app)
      .post('/products')
      .send(mockRequest)
      .then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('userId is required');
      });
  });

  it('Verifica se aparece o status 422 se userId não for um número', () => {
    const mockRequest = {
      name: 'Uniforme do Homem Aranha',
      price: '40 peças de ouro',
      userId: '3',
    }
  
    chai.request(app)
      .post('/products')
      .send(mockRequest)
      .then((response) => {
        expect(response.status).to.equal(422);
        expect(response.body.message).to.equal('userId must be a number');
      });
  });
});


