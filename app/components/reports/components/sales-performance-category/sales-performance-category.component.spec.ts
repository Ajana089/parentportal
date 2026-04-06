import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesPerformanceCategoryComponent } from './sales-performance-category.component';

describe('SalesPerformanceCategoryComponent', () => {
  let component: SalesPerformanceCategoryComponent;
  let fixture: ComponentFixture<SalesPerformanceCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesPerformanceCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesPerformanceCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
