import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemNameTemplateComponent } from './menu-item-name-template.component';

describe('MenuItemNameTemplateComponent', () => {
  let component: MenuItemNameTemplateComponent;
  let fixture: ComponentFixture<MenuItemNameTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuItemNameTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemNameTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
