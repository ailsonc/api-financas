var app = require('./src/config/express');

var server = app.listen(app.get('port'), function() {
    console.log('Server started %s',server.address().port);
});