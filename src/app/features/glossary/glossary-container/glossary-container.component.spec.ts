import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlossaryContainerComponent } from './glossary-container.component';
import {AuthService} from '../../../auth/auth.service';

describe('GlossaryContainerComponent', () => {
  let component: GlossaryContainerComponent;
  let fixture: ComponentFixture<GlossaryContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlossaryContainerComponent ],
        providers: [
            {provide: AuthService, useClass: MockAuthService}
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlossaryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

class MockAuthService {
    isAuthenticated(){
        return true;
    }

    login(){
        return true;
    }
}