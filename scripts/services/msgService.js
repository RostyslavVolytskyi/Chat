'use strict'

myApp.service('msgService', ['$resource', 'MESSAGE_SERVICE_ENDPOINT',function($resource, MESSAGE_SERVICE_ENDPOINT){

  return $resource(MESSAGE_SERVICE_ENDPOINT, 
    {},
    {
      'get': {
        url: MESSAGE_SERVICE_ENDPOINT + '/getmsg'
      },
      'save': {
        url: MESSAGE_SERVICE_ENDPOINT + '/savemsg'
      },
      'remove': {
        url: MESSAGE_SERVICE_ENDPOINT + '/removemsg'
      }
    });
}]);