
// TODO: Find a better way to load different configs in different env
var dbConfig;
try {
    // Look for dev conf for local development
    dbConfig = require('./config/db.dev.conf.js');
} catch(e) {
    try {
        // production conf?
        dbConfig = require('./config/db.conf.js');
    } catch(e) {
        console.log('Startup failed.  No db config file found.');
        return false;
    }
}


var knex = require('knex')({
        client: 'mysql',
        connection: dbConfig
    }), 
    express = require('express'),
    bodyParser = require('body-parser'),
    oauthserver = require('oauth2-server'),
    Bookshelf = require('bookshelf'),
    messages = require('./util/messages');

var app = express();

Bookshelf.mysqlAuth = Bookshelf(knex);
Bookshelf.mysqlAuth.plugin('registry');

oauth = require('./models/oauth'),

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//oauth2授权
app.oauth = oauthserver({
  model: oauth,
  grants: ['password', 'refresh_token'],
  debug: true
});

app.all('/oauth/token', app.oauth.grant());
app.use(app.oauth.errorHandler());

app.listen(process.env.PORT || 3002);
console.log('oauth2-server listening on port 3002');
