'use strict'
import './component/common/style/index.scss'
import '../node_modules/toastr/build/toastr.min.css'
import angular from 'angular'
import uirouter from 'angular-ui-router'
import toastr from 'toastr'
import routing from './app.config'
import home from './component/home/home'
import demo from './component/demo/demo'
import about from './component/about/about'
import resume from './component/resume/resume'
import detail from './component/detail/detail'

angular.module('app', [uirouter, home, demo, about, resume, detail])
  .config(routing)
  .name