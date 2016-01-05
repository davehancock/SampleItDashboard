var express = require('express');
var favicon = require('serve-favicon');

var app = express();

app.use(favicon(__dirname + '/assets/images/favicon.png'));

app.use(express.static('assets'));

app.get('/*', function (req, res) {
    res.sendFile(__dirname +'/assets/index.html');
});

app.listen(4444, function () {
    console.log('Server Listening on port:', 4444);
});


