'use strict'
import './component/common/style/index.scss';
import angular from 'angular';
import uirouter from 'angular-ui-router';
import routing from './app.config';
import home from './component/home/home';

angular.module('app', [uirouter, home])
  .config(routing);
