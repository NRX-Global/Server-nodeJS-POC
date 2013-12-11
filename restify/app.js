var restify = require('restify');
var mongoose = require('mongoose');

var db = require('./db');
var LocationEntity = require('./location.js');

function handleGet(req, res, next) {
    console.log( "Fetch by " + req.params.code);
    LocationEntity.findById(  new mongoose.Types.ObjectId(req.params.code), function (err, data) {
        if(err) {
            console.log( err)
        }
        if( data) {
            res.send( data);
        } else {
            res.send( {});
        }
    })
}

function handlePost( req, res, next) {
    console.log( "Create " + req.body.erpCode);
    var data = new LocationEntity({
        erpCode: req.body.erpCode,
        name: req.body.name,
        tag: req.body.tag
    });
    data.save( function(err, data) {
        if( err) {
            console.log( err);
        }
        res.send( 201, data, { "Location": "/entity/" + data.id});
        next( err);
    });
}

var server = restify.createServer( { name: 'entityAPI' });
server.use(restify.bodyParser())

server.post('/entity', handlePost);
server.get('/entity/:code', handleGet);

server.listen(8888, function() {
  console.log('%s listening at %s', server.name, server.url);
});