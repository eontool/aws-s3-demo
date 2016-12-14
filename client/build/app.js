"use strict";
console.log('start...');
//common modules
const angular = require('angular');
const jQuery = require('jquery');
window.$ = window.jQuery = jQuery;
const mainCtrl_1 = require('./controllers/mainCtrl');
exports.app = angular.module('mainApp', []);
exports.app.controller('mainCtrl', mainCtrl_1.default);
