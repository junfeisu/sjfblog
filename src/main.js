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

console.log("%c苏俊飞"," text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:16em;color:#fff;");

angular.module('app', [uirouter, home, demo, about, resume, detail])
  .config(routing)
  .name