import './detail.scss';

import angular from 'angular';
import uirouter from 'angular-ui-router';
 
import detailController from './detailController';
import route from './detail.route';
import request from '../common/service/service';

export default angular.module('app.detail',[uirouter,request])
	.config(route)
	.controller('detailController',detailController)
	.name
