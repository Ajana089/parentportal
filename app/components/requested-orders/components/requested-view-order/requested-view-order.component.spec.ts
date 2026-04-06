import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedViewOrderComponent } from './requested-view-order.component';

describe('RequestedViewOrderComponent', () => {
  let component: RequestedViewOrderComponent;
  let fixture: ComponentFixture<RequestedViewOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestedViewOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestedViewOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
