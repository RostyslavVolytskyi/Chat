'use strict'

myApp.factory('msgFactory', ['msgService', 'MESSAGE_SERVICE_ENDPOINT', 'localStorageService', '$q', 'STORAGE_MESSAGES',
  function(msgService, MESSAGE_SERVICE_ENDPOINT, localStorageService, $q, STORAGE_MESSAGES){
  
  function getMessages(){
    if(MESSAGE_SERVICE_ENDPOINT.length) {
      return msgService.get();
    } else {
      return [localStorageService.get(STORAGE_MESSAGES.storage1Msg),
              localStorageService.get(STORAGE_MESSAGES.storage2Msg)];
    }
  }

  function saveMessages(chatKey, msg){
    if(MESSAGE_SERVICE_ENDPOINT.length) {
      return msgService.save({'msg': msg});
    } else {
      var local = !!localStorageService.get(chatKey) ? localStorageService.get(chatKey) : [];
      local.push(msg);
      localStorageService.set(chatKey, local)
    }
  }

  function removeMessages(msg){
    if(MESSAGE_SERVICE_ENDPOINT.length) {
      return msgService.remove(msg);
    } else {
      return localStorageService.remove(STORAGE_MESSAGES.storage1Msg, STORAGE_MESSAGES.storage2Msg);
    }
  }
  
  return {
    getMessages: getMessages,
    saveMessages: saveMessages,
    removeMessages: removeMessages
  }

}]);