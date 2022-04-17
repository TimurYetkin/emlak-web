import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsletmeFormComponent } from './isletme-form.component';

describe('IsletmeFormComponent', () => {
  let component: IsletmeFormComponent;
  let fixture: ComponentFixture<IsletmeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsletmeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IsletmeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
