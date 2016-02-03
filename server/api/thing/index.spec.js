'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var thingCtrlStub = {
  index: 'thingCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var thingIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './thing.controller': thingCtrlStub
});

describe('Thing API Router:', function() {

  it('should return an express router instance', function() {
    expect(thingIndex).to.equal(routerStub);
  });

  describe('GET /api/things', function() {

    it('should route to thing.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'thingCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

});
