import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantItemSalesComponent } from './tenant-item-sales.component';

describe('TenantItemSalesComponent', () => {
  let component: TenantItemSalesComponent;
  let fixture: ComponentFixture<TenantItemSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantItemSalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantItemSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
