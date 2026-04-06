import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherAdditionalChargesComponent } from './other-additional-charges.component';

describe('OtherAdditionalChargesComponent', () => {
  let component: OtherAdditionalChargesComponent;
  let fixture: ComponentFixture<OtherAdditionalChargesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtherAdditionalChargesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherAdditionalChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
