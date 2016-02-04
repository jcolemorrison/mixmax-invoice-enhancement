'use strict';

var app = require('../..');
import request from 'supertest';

describe('Resolver API:', function() {

  describe('GET /api/resolver', function() {
    var resolvers;

    beforeEach(function(done) {
      request(app)
        .get('/api/resolver')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          resolvers = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(resolvers).to.be.instanceOf(Array);
    });

  });

   describe('POST /api/resolver', function() {
    var resolvers;

    beforeEach(function() {
      this.request = request(app)
        .post('/api/resolver');
    })

    afterEach(function() {
      resolvers = undefined;
    });

    it('should return a 400 if no params are sent', function(done) {
      this.request
        .send({})
        .expect(400)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          resolvers = res.body;
          expect(resolvers).to.equal('Invalid params');
          done();
        });
    });

    it('should return a 400 if invoicedAmount is not a number', function(done) {
      this.request
        .send({ params: '{ "invoicedAmount": "nan", "invoicedPerson": "example@example.com"}'})
        .expect(400)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          resolvers = res.body;
          expect(resolvers).to.equal('Invoiced amount must be a number');
          done();
        });
    });

    it('should return a link with correct invoice information if params are sent', function(done) {
      var htmlString = '' +
      '<div style="background:#f7f7f7; padding: .5em;">' +
        '<h5>Invoice Amount: $10.17</h5>' + 
        '<a href="http://localhost:9000/pay-invoice?amount=10.17&customer=example@example.com">Click here to pay your invoice »</a>' +
      '</div>';
      this.request
        .send({ params: '{"invoicedAmount": 10.17, "invoicedPerson": "example@example.com"}'})
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          resolvers = res.body;
          expect(resolvers.body).to.equal(htmlString);
          done();
        });
    });

  });

});
