import './about.scss';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import aboutController from './aboutController';
import route from './about.route';
import request from '../common/service/service';

export default angular.module('app.about', [uirouter, request])
  .config(route)
  .controller('aboutController', aboutController)
  .name
