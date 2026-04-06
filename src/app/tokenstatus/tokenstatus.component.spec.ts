import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenstatusComponent } from './tokenstatus.component';

describe('TokenstatusComponent', () => {
  let component: TokenstatusComponent;
  let fixture: ComponentFixture<TokenstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokenstatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokenstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
