# node.js RESTful API proof of concept
The gloal is to explore node.js for building RESTful services

##Hello, World
**helloworld.js** is the fist script to check [node.js](http://nodejs.org/) installation.

## Restify
The first package to evaluate is [restify](https://github.com/mcavage/node-restify). The module is in ```restify/``` folder and the initial setup is

- **restify/app.js** : application start script
- **restify/package.json** : dependency management (restify dependency specifically)
- **restify/restify.iml** : InetelliJ IDEA module file (most of JavaScript/node.js functionality is provided in the ultimate edition)

From the command line fetch the dependencies locally

    $ npm install

and then start the application

    $ node app

The application is now running at [http://localhost:8888/](http://localhost:8888/) and can serve GET requests in JSON

- [http://localhost:8888/entity/52a8e68ddbd887088e000002](http://localhost:8888/entity/52a8e68ddbd887088e000002)
- [http://localhost:8888/entity/52a8e573dbd887088e000001](http://localhost:8888/entity/52a8e573dbd887088e000001)
- etc...

just echoing back the provided entity code

**[View commit](https://github.com/akutin/node-POC/commit/436b87bf165553fc9b9b041b33a65b7c500660cf)**

### Handle incoming data - create an entity

After adding a POST handler on the server instance and enabling parsing of request. For testing I used REST Client bundled with
IntelliJ. ```restify/entityPOST.xml``` can be imported there and executed. A sample request contains a data structure in the body

```JavaScript
    { "name": "Test entity", "erpCode": "ENT-001", "tag": "eq"}
```

and returns


```
    Content-Type: application/json
    Content-Length: 81
    Location: /entity/0.dzevauc0gmji3sor
```

```JavaScript
    {"code":"0.dzevauc0gmji3sor","erpCode":"ENT-001","name":"Test entity","tag":"eq"}
```

**[View commit](https://github.com/akutin/node-POC/commit/83e4d02276e2cd37cd61270a05ed7cbebe05fbc9)**

### Persistence with MongoDB

[Mongoose](http://mongoosejs.com/) is a MongoDB driver and object modelling module.

The logic how to update object's fields could be placed on the model, keeping the service layer clean and simple. 'LocationEntity' model
was introduced with Mongoose modelling and GET/POST methods now persist the data in MongoDB (which is supposed to run on your
local computer with default port setting).

As a next step PUT/DELETE were implemented and now it's a fully functional service to create, retrieve, update and delete an entity.

**[View commit](https://github.com/akutin/node-POC/commit/d0dad8a3a372bd1438c2ec5eb5abd258e8b736e7)**

### Add a collection as a field

First, added a new service mapping to retrieve a collection of locations. Next, added a field to represent a collection of attributes as:

```JavaScript
    [ { "name": "A1", "value": "V1"}, { "name": "A2", "value": 200.01} ]
```

One way to represent such a collection was:
```JavaScript
    var locationEntitySchema = mongoose.Schema({
        erpCode: { type: String, unique: true },

        ...

        attributes: [{}],

        ...
    });
```

and the other that I went for was to create a subType to represent each element of the collection.

The new field is available in the API for create/retrieve and update.

**[View commit](https://github.com/akutin/node-POC/commit/d7072e1018cb97cecc57f79adf2c140ce0a7444d)**

## Kraken.js framework for application structure and UI

So far Restify helped to build a headless REST API. Thought Restify lets define paths to serve static context to
serve html/css and client side JavaScript files the front end application would be quite decoupled from the server side code.
Kraken helps you to bind the two worlds together.

    $npm install -g generator-kraken
    $yo kraken

Kraken is one of Node.js modules, the above will install the suite globally and create a project stub.

**[Commit of kraken stub](https://github.com/akutin/node-POC/commit/95afd152f7ba1ec0cf72b478af7b5408e51f31af)**

```kraken\controllers\locations.js``` adds a controller that maps UI URL and API URLs. UI pages are template based with [Dust](http://akdubya.github.io/dustjs/)
One of the points that stopped me for a while was that it needs two files for each view ```kraken/locales/US/en/locations.properties``` and ```kraken/public/templates/locations.dust``` to be able
 to render the view in a browser.

Another part is localization with [Makara](https://github.com/paypal/makara) and a middleware code ```kraken/lib/language.js``` statically sets
the locale to US_en for now.

All together can render the basic view.

**[View commit](https://github.com/akutin/node-POC/commit/75416ae895ac8b5d36eccb3a42cb3a6c570bd5d1)**

And **[the template](https://github.com/akutin/node-POC/commit/b1cad6505de806ec433159a381f5dbde1f3e4543)**

## Sails.js

The framework is built on top of Express.js and provides a lot of extra functionality. [Sails](http://sailsjs.org/) sets
conventions for the project structure, automatically creates RESTful API for defined models and handles Socket.IO
just as regular requests automatically managing publish/subscribe for the clients.

To install sails globally run (after installing Node.js and its npm)

    $npm install sails -g

_version 0.9.7 had a bug that doesn't let it start on Windows, use 0.9.4 instead of newer than 0.9.7_

    $npm install sails@0.9.4 -g

### Create a sails.js project

    $sails new <project folder to be created>

### Project structure

- **sails/api** : The folder for model, controllers and other server side code
- **sails/assets** : The root of HTTP server with static content, not parsed by sails.js
- **sails/config** : Configuration files
- **sails/view** : Front-end templates, processed by the server before serving to clients
- **sails/app.js** : Startup script

## Sails with MongoDB

```sails/config/adapters.js``` configures MongoDB adapter and ```sails/package.json``` adds a dependency for
the database support. The model stub needs to be filled in with schema definitions (perhaps optional for MongoDB) but the empty
controller will still serve all standard framework requests in Public API as well as Socket.IO.

Generate stubs for models and controllers:

    $sails generate LocationEntity

the new object type LocationEntity will be available in RESTful API when you start the server with

    $sails lift

sails.js internally will create server routes to handle API requests for the new object type and the API supports GET/POST/PUT/DELETE
as well as GET versions:

- [http://localhost:8888/LocationEntity](http://localhost:8888/LocationEntity): to get a list of objects
- [http://localhost:8888/LocationEntity/52a8e68ddbd887088e000002](http://localhost:8888/LocationEntity/52a8e68ddbd887088e000002): to get an object by Id
- [http://localhost:8888/LocationEntity/create?erpCode=NEW-CODE](http://localhost:8888/LocationEntity/create?erpCode=NEW-CODE): to create a new object passing fields in the query string
- [http://localhost:8888/LocationEntity/update/52a8e68ddbd887088e000002?erpCode=UPDATED-CODE](http://localhost:8888/LocationEntity/update/52a8e68ddbd887088e000002?erpCode=UPDATED-CODE): to update an object passing fields to update in the query string
- [http://localhost:8888/LocationEntity/destroy/52a8e68ddbd887088e000002](http://localhost:8888/LocationEntity/destroy/52a8e68ddbd887088e000002): to delete an object by Id

**[View commit](https://github.com/akutin/node-POC/commit/6417c195ebf339515cded983db7e2ffc0333d24a)**

and the database configuration comes next:

**[View commit](https://github.com/akutin/node-POC/commit/b9d5a5ea2e649a4964a7820b1d026e27e07fc332)**

## Front-end with Ext JS

ExtJS is chosen not as the best candidate for the front-end but as the most familiar and rich technology. Site templates
are modified to bring in ExtJS styles and JavaScript. The library itself is considered as static content and goes
under ```sails/assets/extjs```. Though the code is not included in the project and you need to download a copy from [Sencha](http://www.sencha.com/products/extjs/).
( _I will later try to point it to [Sencha CDN](http://cdn.sencha.com/ext/gpl/4.2.1/)_ ).

## Adding Socket.IO

All ExtJS extensions go under ```sails/assets/extjs/ux``` and specifically I added SocketIO.js there. It looks for a global Socket.IO
object and sails.js already generated those scripts to help with integration

- **sails/assets/js/socket.io.js**: the original communication library
- **sails/assets/js/sails.io.js**: sails.js specific overrides to make it compatible with the server expectations

### ExtJS client side: mode, view, controller again

On the client side ExtJS runs in MVC model but those are specific to the UI, sails.js ones still stay and run on the server side.
The controller is quite different from sails.js to handle UI specific events and the model though shares field definitions but
could could also include client-side specifics.

The most interesting code goes into ```sails/assets/js/socketio/app/controller/EntityController.js``` where upon client application
 startup a new Socket.IO connection is created and then two handlers are defined to listen to the initial ```connection``` event to start to load data and
to ```message``` events that will bring data updates. The client side code will update the grid with any changes in the data automatically.

**[View commit](https://github.com/akutin/node-POC/commit/6cdbfda529b3fc17b8446d05660ef516e167c39e)**

There were a few later commits to make UI run smoothly, but they didn't add much in terms of overall concept.

## Sails.js in the cloud

The application was deployed to a cloud instance with [these instructions](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_nodejs.html). One side effect on
a free tiny AWS cloud instance is that they run a revers proxy in front of the server that doesn't let clients to establish efficient
 WebSocket permanent connection. But thanks to sails.js and socket.io it still works with a fallback to pull requests.





















