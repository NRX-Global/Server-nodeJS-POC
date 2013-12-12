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
            res.send( data.toObject());
        } else {
            res.send( 404);
        }
    })
}

function handlePost( req, res, next) {
    console.log( "Create " + req.body.erpCode);
    new LocationEntity().updateFrom( req.body).save( function(err, data) {
        if( err) {
            console.log( err);
            return next( err);
        }
        res.send( 201, data.toObject(), { "Location": "/entity/" + data.id});
    });
}

function handlePut( req, res, next) {
    console.log( "Update " + req.params.code);

    LocationEntity.findById(  new mongoose.Types.ObjectId(req.params.code), function (err, data) {
        if(err) {
            console.log( err)
            return next( err);
        }
        if( data) {
            data.updateFrom( req.body).save( function(err, updated) {
                if( err) {
                    console.log( err);
                    return next( err);
                }
                res.send( 200, updated.toObject());
            });
        } else {
            res.send( 404);
        }
    })
}

function handleDelete( req, res, next) {
    console.log( "Delete " + req.params.code);

    LocationEntity.findById(  new mongoose.Types.ObjectId(req.params.code), function (err, data) {
        if(err) {
            console.log( err)
            return next( err);
        }
        if( data) {
            data.remove( function(err, updated) {
                if( err) {
                    console.log( err);
                    return next( err);
                }
                res.send( 200);
            });
        } else {
            res.send( 404);
        }
    })
}

var server = restify.createServer( { name: 'entityAPI' });
server.use(restify.bodyParser())

server.post('/entity', handlePost);
server.put('/entity/:code', handlePut);
server.get('/entity/:code', handleGet);
server.del('/entity/:code', handleDelete);

server.listen(8888, function() {
  console.log('%s listening at %s', server.name, server.url);
});