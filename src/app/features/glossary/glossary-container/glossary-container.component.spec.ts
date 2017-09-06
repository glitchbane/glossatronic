import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlossaryContainerComponent } from './glossary-container.component';

describe('GlossaryContainerComponent', () => {
  let component: GlossaryContainerComponent;
  let fixture: ComponentFixture<GlossaryContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlossaryContainerComponent ]
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
