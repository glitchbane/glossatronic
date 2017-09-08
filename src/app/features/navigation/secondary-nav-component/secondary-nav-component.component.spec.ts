import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryNavComponentComponent } from './secondary-nav-component.component';

describe('SecondaryNavComponentComponent', () => {
  let component: SecondaryNavComponentComponent;
  let fixture: ComponentFixture<SecondaryNavComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondaryNavComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryNavComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
