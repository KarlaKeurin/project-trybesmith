import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../../src/app';
import ProductModel from '../../../src/database/models/product.model';

chai.use(chaiHttp);

describe('Testa GET /products', function () { 
  beforeEach(function () { sinon.restore(); });

  it('Verifica se a lista de produtos aparece corretamente', async function () {
    const mockProductsList = [
      {
        id: 1,
        name: 'Excalibur',
        price: '10 peças de ouro',
        userId: 1
      },
      {
        id: 2,
        name: 'Espada Justiceira',
        price: '20 peças de ouro',
        userId: 1
      },
      {
        id: 3,
        name: 'Lira de Orfeu',
        price: '1 peça de ouro',
        userId: 2
      },
      {
        id: 4,
        name: 'Armadura de Aquiles',
        price: '1 peça de ouro',
        userId: 2
      },
      {
        id: 5,
        name: 'Harpa de Dagda',
        price: '15 peças de ouro',
        userId: 3
      }
    ];

    const list = mockProductsList.map((product) => ProductModel.build(product));
    sinon.stub(ProductModel, 'findAll').resolves(list);

    const response = await chai.request(app).get('/products');    

    expect(response.status).to.equal(200);
    expect(response.body).to.be.deep.equal(mockProductsList);
  });
});
