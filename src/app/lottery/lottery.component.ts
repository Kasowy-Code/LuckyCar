import {Component, OnInit} from '@angular/core';
import {ParkingLotsListService} from "./services/parking-lots-list/parking-lots-list.service";
import {LotteryPermissionService} from "./services/lottery-permission/lottery-permission.service";
import {MatDialog} from "@angular/material/dialog";
import {ParkingLotDialogComponent} from "./parking-lot-dialog/parking-lot-dialog/parking-lot-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  styleUrls: ['./lottery.component.css'],
})
export class LotteryComponent implements OnInit {
  userIsSignedUpToLotteryMessage: string = 'You are signed up to lottery!!';
  lotteryIsClosedMessage: string = 'Lottery is closed!!';
  lottery = false;
  user = true;
  parkingLots: string[] = [];

  constructor(private parkingLotsService: ParkingLotsListService,
              private permissionService: LotteryPermissionService,
              private parkingLotDialog: MatDialog,
              private _snackBar: MatSnackBar,
              private router: Router) {
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

    this.messageForUser();
  }


  private messageForUser() {
    if (!this.lottery) {
      this._snackBar.open(this.lotteryIsClosedMessage, "", {
        verticalPosition: "top",
      });
    }
    if (this.user) {
      this._snackBar.open(this.userIsSignedUpToLotteryMessage, '', {
        verticalPosition: "top",
      });
    }

    this.router.events.subscribe((val) => {
      this._snackBar.dismiss();
    });
  }

  onSubmit() {
    console.log("submited");
  }

  loadChosingParkingLotForm() {

    if (!this.user && this.lottery) {
      let dialogRef = this.parkingLotDialog.open(ParkingLotDialogComponent,
        {
          data: this.parkingLots,
          disableClose: true,
        });

      dialogRef.afterClosed().subscribe(response => {
          console.log("dialog response: " + response);

          this.user = true;

          this.messageForUser();
        }
      );
    }
  }
}
