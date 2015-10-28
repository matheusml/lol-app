var express = require('express');
var rest = require('restler');

var router = express.Router();

var KEY = '8bb1d844-5642-42e5-8e13-1a15596633a5';
var BASE_URL = 'https://{REGION}.api.pvp.net/api/lol/{REGION}/';

router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/players/:id/regions/:region', function(req, res, next) {
	var id = req.params.id;
	var region = req.params.region;

	rest.json(replaceUrlWithRegion(region) + 'v1.3/stats/by-summoner/' + id + '/summary?season=SEASON2015&api_key=' + KEY)
		.on('complete', function(data, response) {
			if (response.statusCode === 200) {
				res.json(data);
			}
			else {
				res.json();
			}
	});
});

router.get('/players/username/:username/regions/:region', function(req, res, next) {
	var name = req.params.username;
	var region = req.params.region;

	rest.json(replaceUrlWithRegion(region) + 'v1.4/summoner/by-name/' + name + '?api_key=' + KEY)
		.on('complete', function(data, response) {
			if (response.statusCode === 200) {
				res.json(data);
			}
			else {
				res.json();
			}
	});
});

function replaceUrlWithRegion(region) {
	return BASE_URL.replace(/{REGION}/g, region);
}

module.exports = router;
