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
        .send({ params: '{ "invoicingUser": "bob@example.com", "invoicedAmount": "nan", "invoicedPerson": "example@example.com"}'})
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
      '<div style="background:#f9f9f9; padding: 1em; font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; width: 300px;">' +
        '<h5 style="margin: 0;">Invoice Amount of $10.17 from:</h5>' +
        '<hr style="margin: 8px 0;" />' +
        '<h5 style="margin: 0 0 8px 0;">bob@example.com</h5>' +
        '<a style="font-size: 14px; color: #04A748;" href="http://localhost:9000/pay-invoice?amount=10.17&customer=example@example.com&user=bob@example.com">Click here to pay your invoice »</a>' +
      '</div>';
      this.request
        .send({ params: '{ "invoicingUser": "bob@example.com", "invoicedAmount": 10.17, "invoicedPerson": "example@example.com"}'})
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
