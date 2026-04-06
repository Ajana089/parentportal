import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleDateWiseComponent } from './sale-date-wise.component';

describe('SaleDateWiseComponent', () => {
  let component: SaleDateWiseComponent;
  let fixture: ComponentFixture<SaleDateWiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleDateWiseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleDateWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
