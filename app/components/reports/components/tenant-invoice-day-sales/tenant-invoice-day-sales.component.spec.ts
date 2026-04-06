import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantInvoiceDaySalesComponent } from './tenant-invoice-day-sales.component';

describe('TenantInvoiceDaySalesComponent', () => {
  let component: TenantInvoiceDaySalesComponent;
  let fixture: ComponentFixture<TenantInvoiceDaySalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantInvoiceDaySalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantInvoiceDaySalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
