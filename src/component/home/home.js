import './home.scss'

import angular from 'angular'
import uirouter from 'angular-ui-router'

import routing from './home.route.js'
import homeController from './homeController'
import homeDirective from './homeDirective'
import request from '../common/service/service'

export default angular.module('app.home', [uirouter, request, homeDirective])
  .config(routing)
  .controller('homeController', homeController)
  .name
