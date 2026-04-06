import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsConditionsAddComponent } from './terms-conditions-add.component';

describe('TermsConditionsAddComponent', () => {
  let component: TermsConditionsAddComponent;
  let fixture: ComponentFixture<TermsConditionsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TermsConditionsAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermsConditionsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
