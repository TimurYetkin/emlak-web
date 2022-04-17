import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsletmeNewFormComponent } from './isletme-new-form.component';

describe('IsletmeNewFormComponent', () => {
  let component: IsletmeNewFormComponent;
  let fixture: ComponentFixture<IsletmeNewFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsletmeNewFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IsletmeNewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
