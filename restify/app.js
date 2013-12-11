var restify = require('restify');

function handleGet(req, res, next) {
    console.log( "Fetch by " + req.params.code);
    var result = {
        code: req.params.code
    };
    res.send( result );
}

var server = restify.createServer( { name: 'entityAPI' });
server.get('/entity/:code', handleGet);

server.listen(8888, function() {
  console.log('%s listening at %s', server.name, server.url);
});