import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsletmeListComponent } from './isletme-list.component';

describe('IsletmeListComponent', () => {
  let component: IsletmeListComponent;
  let fixture: ComponentFixture<IsletmeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IsletmeListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IsletmeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
