import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDaySalesComponent } from './invoice-day-sales.component';

describe('InvoiceDaySalesComponent', () => {
  let component: InvoiceDaySalesComponent;
  let fixture: ComponentFixture<InvoiceDaySalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceDaySalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceDaySalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
