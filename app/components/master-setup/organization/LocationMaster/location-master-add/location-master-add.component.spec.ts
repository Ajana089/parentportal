import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationMasterAddComponent } from './location-master-add.component';

describe('LocationMasterAddComponent', () => {
  let component: LocationMasterAddComponent;
  let fixture: ComponentFixture<LocationMasterAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocationMasterAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationMasterAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
