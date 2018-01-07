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
        
        

