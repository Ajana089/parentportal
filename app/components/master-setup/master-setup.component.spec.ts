import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterSetupComponent } from './master-setup.component';

describe('MasterSetupComponent', () => {
  let component: MasterSetupComponent;
  let fixture: ComponentFixture<MasterSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterSetupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
