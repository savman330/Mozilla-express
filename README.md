# Mozilla-Express Tut

### 1 - what is Node/Express?

Node is a Javascript runtime environment that is inteneded to be run outside the browser.  (which is nice b/c you can 
test scripts from the command line with node <script_name>.js).

You can trivially create a simple web server to respond to http requests using just the Node http request package.

```javascript
// node_http.js

// load http module
const   http = require("http"),
        port = process.env.PORT;

// create an http server and listen on port 8080 (in this case process.env.PORT b/c C9.io)
http.createServer((req, res) => {
    // set res HTTP header with status and content type
    res.writeHead(200, { 'Content-type': 'text/plain' });
    
    //send back 'hello world' as a respnose
    res.end('Hello World from Node!\n')
}).listen(port);

// print port to console
console.log(`server is running at ${port}`);
```

Other common web development tasks like process GET, PUT, DELETE, POST, etc., seperately handles requests
at different URL paths ('routes'), serve static files, or use templates to dynamically create a response are not 
directly supported by Node. So you can just write all the code to do these things yourself, or we can use a framework; 
enter Express!.

Express is the most popular Node framerwork and is the underlying library for many popular Node frameworks.
It proves mechanims to:
 * write handlers for requests with different HTTP verbs at different routes
 * integrate with 'view' rendering engines in order to generate responses by inserting data into templates
 * set common web application setting like the port to use for connecting, and the locatoin of the templates that are used for rendering the pipeline
 * add additional request processing 'middleware' at any point within the request handling pipeline
 
While Express is fairly minimalist developers have created a suite of 3rd party libraries to handle common use cases such as
cookies, sessions, user logins, URL parameters, POST data, security headers and MANY more.  See [Express middleware](http://expressjs.com/en/resources/middleware.html).

_Note: this flexibility is a double edged sword....there is no 'right' way to construct an app but there are many wrong ways and 
the internet is full of tutorials showing you how to do it wrong!. caveat emptor!_

Express is an unopinionated framework.

Opinionated frameworks are good for soving a specific set of probelms.  There is a 'right way' to do certain tasks. The trade off is 
opinionated frameworks become brittle when they are pushed outside their intended purposes.  Additionaly, all the 'magic' they offer
makes it difficult to trace bugs and understand what's going on.

In an unopinionated frameworks have far fewer reqstrictions on the best way to glue together components to acheive a goal, or even 
what components should be used!  They make it easier for developers to make a tool specific to a job; albeit at a cost, as you have to 
figure out what components to use to accomplish said job.

In a traditional data driven website the web server waits for HTTP requests from the browser (or other client). Then it must
work out what to do with each request.  

Express provides methods to specify what funciton is called for a particular HTTP verb (GET, POST, SET, PUT, DELETE, etc.) and URL pattern
(route), and methods to specify what template (view) engine is to be used, where template files are located, and what template to use to render a 
response.  You can use Express middleware to add support for cookies, sessions, users, getting POST/SET parameters, etc. You can also use
any database mechanism compatible with Node.


#### Hello World Express

```javascript
// app.js

const   express = require("express"),
        app = express(),
        port = process.env.PORT;
        
app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

```

The first lines import the Express module and create an instance of express we declare as the app variable.  This instance has methods for 
routing HTTP requests, configuring middleware, rendering HTML views, registering a template engine, and modifying [application settings](https://expressjs.com/en/4x/api.html#app.settings.table) 
that dictate how the application behaves.(e.g. the environment mode, whether routes are case sensitive etc. )

The middle part of the code shows a route defenition.  The app.get() method specifies a callback funciton that will be invoked whenever there is 
a HTTP GET reqeust on the path '/' relative to the site root.  The callback takes a request and response object as arguemnts. Here we simply call
```send``` on the response object and send the string  ```'Hello from Express'```.

The final block starts the server on our specified port and executes a callback that simply logs ```listegning on port ${port}``` to the console.


#### Importing modules

A module is Javascript libaray/file that you can import into a script using Node's ```require()``` method.  Express itself is a module
as are the middleware and database libraries we use in our apps.

We can create out own modules and import them as practice. 

_aside: creating modules allows use to seperate the different parts/logic of our applications; this makes them easier to maintain
and makes it easier to find errors/debug.  Additionally, by keeping functions seperate it keeps the namespace clean as we only
populate our main namespace with the single name we export._

To make objects accessible outside of a module all you need to do is assign them to the ```exports``` object. For example square.js module below
export the ```area()``` and ```perimeter``` methods.  

```javascript
// square.js

/*
x denotes the lengt of the side of the square.

the area() method returns the area of the square.
the perimiter() method returns the perimiter of the square.  
*/


        
        
exports.area = (x) => {
    return x*x;
};

exports.perimiter = (x, y) => {
    return x*4;  
};
```

Then we can import the object and log the output to console:

```javascript
// imp.js

const   square = require("./square");

let side = 6;

console.log(`the area of a square with side of ${side} is ${square.area(side)}; the perimiter is ${square.perimiter(side)}`);
```
#### Using Ascynchrnous APIs

synchronous code execution:

```javascript
console.log('one');
console.log('two');
```
will print to stdout what we expect: 

```
one
two
```

Here we use the setTimeout function to make a console.log async:
```javascript
setTimeout( () => {
 console.log('first');   
}, 3000);

console.log('second');
```

which will print out: 
```
second
first
```

Because the callback function doesn't fire until 3000ms has passed despite the fact we called the setTimeout funcntion prior to logging 'two'.


Using non blocking asynchronous APIs is even more important in Node than in the browswer b/c Node is a single threaded event driven environment.
All process are on running on the same thread which is efficeint and fast in terms of server resources, but if we call any blocking functions
that take a long time to complete no code can execute beyond the blocking funcion despite the fact the server resources are idle.

However, there are ways around this.  The most common way is to register a callback function that will fire after an event...e.g. if waiting
for an http request the callback will fire once the request has comeback but in the mean time code will continue to be executed.  


#### Creating route handlers

In our Hello World Express we defined a callback routed handler for an HTTP GET request on the '/' URL path. 

```javascript
app.get('/', (req, res) => {
    res.send('Hello from Express!');
});
```
The callback function takes request and response objects. In this case we simply called ```send()``` on the response object to send the
string ```'Hello from Express'```.  There are many other [response methods](https://expressjs.com/en/guide/routing.html#response-methods).  
Some examples are ```res.sendFile()``` to send a file and ```res.json()``` to send a JSON response.

There is a special routing method ```app.all()``` which will be called in response to *_any_* HTTP request.  It is used for loading middleware
functions at a particular path for all request methods.  

Often it is useful group route handlers for a particular part of site together and access them using a common route-prefix. (e.g. a site with 
a wiki page might have a route /wiki/ which holds all wiki routes) This can be acheived with the ```express.Router()``` object.  For example 
with our wiki page:

```javascript
// wiki.js - wiki route module
const   express = require('express'),
        router = express.Router();
        
// Home page route
router.get('/', (req, res) => {
    res.send('Wiki homepage');
});

// About page route
router.get('/about', (req, res) => {
    res.send('About this wiki');
});

module.exports = router;
```
To use the router in our main js file (e.g. app.js, or server.js) we begin by importing the wiki routes module.  Then we use the 
```app.use``` method to add the router to the middleware handling path. Two routes then become accessible ```/wiki/``` and ```/wiki/about```.

```javascript

const   wiki = require('./wiki.js');

app.use('/wiki', wiki);
```

#### Using middleware

Middleware is used extensively in Express, from serving static files, to error handling, to compressing HTTP responses. **Whereas route functions
end the HTTP request by returning a response to the HTTP client, middleware functions _typically_ perform some operation on the request
or response then call the next function in the 'stack', which might be more middleware or another route handler.**

> **Note:** The middleware can perform any operation, execute any code, make changes to the request and response object, and it 
> can **also end the request-response cycle. If it does not then end the cycle it must call next() to pass control the the next middleware
> function or the request will be left hanging.**

Most apps will use third-party middleware to simplify common web dev tasks like cookies, sessions, user auth, accessing request POST 
and JSON data, logging, etc.  You can find [a list of middleware packages maintainted by the Express team here.](http://expressjs.com/en/resources/middleware.html).

##### Example of using middleware

To use third-party middleware you must first install it:
_if using in app ```npm install --save morgan``` to make in a dependancy_
```
npm install morgan
```

Then we must require it in our script: 

```javascript
const   express = require('express'),
        logger = require('morgan'),
        app = express();
        
app.use(logger('dev'));
```
> **Note: middleware and routing functions are called in the order that they are declared.  For some middleware the order is important...
> e.g. if session middleware depends on cookie middleware then cookie middleware must be called first.  It is almost always the case taht 
> middleware is called before setting routes or your route handlers will not have access to the middleware funcitonality.

You can write your own middleware functions and you are likely to do so if only to create error handling code.  **The _only_ difference
between a middleware function and a route handler callback is the middleware functions have a third argument ```next```, which middleware 
functions are expected to call if the do not complete the request cycle.**

You can add a middleware function to the processing chain with either ```app.use()``` or ```app.add()```, depending on whether you want to apply
the middleware to all responses or to responses with a particualr HTTP verb.  You speciy routes the same in both cases, though the route is optional
when using ```app.use()```.

The example below shows how to add a middleware function using both methods:

```javascript
// middle_examp.js

const   express = require("express"),
        app = express(),
        port = '$PORT';
        

// an example middleware funciton

var middlewareFunction = (req, res, next) => {
  
  /*
  perform some operations
  */
  
  // then call next() so Express will call the next middleware function in the chain
  next();
};

// function added with app.use() so it applies to all routes and verbs
app.use(middlewareFunction);

// function added with app.use() for a specific route
app.use('/someroute', middlewareFunction);

// a middleware function added for a specific HTTP verb and route
app.get('/anotherroute', middlewareFunction);

app.listen(port);
```

The Express documentation has much more on [using](https://expressjs.com/en/guide/using-middleware.html) and [writing](http://expressjs.com/en/guide/writing-middleware.html) 
Express middleware.

#### Serving static files

You can use the Express.static()  middleware to serve static files.  It's the only middleware thats part of Express. For example
you would use the line below to serve images, CSS files, and Javascript files from a directory named **'public'** at the same level where
you call Node:

```javascript
app.use(express.static('public'));
```

Any files in the public directory are served by adding their filename (relative to the base 'public' directory) to the base URL.

> **potential point of confusion here:** when we say declare a 'src' 'path' in a ```<script src='pathtofile'> the 'path' is actually
> a route.  That can be confusing.  Remeber we are _serving_ the (in this case) javascript file.  We are declaring a path.  So 
> our static middleware knows to look for static files in the public folder.....so when we have say a ```<script>``` element the ROUTE
> is actually /public/pathtofile; that's been a source of confusion for me.  We are SERVING, hence we use a URL ROUTE.  slight difference
> from a path.

For example:

```
http://localhost:3000/images/dog.jpg
http://localhost:3000/images/cat.jpg
http://localhost:3000/js/ascript.js
http://localhost:3000/css/somestyle.css
etc...
```

You can call ```static()``` multiple times to serve multiple directories. If a file cannot be found by one of middleware function then it will
simply be passed to the subsequent middleware.

```javascript
app.use(express.static('public'));
app.use(express.static('media'));
```

You can also add a virtual prefix to your static URL's, rather than having the files added to the base URL. For example here we specify a 
mount path so that the files are loaded with the prefix '/media'.

```javascript
app.use('/media', express.static('public'));
```

Below is a simple app that illustrates the concepts above.  I have a public folder in root that containss a js directory with a script, test.js, 
that simply logs a string to console to verify operation.  Lastly I have a rudimentary index.html page in the root directory which I am 
sendin with the sendFile() method on the response object.

```javascript
// app.js

const   express = require("express"),
        path = require("path"),
        port = process.env.PORT,
        app = express();
        
// allow directory ./public to serve static files
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
        
```

index.html
```html
<!DOCTYPE html>
<html>
<head>
    <title>
        A clever title
    </title>
</head>
<body>
    <div id='container'>
        Hello World!
    </div>
    <script type='text/javascript' src='js/test.js'></script>
</body>
</html>
```
/public/js/test.js
```javascript
// test.js

console.log("this is working yo!");
```






