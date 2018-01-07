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
