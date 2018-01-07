// one.js

const   express = require("express"),
        logger = require("morgan"),
        app = express();
        
app.use(logger('dev'));
