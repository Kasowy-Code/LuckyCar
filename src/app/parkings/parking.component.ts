import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ParkingDialogComponent} from "./dialog/parking-dialog.component";
import {ParkingLotsListService} from "../shared/services/parking-lots-list.service";
import {FormControl, Validators} from "@angular/forms";
import {ParkingLot} from "../shared/dto/parking-lot";


@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css']
})

export class ParkingComponent implements OnInit {
  disabled = false;
  parkingLotsList: ParkingLot[] = [];
  inputValue = new FormControl('');
  numberInputValue = new FormControl('1');
  parkingLot = <ParkingLot>{};

  constructor(public dialog: MatDialog,
              private parkingService: ParkingLotsListService) {
  }

  ngOnInit(): void {
    this.getParkingLotsList();
  }


  openDialog(id: any) {
    let dialogRef = this.dialog.open(ParkingDialogComponent, {
      data: {
        id: id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'delete') {
        this.deleteParkingLot(id);
      }
    });
  }

  addParkingLot() {
    // @ts-ignore
    if (this.inputValue.value != null && this.numberInputValue.value > 0 && this.inputValue.value != '') {
      this.parkingLot.name = this.inputValue.value;
      this.parkingLot.parkingPlaceCount = Number(this.numberInputValue.value);


    this.parkingLot.isAvailable = false;
    console.log(this.parkingLot)
      this.parkingService.addParkingLot(this.parkingLot).subscribe((data) => {
        this.getParkingLotsList();
        this.inputValue.reset();
        this.numberInputValue.reset();
        this.numberInputValue = new FormControl('1');
      })
    }
  }

  getParkingLotsList() {
    this.parkingService.getParkingLotsList().subscribe(response => {
      this.parkingLotsList = response;
      console.log(response);
    })
  }

  deleteParkingLot(id: any) {
    console.log(id);
    this.parkingService.deleteParkingLot(id).subscribe((response) => {
      this.getParkingLotsList();
    })
  }

  changeStatus(parking: ParkingLot) {
    console.log(parking);
    parking.isAvailable = !parking.isAvailable;
    this.parkingService.changeStatus(parking.id, parking).subscribe(response => {
      console.log(parking);
    })
  }

  addParkingPlaceToParkingLot(id: any) {
    this.parkingService.addParkingPlaceToParkingLot(id, this.parkingLot).subscribe(response => {
      console.log(response);
    })
  }

  subtractParkingPlaceToParkingLot(id: any) {
    this.parkingService.subtractParkingPlaceToParkingLot(id, this.parkingLot).subscribe(response => {
      console.log(response);
    })
  }

  incrementParkingPlaceCount() {
    if (this.numberInputValue.value != null) {
      this.numberInputValue.setValue((parseInt(this.numberInputValue.value) + 1).toString());
    }
  }

  decrementParkingPlaceCount() {
    // @ts-ignore
    if (this.numberInputValue.value > 1) {
      // @ts-ignore
      this.numberInputValue.setValue((parseInt(this.numberInputValue.value) - 1).toString());
    }
  }

  changeNumberOfParkingLots(parking: ParkingLot) {
    console.log(parking.parkingPlaceCount);
    // @ts-ignore
    if (parseInt(document.getElementById(parking.id).value) > 0) {
      // @ts-ignore
      parking.parkingPlaceCount = parseInt(document.getElementById(parking.id).value);
      this.parkingService.changeStatus(parking.id, parking).subscribe(response => {
        console.log(parking);
      })
    } else {
      this.getParkingLotsList();
    }
  }

}




















