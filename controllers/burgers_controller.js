var express = require("express");
var router = express.Router();

var burger = require("../models/burger.js");

router.get('/index', function(req, res) {
    burger.selectAll(function(data) {
        var hbsObject = {
            burger: data
        };
        console.log(hbsObject);
        res.render('index', hbsObject);
    });
});

router.post('/api/burgers', function(req, res) {
    burger.insertOne([
        'burger_name', 'devoured'
    ], [
        req.body.burger_name, req.body.devoured
    ], function(result) {
        res.redirect('/index');
    }
);
});

router.put('/api/burgers/:id', function(req, res) {
    var condition = 'id = ' + req.params.id;

    console.log('condition', condition);

    burger.updateOne({
       devoured: req.body.devoured
    }, condition, function(result) {
        res.redirect('/index')
    }
)
});

module.exports = router;