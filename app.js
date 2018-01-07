// app.js

const   express = require("express"),
        path = require("path"),
        port = process.env.PORT,
        app = express();

// set views directory as location of templates and which view engine to use
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'pug');


        
// allow directory ./public to serve static files
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('homepage', {
        user: 'Gabe',
    });
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
        
        

