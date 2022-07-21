import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ParkingLot} from "../../services/parking-lots-list/parking-lot";

@Component({
  selector: 'app-parking-lot-dialog',
  templateUrl: './parking-lot-dialog.component.html',
  styleUrls: ['./parking-lot-dialog.component.css']
})
export class ParkingLotDialogComponent implements OnInit {
  parkingLots: ParkingLot[] = [];
  choosedParkingLot: ParkingLot = <ParkingLot>{};

  constructor(@Inject(MAT_DIALOG_DATA) public data: ParkingLot[],
              private parkingLotDialogRef: MatDialogRef<ParkingLotDialogComponent>) {
  }

  ngOnInit(): void {
    this.parkingLots = this.data;
  }

  onCancelClick() {
    this.parkingLotDialogRef.close();
  }

  setChoosedParkingLot(value: ParkingLot) {
    this.choosedParkingLot = value;
  }

  onSubmit() {
    this.parkingLotDialogRef.close(this.choosedParkingLot);
  }
}
