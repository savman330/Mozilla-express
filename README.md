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



