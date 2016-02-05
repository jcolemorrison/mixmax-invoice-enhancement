/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/resolver              ->  index
 */

'use strict';

function index(req, res) {
  res.json([]);
}

function create(req, res) {

  var data = req.body.params ? JSON.parse(req.body.params) : false;

  if (!data || !data.invoicedAmount || !data.invoicedPerson || !data.invoicingUser) {
    res.status(400).json('Invalid params');
    return;
  }

  if (typeof data.invoicedAmount !== 'number') {
    res.status(400).json('Invoiced amount must be a number');
    return;
  }

  var htmlString = '' +
  '<div style="background:#f9f9f9; padding: 1em; font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; width: 300px;">' +
    '<h5 style="margin: 0;">Invoice Amount of $' + data.invoicedAmount + ' from:</h5>' + 
    '<hr style="margin: 8px 0;" />' +
    '<h5 style="margin: 0 0 8px 0;">' + data.invoicingUser + '</h5>' +
    '<a style="font-size: 14px; color: #04A748;" href="http://localhost:9000/pay-invoice?amount=' + data.invoicedAmount + '&customer=' + data.invoicedPerson + '&user=' + data.invoicingUser + '">Click here to pay your invoice »</a>' +
  '</div>';
  res.json({
    body: htmlString
  });
}

// Gets a list of Resolvers
export { index, create };