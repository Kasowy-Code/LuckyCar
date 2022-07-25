import {Component, OnInit} from '@angular/core';
import {ParkingLotsListService} from "./services/parking-lots-list/parking-lots-list.service";
import {LotteryPermissionService} from "./services/lottery-permission/lottery-permission.service";
import {MatDialog} from "@angular/material/dialog";
import {ParkingLotDialogComponent} from "./parking-lot-dialog/parking-lot-dialog/parking-lot-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {ParkingLot} from "../global-dto/parking-lot";
import {UserDraw} from "../global-dto/user-draw";
import {UserActionService} from "./services/user-action/user-action.service";
import {DrawSettings} from "../global-dto/draw-settings";

@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  styleUrls: ['./lottery.component.css'],
})
export class LotteryComponent implements OnInit {
  userIsSignedUpToLotteryMessage = 'You are signed up to lottery!!';
  lotteryIsClosedMessage = 'Lottery is closed!!';
  lotterySetting = <DrawSettings>{};
  userDraw = <UserDraw>{};
  parkingLots: ParkingLot[] = [];

  constructor(private parkingLotsService: ParkingLotsListService,
              private permissionService: LotteryPermissionService,
              private userService: UserActionService,
              private parkingLotDialog: MatDialog,
              private _snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit(): void {
    this.setupUserPermissionForLottery()

    this.parkingLotsService.getParkingLots().subscribe(response => {

      this.parkingLots = response.filter(value => value.available);
    });
  }

  private setupUserPermissionForLottery() {

    this.permissionService.getUserIsSignedUpToLottery().subscribe(response => {
      this.userDraw = response;

      console.log(this.userDraw.registeredForDraw);

      this.sendUserIsSignedUpToLotteryMessage();
    });

    this.permissionService.getLotteryIsOpen().subscribe(response => {
      this.lotterySetting = response;

      console.log(response.active);

      this.sendLotteryIsClosedMessage();
    });
  }

  private sendLotteryIsClosedMessage() {
    if (!this.lotterySetting.active) {
      this._snackBar.open(this.lotteryIsClosedMessage, "", {
        verticalPosition: "top",
      });
    }
    this.closeSnackBar();
  }

  private sendUserIsSignedUpToLotteryMessage() {
    if (this.userDraw.registeredForDraw && this.lotterySetting.active) {
      this._snackBar.open(this.userIsSignedUpToLotteryMessage, '', {
        verticalPosition: "top",
      });
    }
  }

  private closeSnackBar() {
    this.router.events.subscribe(() => {
      this._snackBar.dismiss();
    });
  }

  onSubmit() {
    console.log("submited");
  }

  loadChosingParkingLotForm() {


    let dialogRef = this.parkingLotDialog.open(ParkingLotDialogComponent,
      {
        data: this.parkingLots,
        disableClose: true,
      });

    dialogRef.afterClosed().subscribe(response => {

        if (response !== undefined) {

          this.userService.setUserChosenParking(response);
          this.userService.registerUserForDraw();

          console.log(response);
        }

        this.sendUserIsSignedUpToLotteryMessage();
        this.sendLotteryIsClosedMessage();
      }
    );

  }
}
