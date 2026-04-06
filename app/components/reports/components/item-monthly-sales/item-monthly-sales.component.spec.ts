import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemMonthlySalesComponent } from './item-monthly-sales.component';

describe('ItemMonthlySalesComponent', () => {
  let component: ItemMonthlySalesComponent;
  let fixture: ComponentFixture<ItemMonthlySalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemMonthlySalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemMonthlySalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
