import {Component, OnInit} from '@angular/core';
import {ParkingLotDialogComponent} from "../parking-lot-dialog/parking-lot-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ParkingLot} from "../../../global-dto/parking-lot";
import {ParkingLotsListService} from "../../services/parking-lots-list/parking-lots-list.service";
import {UserActionService} from "../../services/user-action/user-action.service";
import {UserDraw} from "../../../global-dto/user-draw";
import {LotteryPermissionService} from "../../services/lottery-permission/lottery-permission.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DrawSettings} from "../../../global-dto/draw-settings";
import {forkJoin} from "rxjs";

enum LotteryStateEnum {
  ACTIVE, INACTIVE, REGISTERED
}

@Component({
  selector: 'app-sign-up-to-lottery-button',
  templateUrl: './sign-up-to-lottery-button.component.html',
  styleUrls: ['./sign-up-to-lottery-button.component.scss']
})
export class SignUpToLotteryButtonComponent implements OnInit {
  parkingLots: ParkingLot[] = [];
  userDraw = <UserDraw>{};
  lotterySetting = <DrawSettings>{};
  lotteryState = LotteryStateEnum.INACTIVE;
  LotteryStateEnum = LotteryStateEnum;


  constructor(private lotteryPermissionService: LotteryPermissionService,
              private snackBar: MatSnackBar,
              private parkingLotDialog: MatDialog,
              private parkingLotsListService: ParkingLotsListService,
              private userActionService: UserActionService) {
  }

  ngOnInit(): void {
    this.parkingLotsListService.getParkingLots().subscribe(response => {
      this.parkingLots = response.filter(value => value.available);
    });

    this.setupUserPermissionForLottery();
  }

  private setupUserPermissionForLottery() {

    forkJoin([
      this.lotteryPermissionService.getUserIsSignedUpToLottery(),
      this.lotteryPermissionService.getLotteryIsOpen()
    ])
      .subscribe(([isUserSignedUp, isLotteryOpen]) => {
        this.userDraw = isUserSignedUp;
        this.lotterySetting = isLotteryOpen;

        console.log("registered:" + this.userDraw.registeredForDraw);

        this.lotteryState = this.getLotteryState();
      });
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

          this.userActionService.registerUserForDraw(this.userDraw).subscribe(() => {

            this.lotteryState = this.getLotteryState();
          });
          console.log(response);
        }
      }
    );
  }

  getLotteryState() {
    let message = LotteryStateEnum.ACTIVE;

    if (!this.lotterySetting.active) {
      message = LotteryStateEnum.INACTIVE;
    } else if (this.userDraw.registeredForDraw) {
      message = LotteryStateEnum.REGISTERED;
    }

    return message;
  }

  resignFromSingingUpToLottery() {
    this.userActionService.cancelSigningUpToLottery(this.userDraw).subscribe(response => {
      if (!response) {
        console.log("resign from singing up to lottery error")
      }
    })
  }
}
