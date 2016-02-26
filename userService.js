'use strict'

myApp.service('userService', ['$resource', function($resource){
  return $resource('http://jsonplaceholder.typicode.com/users/:user', {user: '@user'});
}]);