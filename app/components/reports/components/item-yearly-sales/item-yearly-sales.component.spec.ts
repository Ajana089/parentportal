import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemYearlySalesComponent } from './item-yearly-sales.component';

describe('ItemYearlySalesComponent', () => {
  let component: ItemYearlySalesComponent;
  let fixture: ComponentFixture<ItemYearlySalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemYearlySalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemYearlySalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
