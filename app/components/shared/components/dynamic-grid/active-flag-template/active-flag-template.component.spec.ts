import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveFlagTemplateComponent } from './active-flag-template.component';

describe('ActiveFlagTemplateComponent', () => {
  let component: ActiveFlagTemplateComponent;
  let fixture: ComponentFixture<ActiveFlagTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveFlagTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveFlagTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
