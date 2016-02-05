'use strict';

var app = require('../..');
import nock from 'nock';
import request from 'supertest';


describe('PayInvoice API:', function() {

  describe('GET /api/pay-invoice', function() {
    var payInvoices;

    beforeEach(function(done) {
      request(app)
        .get('/api/pay-invoice')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          payInvoices = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(payInvoices).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/pay-invoice', function () {

    var resolvers;

    beforeEach(function() {
      this.request = request(app)
        .post('/api/pay-invoice');
    });

    afterEach(function() {
      resolvers = undefined;
      nock.cleanAll();
    });

    it('should return an error if no token is supplied', function(done) {

      this.request
        .send(
          {
            card: { number: 4242424242424242, exp_month: 12, exp_year: 2017, cvc: 123 },
            invoice: { amount: 10.17, customer: 'bob@example.com', user: 'john@example.com' }
          }
        )
        .expect(400)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          resolvers = res.body;
          expect(resolvers).to.equal('valid stripe token required');
          done();
        });

    });

    it('should return an error if no token is supplied', function(done) {

      this.request
        .send(
          {
            card: { number: 4242424242424242, exp_month: 12, exp_year: 2017, cvc: 123 }
          }
        )
        .expect(400)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          resolvers = res.body;
          expect(resolvers).to.equal('valid stripe token required');
          done();
        });

    });

    it('should create a stripe charge', function(done) {

      var stripeCharges = nock('https://api.stripe.com')
        .post('/v1/charges')
        .reply(200, {});

      this.request
        .send(
          {
            card: { number: 4242424242424242, exp_month: 12, exp_year: 2017, cvc: 123, token: 'sometoken' },
            invoice: { amount: 10.17, customer: 'bob@example.com', user: 'john@example.com' }
          }
        )
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

    it('should return the stripe error if charge fails', function(done) {

      var stripeCharges = nock('https://api.stripe.com')
        .post('/v1/charges')
        .reply(400, { error: { message: 'Invalid request' } });

      this.request
        .send(
          {
            card: { number: 4242424242424243, exp_month: 12, exp_year: 2017, cvc: 123, token: 'sometoken' },
            invoice: { amount: 10.17, customer: 'bob@example.com', user: 'john@example.com' }
          }
        )
        .expect(400)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          resolvers = res.body;
          done();
        });

    });


  })

});
