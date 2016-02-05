/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/pay-invoice              ->  index
 */

'use strict';

var stripe = require('stripe')('sk_test_wWfkUMUqXyV7hYhIJEpF2J1j');

// Gets a list of PayInvoices
function index(req, res) {
  res.json([]);
}

function convertToCents(amount) {
  return parseInt((parseFloat(amount) * 100), 10);
}

function create(req, res) {

  var card = req.body ? req.body.card : false;
  var invoice = req.body ? req.body.invoice : false;
  if (!card.token) {
    res.status(400).json('valid stripe token required');
  }
  if (!invoice) {
    res.status(400).json('an invoice to charge is required');
  }
  stripe.charges.create({
    amount: convertToCents(invoice.amount),
    source: card.token,
    currency: 'usd',
    description: `a charge from ${invoice.user} to ${invoice.customer}`
  }, function (err, charge) {

    if (res.headersSent) {
      return;
    }
    if (err) {
      res.status(400).json(err.message);
    } else {
      res.json(charge);
    }
  });
}


export { index, create };
