'use strict';

var myApp = angular.module("myApp", ['LocalStorageModule', 'ngResource']);

myApp.controller('mainCtrl', ['$scope', 'localStorageService', 'userService', function($scope, localStorageService, userService){

  $scope.users = userService.query();
  console.log($scope.users);

  $scope.somedata = userService.get({user: 4});
  console.log('somedata --> ', $scope.somedata);



  $scope.sendBtn = "Abschicken!";
  $scope.chat1 = "Chat 1";
  $scope.chat2 = "Chat 2";
  $scope.clear = "Clear";
  $scope.clearAll = "Clear All";
  $scope.messages1 = [];
  $scope.messages2 = [];

  $scope.getFromStorage2Msgs = localStorageService.get('storage2Msg');
  $scope.messages2 = $scope.messages2.concat($scope.getFromStorage2Msgs);

  $scope.getFromStorage1Msgs = localStorageService.get('storage1Msg');
  $scope.messages1 = $scope.messages1.concat($scope.getFromStorage1Msgs);

  $scope.addMsg1 = function(){
    $scope.messages2.push({text: $scope.chat1text});
    $scope.chat1text = '';
    localStorageService.set('storage2Msg', $scope.messages2);
    $scope.getFromStorage2Msgs = localStorageService.get('storage2Msg');
  }

  $scope.addMsg2 = function(){
    $scope.messages1.push({text: $scope.chat2text});
    $scope.chat2text = '';
    localStorageService.set('storage1Msg', $scope.messages1);
    $scope.getFromStorage1Msgs = localStorageService.get('storage1Msg');
  }

  $scope.clearChat1= function(){
    localStorageService.remove("storage1Msg");
    $scope.messages1 = [];
    $scope.getFromStorage1Msgs = [];
  }

  $scope.clearChat2= function(){
    localStorageService.remove("storage2Msg");
    $scope.messages2 = [];
    $scope.getFromStorage2Msgs = [];
  }  

  $scope.clearChats= function(){
    localStorageService.remove("storage1Msg", "storage2Msg");
    $scope.messages1 = [];
    $scope.messages2 = [];
    $scope.getFromStorage1Msgs = [];
    $scope.getFromStorage2Msgs = [];

  } 

}])

myApp.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('myApp');
});