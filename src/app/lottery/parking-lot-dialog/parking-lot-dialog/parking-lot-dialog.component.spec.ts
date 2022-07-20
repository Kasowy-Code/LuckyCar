import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingLotDialogComponent } from './parking-lot-dialog.component';

describe('ParkingLotDialogComponent', () => {
  let component: ParkingLotDialogComponent;
  let fixture: ComponentFixture<ParkingLotDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParkingLotDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParkingLotDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
