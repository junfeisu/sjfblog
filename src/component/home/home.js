import './home.scss';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './home.route.js';
import homeController from './homeController';

export default angular.module('app.home', [uirouter])
  .config(routing)
  .controller('homeController', homeController)
