import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedOrdersComponent } from './requested-orders.component';

describe('RequestedOrdersComponent', () => {
  let component: RequestedOrdersComponent;
  let fixture: ComponentFixture<RequestedOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestedOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
