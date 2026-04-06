import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTemplateComponent } from './date-template.component';

describe('DateTemplateComponent', () => {
  let component: DateTemplateComponent;
  let fixture: ComponentFixture<DateTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
