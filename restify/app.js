var restify = require('restify');

function handleGet(req, res, next) {
    console.log( "Fetch by " + req.params.code);
    var result = {
        code: req.params.code
    };
    res.setH
    res.send( result );
}

function handlePost( req, res, next) {
    console.log( "Create " + req.body.erpCode);
    var result = {
        code: Math.random().toString(36),
        erpCode: req.body.erpCode,
        name: req.body.name,
        tag: req.body.tag
    };

    res.send(
        201,
        result,
        {
            "Location": "/entity/" + result.code
        }
    );
}

var server = restify.createServer( { name: 'entityAPI' });
server.use(restify.bodyParser())

server.post('/entity', handlePost);
server.get('/entity/:code', handleGet);

server.listen(8888, function() {
  console.log('%s listening at %s', server.name, server.url);
});