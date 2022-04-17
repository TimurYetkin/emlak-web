import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusteriListComponent } from './musteri-list.component';

describe('MusteriListComponent', () => {
  let component: MusteriListComponent;
  let fixture: ComponentFixture<MusteriListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusteriListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusteriListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
