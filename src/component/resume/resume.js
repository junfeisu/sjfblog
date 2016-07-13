import './resume.scss';

import angular from 'angular';
import uiroute from 'angular-ui-router';

import resumeController from './resumeController';
import route from './resume.route';
import request from '../common/service/service';

export default angular.module('app.resume',[uiroute,request])
	.config(route)
	.controller('resuneController',resumeController)
	.name
