import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantItemDaySalesComponent } from './tenant-item-day-sales.component';

describe('TenantItemDaySalesComponent', () => {
  let component: TenantItemDaySalesComponent;
  let fixture: ComponentFixture<TenantItemDaySalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantItemDaySalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantItemDaySalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
