import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherAdditionalChargesAddComponent } from './other-additional-charges-add.component';

describe('OtherAdditionalChargesAddComponent', () => {
  let component: OtherAdditionalChargesAddComponent;
  let fixture: ComponentFixture<OtherAdditionalChargesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtherAdditionalChargesAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherAdditionalChargesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
