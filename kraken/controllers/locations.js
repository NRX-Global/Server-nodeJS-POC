var LocationEntity = require('../models/locationModel');

module.exports = function (server) {
    /**
     * Retrieve a list
     */
    server.get('/entity', function (req, res) {

        Product.find(function (err, list) {
            if (err) {
                console.log(err);
            }

            var model =
            {
                locations: list
            };
            res.render('products', model);
        });

    });


    /**
     * Add
     */
    server.post('/entity', function (req, res) {
        new LocationEntity().updateFrom( req.body).save( function(err, data) {
            if( err) {
                console.log( err);
                return next( err);
            }
            res.send( 201, data.toObject(), { "Location": "/entity/" + data.id});
        });
    });

    /**
     * Delete
     */
    server.delete('/products', function (req, res) {
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
    });


    /**
     * Update
     */
    server.put('/products', function (req, res) {
        console.log('PUT received. Ignoring.');
    });

};