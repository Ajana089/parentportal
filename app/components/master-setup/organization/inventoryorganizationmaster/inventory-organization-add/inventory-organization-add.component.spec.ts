import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryOrganizationAddComponent } from './inventory-organization-add.component';

describe('InventoryOrganizationAddComponent', () => {
  let component: InventoryOrganizationAddComponent;
  let fixture: ComponentFixture<InventoryOrganizationAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InventoryOrganizationAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryOrganizationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
