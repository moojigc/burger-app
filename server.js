const express = require('express'),
    exphbs = require('express-handlebars'),
    Burger = require('./lib/Burger');

const PORT = process.env.PORT || 3000,
    { HOST, USER, PASSWORD, DATABASE } = process.env.PORT ?　process.env : require('./config.json').dev;

console.log(HOST);

