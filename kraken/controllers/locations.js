var LocationEntity = require('../models/locationModel');

module.exports = function (server) {
    /**
     * Retrieve a list - UI
     */
    server.get('/entity', function (req, res) {

        LocationEntity.find(function (err, list) {
            if (err) {
                console.log(err);
            }

            var model =
            {
                locations: list
            };

            res.render('locations', model);
        });

    });


    /**
     * Retrieve a list - API
     */
    server.get('/api/entity', function (req, res) {

        LocationEntity.find(function (err, list) {
            if (err) {
                console.log(err);
            }

            if( !list) {
                list = [];
            }
            res.send( list.map( function(data) { return data.toObject()}));
        });

    });

    /**
     * Retrieve one - API
     */
    server.get('/api/entity/:code', function (req, res) {
        LocationEntity.findById(  LocationEntity.toObjectId( req.params.code), function (err, data) {
            if(err) {
                console.log( err)
            }
            if( data) {
                res.send( data.toObject());
            } else {
                res.send( 404);
            }
        });
    });

    /**
     * Add - API
     */
    server.post('/api/entity', function (req, res) {
        new LocationEntity().updateFrom( req.body).save( function(err, data) {
            if( err) {
                console.log( err);
                return next( err);
            }
            res.send( 201, data.toObject(), { "Location": "/entity/" + data.id});
        });
    });

    /**
     * Add - UI
     */
    server.post('/entity', function (req, res) {
        new LocationEntity().updateFrom( req.body).save( function(err, data) {
            if( err) {
                console.log( err);
            }
            res.redirect( "/entity");
        });
    });

    /**
     * Delete
     */
    server.delete('/api/entity/:code', function (req, res) {
        console.log( "Delete " + req.params.code);

        LocationEntity.findById(  LocationEntity.toObjectId(req.params.code), function (err, data) {
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
    });


    /**
     * Delete UI
     */
    server.delete('/entity/:code', function (req, res) {
        console.log( "Delete " + req.params.code);

        LocationEntity.findById(  LocationEntity.toObjectId(req.params.code), function (err, data) {
            if(err) {
                console.log( err)
            }
            if( data) {
                data.remove( function(err) {
                    if( err) {
                        console.log( err);
                    }
                    res.redirect( "/entity");
                });
            } else {
                res.send( 404);
            }
        })
    });


    /**
     * Update
     */
    server.put('/api/entity/:code', function (req, res) {
        console.log('PUT received. Ignoring.');
    });

};