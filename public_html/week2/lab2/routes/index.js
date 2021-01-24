var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* GET about page. */
router.get('/about.hbs', function(req, res, next) {
  res.render('about', { title: 'About' });
});

/* GET form page. */
router.get('/form.hbs', function(req, res, next) {
  res.render('form', { title: 'Form' });
});

/* GET results page. */
router.get('/results.hbs', function(req, res, next) {
  res.render('results', { title: 'Results' });
});

module.exports = router;
