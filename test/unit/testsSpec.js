'use strict';

describe('Testing msgFactory', function () {

  var msgFactory,
      MESSAGE_SERVICE_ENDPOINT,
      localStorageService,
      msgService;

  beforeEach(function () {
    module('myApp');
    module(function($provide) {
      $provide.value('msgService', {
        get: function() {
          return true;
        }
      });

    });

    inject(function (_msgFactory_, _MESSAGE_SERVICE_ENDPOINT_, _localStorageService_, _msgService_) {
      msgFactory = _msgFactory_;
      MESSAGE_SERVICE_ENDPOINT = _MESSAGE_SERVICE_ENDPOINT_;
      localStorageService = _localStorageService_;
      msgService = _msgService_;
    });

  });

  it('getMessages be defined', function(){
    expect(msgFactory.getMessages).toBeDefined();
  });

  it('should choose local storage when no server URL provided', function() {

    // we do not have endPoit specified
    expect(MESSAGE_SERVICE_ENDPOINT).toBe('');
    
    // create spy on localeStoragle method
    spyOn(localStorageService, 'get');

    // get messages
    msgFactory.getMessages();

    // expect msgFactory to call localStorageService for getting data
    expect(localStorageService.get).toHaveBeenCalled();
  });

});

describe('Testing msgFactory', function () { 
  var msgFactory,
      MESSAGE_SERVICE_ENDPOINT,
      localStorageService,
      msgService;

  beforeEach(function () {
    module('myApp');
    module(function($provide) {
      $provide.constant('MESSAGE_SERVICE_ENDPOINT', 'http://backend.com');
      $provide.value('msgService', {
        get: function() {
          return true;
        }
      });

    });

    inject(function (_msgFactory_, _MESSAGE_SERVICE_ENDPOINT_, _localStorageService_, _msgService_) {
      msgFactory = _msgFactory_;
      MESSAGE_SERVICE_ENDPOINT = _MESSAGE_SERVICE_ENDPOINT_;
      localStorageService = _localStorageService_;
      msgService = _msgService_;
    });

  });


  it('should choose server endPoint when server URL provided', function() {

    

    MESSAGE_SERVICE_ENDPOINT = 'test';
    // we have endPoit specified
    expect(MESSAGE_SERVICE_ENDPOINT.length).toBeGreaterThan(0);
    
    // create spy on localeStoragle method
    spyOn(msgService, 'get');

    // get messages from server
    msgFactory.getMessages();

    // expect msgFactory to call msgService for getting data
    expect(msgService.get).toHaveBeenCalled();
  });

})