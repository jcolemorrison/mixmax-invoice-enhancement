'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var payInvoiceCtrlStub = {
  index: 'payInvoiceCtrl.index'
};

var routerStub = {
  get: sinon.spy(),
  post: sinon.spy()
};

// require the index with our stubbed out modules
var payInvoiceIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './pay-invoice.controller': payInvoiceCtrlStub
});

describe('PayInvoice API Router:', function() {

  it('should return an express router instance', function() {
    expect(payInvoiceIndex).to.equal(routerStub);
  });

  describe('GET /api/pay-invoice', function() {

    it('should route to payInvoice.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'payInvoiceCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

});
