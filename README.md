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




