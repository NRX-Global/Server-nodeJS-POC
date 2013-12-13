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







