import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercomponentComponent } from './usercomponent.component';

describe('UsercomponentComponent', () => {
  let component: UsercomponentComponent;
  let fixture: ComponentFixture<UsercomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsercomponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsercomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
