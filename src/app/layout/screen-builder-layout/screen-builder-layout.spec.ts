import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenBuilderLayout } from './screen-builder-layout';

describe('ScreenBuilderLayout', () => {
  let component: ScreenBuilderLayout;
  let fixture: ComponentFixture<ScreenBuilderLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenBuilderLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreenBuilderLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
