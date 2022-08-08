import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ParkingDialogComponent} from "./dialog/parking-dialog.component";
import {ParkingLotsListService} from "../shared/services/parking-lots-list.service";
import {FormControl, Validators} from "@angular/forms";
import {ParkingLot} from "../shared/dto/parking-lot";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AddParkingSnackBarComponent} from "../add-parking-snack-bar/add-parking-snack-bar.component";


@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css']
})

export class ParkingComponent implements OnInit {
  text: string = "";
  parkingLotsList: ParkingLot[] = [];
  inputValue = new FormControl('');
  numberInputValue = new FormControl('1');
  parkingLot = <ParkingLot>{};
  durationInSeconds = 2;


  constructor(public dialog: MatDialog,
              private parkingService: ParkingLotsListService,
              private snackBar: MatSnackBar) {
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
    if (this.inputValue.value != null && this.numberInputValue.value > 0 && this.inputValue.value != "\u0020" && this.inputValue.value != '') {
      this.parkingLot.name = this.inputValue.value;
      this.parkingLot.parkingPlaceCount = Number(this.numberInputValue.value);


    this.parkingLot.isAvailable = false;
    console.log(this.parkingLot)
      this.parkingService.addParkingLot(this.parkingLot).subscribe((data) => {
        this.getParkingLotsList();
        this.openSnackBar();
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

  changeIsAvailableState(parking: ParkingLot){
    if(parking.isAvailable == true){
      return this.text = "Disable parking lot";
    }
    else {
      return this.text = "Enable parking lot"
    }
  }

  openSnackBar(){
    this.snackBar.openFromComponent(AddParkingSnackBarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

}




















