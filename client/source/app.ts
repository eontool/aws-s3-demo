console.log('start...');
//common modules
import * as angular from 'angular';
import * as jQuery from 'jquery';
window.$ = window.jQuery = jQuery;

import mainCtrl from './controllers/mainCtrl';

export let app = angular.module('mainApp', []);

app.controller('mainCtrl', mainCtrl);



