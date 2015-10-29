var express = require('express');

var router = express.Router();

router.get('/', function(req, res, next) {
    var regions = [
        { label: 'North America', code: 'na' },
        { label: 'Brazil', code: 'br' },
        { label: 'Europe North & East', code: 'eune' },
        { label: 'Europe West', code: 'euw' },
        { label: 'Korea', code: 'kr' },
        { label: 'Latin America North', code: 'lan' },
        { label: 'Latin America South', code: 'las' },
        { label: 'Oceania', code: 'oce' },
        { label: 'Russia', code: 'ru' },
        { label: 'Turkey', code: 'tr' },
    ];

    res.json(regions);
});

module.exports = router;
