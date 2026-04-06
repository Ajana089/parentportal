import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantInvoicesComponent } from './tenant-invoices.component';

describe('TenantInvoicesComponent', () => {
  let component: TenantInvoicesComponent;
  let fixture: ComponentFixture<TenantInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantInvoicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
