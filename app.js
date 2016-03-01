'use strict';

var myApp = angular.module('myApp', ['LocalStorageModule', 'ngResource', 'ngRoute', 'route-segment', 'view-segment']);

myApp
  .controller('mainCtrl', ['$scope', 'localStorageService', 'CHAT_BOX_WORDS', 'msgFactory', 'STORAGE_MESSAGES', 'messageData',
    function($scope, localStorageService, CHAT_BOX_WORDS, msgFactory, STORAGE_MESSAGES, messageData){
    
    $scope.dictionary = CHAT_BOX_WORDS;
    $scope.storeMessages = STORAGE_MESSAGES;

    $scope.getFromStorage1Msgs = !!messageData[0] ? messageData[0] : [];
    $scope.getFromStorage2Msgs = !!messageData[1] ? messageData[1] : [];

    $scope.addMsg = function(chatNumber){
      var message = {
        text: chatNumber === $scope.storeMessages.storage1Msg ? $scope.chat1text : $scope.chat2text
      };
      var storage = chatNumber === $scope.storeMessages.storage1Msg ? $scope.storeMessages.storage2Msg : $scope.storeMessages.storage1Msg;
      var getFromStorage = chatNumber === $scope.storeMessages.storage1Msg ? $scope.getFromStorage2Msgs : $scope.getFromStorage1Msgs;
      getFromStorage.push(message);
      msgFactory.saveMessages(storage, message);
      if(chatNumber === $scope.storeMessages.storage1Msg) {
        $scope.chat1text = ''
      } else {$scope.chat2text = ''}
    }

    $scope.clearChat= function(storeMsg){
      localStorageService.remove(storeMsg);
      if(storeMsg === $scope.storeMessages.storage1Msg){
        $scope.getFromStorage1Msgs = [];
      } else if (storeMsg === $scope.storeMessages.storage2Msg){
        $scope.getFromStorage2Msgs = [];
      } else {
        msgFactory.removeMessages();
        $scope.getFromStorage1Msgs = [];
        $scope.getFromStorage2Msgs = [];
      }
    } 

  }])

.config(['localStorageServiceProvider', '$routeProvider', '$routeSegmentProvider', function (localStorageServiceProvider, $routeProvider, $routeSegmentProvider) {
  
  localStorageServiceProvider.
    setPrefix('myApp');

  $routeSegmentProvider.
  when('/',          's1').
  segment('s1', {
    templateUrl: 'views/home.html',
    controller: 'mainCtrl',
    resolve: {messageData: ['msgFactory', function(msgFactory){
      return msgFactory.getMessages();
      }]
    },
    untilResolved: { templateUrl: 'views/loading.html' },
    resolveFailed: { templateUrl: 'views/error.html' }
  })
  $routeProvider.otherwise({redirectTo: '/'}); 
}])