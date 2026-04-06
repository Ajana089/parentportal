import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSaleWiseComponent } from './item-sale-wise.component';

describe('ItemSaleWiseComponent', () => {
  let component: ItemSaleWiseComponent;
  let fixture: ComponentFixture<ItemSaleWiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemSaleWiseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemSaleWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
