const restify = require('restify');
const mysql = require('mysql');
const books = require('./books/books');
const server = restify.createServer();
const utils = require('./services/utils');

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());
server.use(restify.plugins.authorizationParser());
//comment out utils to not use api key or IP address whitelisting
utils(server);

//api versioning
//books route
server.post({path: '/books/new', version:'1.0.0'}, books.save)
server.post({path: '/books/new', version:'2.0.0'}, books.saveV2)
server.put('/books/:id', books.edit)
server.del('/books/:id', books.delete)
server.get('/books/:id', books.getOne)
server.get('/books', books.getAll)

server.listen(8080, () =>{
  console.log('listening on 8080');
})
