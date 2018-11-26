var express = require('express');
var router = express.Router();
var shortener = require('../services/shortener')

/* GET result url. */
router.get('/', function(req, res, next) {
  res.render('error', { error: 'GET method not supported for this page' });
});

/*POST call from index form.
req--> request
res--> response to be shown
next--> page redirect*/
router.post('/', function(req, res, next) {
  var result = shortener.shorten(req);
  var url = result[0];
  var email = result[1];
  res.render('result', {url: url,email: email});
});

/*Export router means to export the routes to this page*/
module.exports = router;
