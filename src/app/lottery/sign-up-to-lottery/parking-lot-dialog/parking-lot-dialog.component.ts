import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ParkingLot} from "../../../shared/dto/parking-lot";

@Component({
  selector: 'app-parking-lot-dialog',
  templateUrl: './parking-lot-dialog.component.html',
  styleUrls: ['./parking-lot-dialog.component.scss']
})
export class ParkingLotDialogComponent implements OnInit {
  parkingLots: ParkingLot[] = [];
  chosenParkingLot: ParkingLot = <ParkingLot>{};
  choiceChanged = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ParkingLot[],
              private parkingLotDialogRef: MatDialogRef<ParkingLotDialogComponent>) {
  }

  ngOnInit(): void {
    this.parkingLots = this.data;
  }

  onCancelClick() {
    this.parkingLotDialogRef.close();
  }

  setChosenParkingLot(value: ParkingLot) {
    this.chosenParkingLot = value;
    this.choiceChanged = true;
  }

  onSubmit() {
    this.parkingLotDialogRef.close(this.chosenParkingLot);

  }
}