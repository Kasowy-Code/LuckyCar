import {Component, OnInit} from '@angular/core';
import {ParkingLotsListService} from "./services/parking-lots-list/parking-lots-list.service";
import {LotteryPermissionService} from "./services/lottery-permission/lottery-permission.service";
import {MatDialog} from "@angular/material/dialog";
import {ParkingLotDialogComponent} from "./parking-lot-dialog/parking-lot-dialog/parking-lot-dialog.component";

@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  styleUrls: ['./lottery.component.css'],
})
export class LotteryComponent implements OnInit {
  lottery = false;
  user = true;
  choosingParkingLotFormIsShowed = false;
  parkingLots: string[] = [];
  choosedParkingLot: string = '';

  constructor(private parkingLotsService: ParkingLotsListService,
              private permissionService: LotteryPermissionService,
              private parkingLotDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.parkingLotsService.getParkingLots().subscribe(response => {
      this.parkingLots = response;
    });

    this.permissionService.getUserIsSignedUpToLottery().subscribe(response => {
      this.user = response;
    });

    this.permissionService.getLotteryIsOpen().subscribe(response => {
      this.lottery = response;
    });
  }

  onSubmit() {
    console.log("submited");
  }

  sendSuccessMessage() {
    this.user = true;
  }

  loadChosingParkingLotForm() {
    //this.choosingParkingLotFormIsShowed = true;

    let dialogRef = this.parkingLotDialog.open(ParkingLotDialogComponent,
      {
        data: this.parkingLots,
        disableClose: true,
      });

    dialogRef.afterClosed().subscribe(response => {
        console.log("dialog response: " + response);
      }
    );
  }

  logChoosingParkingLot(parkingLot: string) {
    this.choosedParkingLot = parkingLot;

    console.log(this.choosedParkingLot);
  }
}
