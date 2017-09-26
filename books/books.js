const mysql = require('mysql');
const handler = require('../services/handler');
const keys = require('../config/keys');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: keys.sql_password,
  database: 'bookshop'
});

exports.save = function(req, res, next) {
  const { title, description, images, price } = req.body;
  const book = {
    title,
    description,
    images,
    price
  }
  connection.query("INSERT INTO books SET ? ",book, (err, data) => {
    if(err) {
      handler.errors(res, next, err, 500);
    } else {
      handler.success(res, next, data);
    }
  });
}

exports.saveV2 = function(req, res, next) {
  const { title, description, images, price, create_date } = req.body
  const book = {
    title,
    description,
    images,
    price,
    create_date
  }
  connection.query("INSERT INTO books SET ? ",book, (err, data) => {
    if(err) {
      handler.errors(res, next, err, 500);
    } else {
      handler.success(res, next, data);
    }
  });
}

exports.edit = function(req, res, next) {
  connection.query("UPDATE books SET ? WHERE id = " + req.params.id, book, (err, data) => {
    if(err) {
      handler.errors(res, next, err, 500);
    } else if (data === []) {
      handler.errors(res, next, "The specified data cannot be found", 404);
    } else {
      handler.success(res, next, data);
    }
  });
}

exports.getOne = function(req, res, next) {
  connection.query("SELECT * FROM books WHERE id = ?", req.params.id, (err, data) => {
    console.log(data);
    if(err) {
      handler.errors(res, next, err, 500);
    } else if(data === []) {
      handler.errors(res, next, "The specified data cannot be found", 404);
    } else {
      handler.success(res, next, data);
    }
  });
}

exports.getAll = function(req, res, next) {
  connection.query("SELECT * FROM books", (err, data) => {
    if(err) {
      handler.errors(res, next, err, 500);
    } else {
      handler.success(res, next, data);
    }
  });
}

exports.delete = function(req, res, next) {
  connection.query("DELETE FROM books WHERE id = ?", req.params.id, (err, data) => {
    if(err) {
      handler.errors(res, next, err, 500);
    } else if(data === []) {
      handler.errors(res, next, "The specified data cannot be found", 404);
    } else {
      handler.success(res, next, data);
    }
  });
}
