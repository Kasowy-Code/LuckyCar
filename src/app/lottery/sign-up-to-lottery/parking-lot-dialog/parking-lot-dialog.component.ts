import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {ParkingLot} from "../../../shared/dto/parking-lot";
import {ParkingLotsListService} from "../../../shared/services/parking-lots-list.service";

@Component({
  selector: 'app-parking-lot-dialog',
  templateUrl: './parking-lot-dialog.component.html',
  styleUrls: ['./parking-lot-dialog.component.scss']
})
export class ParkingLotDialogComponent implements OnInit {
  parkingLots: ParkingLot[] = [];
  chosenParkingLot: ParkingLot = <ParkingLot>{};
  choiceChanged = false;

  constructor(private parkingLotDialogRef: MatDialogRef<ParkingLotDialogComponent>,
              private parkingLotsListService: ParkingLotsListService) {
  }

  ngOnInit(): void {
    this.setParkingLotsList();
  }

  private setParkingLotsList() {
    this.parkingLotsListService.getParkingLotsList().subscribe((response: any) => {

      this.parkingLots = response.filter((value: any) => value.isAvailable);
    });
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
