import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantDailySalesComponent } from './tenant-daily-sales.component';

describe('TenantDailySalesComponent', () => {
  let component: TenantDailySalesComponent;
  let fixture: ComponentFixture<TenantDailySalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantDailySalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantDailySalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
