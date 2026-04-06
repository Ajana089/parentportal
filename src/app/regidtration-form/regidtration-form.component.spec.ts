import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegidtrationFormComponent } from './regidtration-form.component';

describe('RegidtrationFormComponent', () => {
  let component: RegidtrationFormComponent;
  let fixture: ComponentFixture<RegidtrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegidtrationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegidtrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
