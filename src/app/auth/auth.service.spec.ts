/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {AuthService} from "./auth.service";
import {RouterTestingModule} from "@angular/router/testing";
// import * as sinon from 'sinon';
// import 'jasmine-sinon';
import * as jwt from 'angular2-jwt';
import {UserDataService} from "../user.data.service";
import {User} from "../../../../../shared/user.model";
import {MockBackend} from "@angular/http/testing";
import {BaseRequestOptions, Http, XHRBackend, HttpModule} from "@angular/http";
import {AuthTestHelper} from "./auth.test.helper";
import {Router} from "@angular/router";
import addCustomEqualityTester = jasmine.addCustomEqualityTester;
import {Observable} from "rxjs";

let Auth0Lock = require('auth0-lock').default;

describe('AuthService', () => {

  let promiseValue = Observable.of(new User('234', 'authId', 'email@email.com'));
  let userDataService = {
    loginUser: jasmine.createSpy('loginUser').and.returnValue(promiseValue)
  }


  let testHelper                       = new AuthTestHelper();
  let service: AuthService             = null;
  let router                           = {
    navigate: jasmine.createSpy('navigate')
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
                                     providers: [
                                       AuthService,
                                       {provide: Router, useValue: router},
                                       {provide: UserDataService, useValue: userDataService},
                                       MockBackend,
                                       BaseRequestOptions,
                                       {
                                         provide   : Http,
                                         deps      : [MockBackend, BaseRequestOptions],
                                         useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                                           return new Http(backend, defaultOptions);
                                         }
                                       }
                                     ],

                                     imports: [HttpModule]
                                   })
  }));

  beforeEach(inject([AuthService, UserDataService, Router], (auth: AuthService, data: UserDataService, routerTesting: Router) => {
    service         = auth;
  }));

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  describe('init', () => {

    it('should set the user profile from local storage if there', () => {

      // arrange
      let profile       = testHelper.getTestProfile();
      let profileString = JSON.stringify(profile);
      localStorage.setItem("profile", profileString);
      // spyOn(service.lock, 'tokenNotExpired').and.returnValue(true);

      // spyOn(service.lock, 'show').and.returnValue(true);
      spyOn(service, 'authenticated').and.returnValue(true);
      spyOn(service, 'loadUserData').and.returnValue('123');

      // act
      service.init();

      // assert
      expect(service.userProfile).toBeDefined();
      expect(service.userProfile).toEqual(profile);

      // reset
      localStorage.removeItem("profile");
    });

    it ('should show the lock when logging in', () => {
      spyOn(service.lock, 'show');

      service.login();

      expect(service.lock.show).toHaveBeenCalled();
    });

    it('should check to see if the user is authenticated', () => {
      // arrange
      spyOn(service, 'authenticated');

      // act
      service.init();

      // assert
      expect(service.authenticated).toHaveBeenCalled();

    });

    it('when user is authenticated and user profile is valid, should load user data', () => {
      // arrange
      let profile       = testHelper.getTestProfile();
      let profileString = JSON.stringify(profile);
      localStorage.setItem("profile", profileString);

      spyOn(service, 'authenticated').and.returnValue(true);
      spyOn(service, 'loadUserData');

      // act
      service.init();

      // assert
      expect(service.loadUserData).toHaveBeenCalled();
    });

    it('when user is not authenticated and profile is valid, should not load user data', () => {
      // arrange
      let profile       = testHelper.getTestProfile();
      let profileString = JSON.stringify(profile);
      localStorage.setItem("profile", profileString);

      spyOn(service, 'authenticated').and.returnValue(false);
      spyOn(service, 'loadUserData');

      // act
      service.init();

      // assert
      expect(service.loadUserData).not.toHaveBeenCalled();
    });

    it('when user is authenticated and profile is not valid, should not load user data', () => {
      // arrange
      service.userProfile = undefined;
      spyOn(service, 'authenticated').and.returnValue(false);
      spyOn(service, 'loadUserData');

      // act
      service.init();

      // assert
      expect(service.loadUserData).not.toHaveBeenCalled();
    });

    it('should set the callback for the locks authentication method', () => {
      // arrange
      spyOn(service.lock, 'on');

      // act
      service.init();

      // assert
      expect(service.lock.on).toHaveBeenCalled();

    });

  });

  describe('Handling of authentication', () => {

    it('should load user data', () => {
      // arrange
      let authResult = {"idToken": testHelper.getTestToken()};
      spyOn(service, 'loadUserData');
      spyOn(service.lock, 'getProfile').and.returnValue(true);

      // act
      service.handleAuthentication(authResult);

      // assert
      expect(service.loadUserData).toHaveBeenCalled();

    });

    xit('should route the user to the artist page if userId is valid', () => {
      service.userProfile = testHelper.getTestProfile();
      // promiseValue = Observable.of(new User('234', 'authId', 'email@email.com')).toPromise();
      spyOn(localStorage, 'setItem');

      service.loadUserData();

      expect(service.userId).toEqual('234');
      expect(localStorage.setItem).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith('/artist');
    })

  });

  describe('Processing the auth0 profile', () => {

    it('should show an alert with an error if there is an error', () => {
      // arrange
      let profile       = null;
      let error: string = 'Error Occurred';
      spyOn(window, 'alert');

      // act
      service.processProfile(error, profile);

      // assert
      expect(window.alert).toHaveBeenCalledWith(error);
    });

    it('should save the profile data if there is no error', () => {
      // arrange
      let profile       = testHelper.getTestProfile();
      let error: string = null;
      spyOn(window, 'alert');
      spyOn(service, 'saveProfileData').and.returnValue(null);

      // act
      service.processProfile(error, profile);

      // assert
      expect(window.alert).not.toHaveBeenCalled();
      expect(service.saveProfileData).toHaveBeenCalled();
    });

  });

  describe('Saving the auth0 profile', () => {

    it('when profile is valid, should save the profile', () => {
      // arrange
      let profile       = testHelper.getTestProfile();
      let profileString = JSON.stringify(profile);
      localStorage.removeItem('profile');

      spyOn(localStorage, 'setItem');

      // act
      service.saveProfileData(profileString);

      // assert

      expect(localStorage.setItem).toHaveBeenCalled();
      // expect(localStorage.getItem('profile')).toEqual(profileString);
    });

    it('when profile is null, should not save the profile', () => {
      // arrange
      let profile: JSON = null;

      localStorage.removeItem('profile');
      spyOn(JSON, 'stringify');
      spyOn(localStorage, 'setItem');

      // act
      service.saveProfileData(profile);

      // assert
      expect(JSON.stringify).not.toHaveBeenCalled();
      expect(localStorage.setItem).not.toHaveBeenCalled();
    });

    it('when profile is undefined, should not save the profile', () => {
      // arrange
      let profile = undefined;

      localStorage.removeItem('profile');
      spyOn(JSON, 'stringify');
      spyOn(localStorage, 'setItem');

      // act
      service.saveProfileData(profile);

      // assert
      expect(JSON.stringify).not.toHaveBeenCalled();
      expect(localStorage.setItem).not.toHaveBeenCalled();
    });

  });

  describe('logout', () => {

    it('should reset everything and navigate to start', () => {
      // arrange
      localStorage.setItem('access_token', JSON.stringify(testHelper.getTestToken()));
      localStorage.setItem('profile', JSON.stringify(testHelper.getTestProfile()));
      localStorage.setItem('userId', '123');

      spyOn(localStorage, 'removeItem');

      // act
      service.logout();

      // assert
      expect(localStorage.removeItem).toHaveBeenCalledTimes(3);
      expect(service.userProfile).not.toBeDefined();
      expect(router.navigate).toHaveBeenCalledWith(['/start']);

    });
  })
});
