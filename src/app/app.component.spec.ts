import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from './auth/auth.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {StoreMockService} from './test-helper';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
        imports: [
            RouterTestingModule
        ],
        providers: [
            {provide: AuthService, useClass: MockAuthService},
            {provide: Store, useClass: StoreMockService}
        ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));



});

class MockAuthService {
    isAuthenticated(){
        return true;
    }

    login(){
        return true;
    }
}

