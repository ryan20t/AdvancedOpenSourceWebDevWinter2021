var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Grid Builder' });
});

router.post('/grid', function(req, res, next){
  res.render('grid', {
    title: 'Grid Display',
    size: req.body.gridDimensions
  })
})

module.exports = router;