import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantDaySalesComponent } from './tenant-day-sales.component';

describe('TenantDaySalesComponent', () => {
  let component: TenantDaySalesComponent;
  let fixture: ComponentFixture<TenantDaySalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantDaySalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantDaySalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
