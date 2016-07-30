import './detail.scss';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import route from './detail.route'
import detailController from './detailController';
import request from '../common/service/service';

export default angular.module('app.home.detail', [uirouter, request])
	.config(route)
  .controller('detailController', detailController)
  .name
