import './demo.scss';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import demoController from './demoController';
import route from './demo.route';
import request from '../common/service/service';

export default angular.module('app.demo',[uirouter, request])
	.config(route)
	.controller('demoController',demoController)
	.name
