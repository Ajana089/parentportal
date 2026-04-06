import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessUnitAddComponent } from './business-unit-add.component';

describe('BusinessUnitAddComponent', () => {
  let component: BusinessUnitAddComponent;
  let fixture: ComponentFixture<BusinessUnitAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessUnitAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessUnitAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
