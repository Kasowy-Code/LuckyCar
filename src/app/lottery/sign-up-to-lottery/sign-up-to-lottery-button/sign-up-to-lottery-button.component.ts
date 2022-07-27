import {Component, OnInit} from '@angular/core';
import {ParkingLotDialogComponent} from "../parking-lot-dialog/parking-lot-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ParkingLot} from "../../../shared/dto/parking-lot";
import {ParkingLotsListService} from "../../../shared/services/parking-lot/parking-lots-list.service";
import {UserActionHttpService} from "../../services/user-action/user-action-http.service";
import {UserDraw} from "../../../shared/dto/user-draw";
import {LotteryPermissionService} from "../../services/lottery-permission/lottery-permission.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DrawSettings} from "../../../shared/dto/draw-settings";
import {forkJoin} from "rxjs";
import {
  ResigningFromLotteryDialogComponent
} from "../resigning-from-lottery-dialog/resigning-from-lottery-dialog.component";

enum LotteryStateEnum {
  ACTIVE, INACTIVE, REGISTERED, NOTLOADED
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
  lotteryState = LotteryStateEnum.NOTLOADED;
  LotteryStateEnum = LotteryStateEnum;
  chosenParkingLotName = '';

  constructor(private lotteryPermissionService: LotteryPermissionService,
              private snackBar: MatSnackBar,
              private parkingLotDialog: MatDialog,
              private confirmResigningFromLotteryDialog: MatDialog,
              private parkingLotsListService: ParkingLotsListService,
              private userActionHttpService: UserActionHttpService) {
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

        console.log("user is signed up to lottery: " + this.userDraw.registeredForDraw);

        this.lotteryState = this.getLotteryState();
      });
  }

  openResigningFromLotteryDialog() {
    let dialogRef = this.parkingLotDialog.open(ResigningFromLotteryDialogComponent,
      {});

    dialogRef.afterClosed().subscribe(response => {
      if (response === true) {
        this.resignFromSingingUpToLottery();
      }
    });
  }

  resignFromSingingUpToLottery() {
    this.userActionHttpService.cancelSigningUpToLottery().subscribe(response => {
      if (!response) {
        console.log("youre not signed up to lottery")
      } else {
        console.log("youre signed up to lottery :c")
      }
      this.setupUserPermissionForLottery();
    })
  }

  loadChosingParkingLotForm() {

    let dialogRef = this.parkingLotDialog.open(ParkingLotDialogComponent,
      {
        data: this.parkingLots,
        disableClose: true,
      });

    dialogRef.afterClosed().subscribe(response => {

        if (response !== undefined) {

          this.userActionHttpService.registerUserForDraw(response).subscribe(() => {

            this.setupUserPermissionForLottery();
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

}
