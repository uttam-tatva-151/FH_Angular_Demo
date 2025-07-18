import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbHome } from './sb-home';

describe('SbHome', () => {
  let component: SbHome;
  let fixture: ComponentFixture<SbHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SbHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SbHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
