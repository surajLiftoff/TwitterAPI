//Install express server
const express = require('express');
var cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/twitter-api'));

app.get('/*', function(req, res) {

    res.sendFile(path.join(__dirname + '/dist/twitter-api/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);