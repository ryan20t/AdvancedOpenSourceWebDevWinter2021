var express = require('express')
var hbs = require('hbs')
var app = express()

var randomNumber = require('./modules/randomNum')
console.log("Both :", randomNumber)
console.log("Rando: ", randomNumber.rando)
console.log("Better rando: ", randomNumber.betterRando)