import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsletmeEditFormComponent } from './isletme-edit-form.component';

describe('IsletmeEditFormComponent', () => {
  let component: IsletmeEditFormComponent;
  let fixture: ComponentFixture<IsletmeEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsletmeEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IsletmeEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
