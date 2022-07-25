import {Component, OnDestroy, OnInit} from '@angular/core';
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
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  styleUrls: ['./lottery.component.css'],
})
export class LotteryComponent implements OnInit, OnDestroy {
  userIsSignedUpToLotteryMessage = 'You are signed up to lottery!!';
  lotteryIsClosedMessage = 'Lottery is closed!!';
  lotterySetting = <DrawSettings>{};
  userDraw = <UserDraw>{};
  parkingLots: ParkingLot[] = [];
  subscription: Subscription = <Subscription>{};

  constructor(private parkingLotsListService: ParkingLotsListService,
              private lotteryPermissionService: LotteryPermissionService,
              private userActionService: UserActionService,
              private parkingLotDialog: MatDialog,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit(): void {
    this.setupUserPermissionForLottery()

    this.parkingLotsListService.getParkingLots().subscribe(response => {
      this.parkingLots = response.filter(value => value.available);
    });
  }

  ngOnDestroy() {
    this.snackBar.dismiss();
  }

  private setupUserPermissionForLottery() {

    this.lotteryPermissionService.getUserIsSignedUpToLottery().subscribe(response => {
      this.userDraw = response;

      console.log("registered:" + this.userDraw.registeredForDraw);

    });

    this.lotteryPermissionService.getLotteryIsOpen().subscribe(response => {
      this.lotterySetting = response;

      console.log("lottery: " + this.lotterySetting.active);

    });
    this.showUserIsSignedUpToLotteryMessage();
    this.sendLotteryIsClosedMessage();
  }

  private sendLotteryIsClosedMessage() {
    if (!this.lotterySetting.active) {
      this.snackBar.open(this.lotteryIsClosedMessage, "", {
        verticalPosition: "top",
      });
    }
  }

  private showUserIsSignedUpToLotteryMessage() {
    if (this.userDraw.registeredForDraw && this.lotterySetting.active) {
      this.snackBar.open(this.userIsSignedUpToLotteryMessage, '', {
        verticalPosition: "top",
      });
    }
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

          this.userActionService.setUserChosenParking(response, this.userDraw);
          this.userActionService.registerUserForDraw(this.userDraw);

          console.log(response);
        }

        this.showUserIsSignedUpToLotteryMessage();
        this.sendLotteryIsClosedMessage();
      }
    );

  }
}
