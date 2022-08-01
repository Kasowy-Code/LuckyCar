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
import {UserDrawInfoHttpService} from "../../../shared/services/parking-lot/user-draw-info-http.service";

enum LotteryStateEnum {
  ACTIVE, INACTIVE, REGISTERED, NOTLOADED
}

@Component({
  selector: 'app-sign-up-to-lottery-button',
  templateUrl: './sign-up-to-lottery-button.component.html',
  styleUrls: ['./sign-up-to-lottery-button.component.scss']
})
export class SignUpToLotteryButtonComponent implements OnInit {
  userDraw = <UserDraw>{};
  lotterySettings = <DrawSettings>{};
  lotteryState = LotteryStateEnum.NOTLOADED;
  LotteryStateEnum = LotteryStateEnum;
  chosenParkingLotName = '';

  constructor(private lotteryPermissionService: LotteryPermissionService,
              private snackBar: MatSnackBar,
              private parkingLotDialog: MatDialog,
              private confirmResigningFromLotteryDialog: MatDialog,
              private parkingLotsListService: ParkingLotsListService,
              private userActionHttpService: UserActionHttpService,
              private userDrawInfoHttpService: UserDrawInfoHttpService) {
  }

  ngOnInit(): void {

    this.setupUserPermissionForLottery();

    this.setChosenParkingLot();
  }

  private setChosenParkingLot() {

    this.userDrawInfoHttpService.getCurrentUserDrawInfo().subscribe(response => {
      if(response.declaredParking !== null) {
        this.userDrawInfoHttpService.getCurrentUserChosenParkingLot(response.declaredParking).subscribe(response => {

          this.chosenParkingLotName = response.name;
        })
      }
    })
  }

  private setupUserPermissionForLottery() {

    forkJoin([
      this.userDrawInfoHttpService.getCurrentUserDrawInfo(),
      this.lotteryPermissionService.getLotteryIsOpen()
    ])
      .subscribe(([userDrawInfo, isLotteryOpen]) => {
        this.userDraw = userDrawInfo;
        this.lotterySettings.active = isLotteryOpen.active;

        console.log(isLotteryOpen.active);

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
      this.setupUserPermissionForLottery();
    })
  }

  loadChosingParkingLotForm() {

    let dialogRef = this.parkingLotDialog.open(ParkingLotDialogComponent,
      {
        disableClose: true,
      });

    dialogRef.afterClosed().subscribe(chosenParkingLot => {

        if (chosenParkingLot !== undefined) {

          this.userActionHttpService.registerUserForDraw(chosenParkingLot).subscribe(() => {

            this.setupUserPermissionForLottery();
            this.setChosenParkingLot();
          });
        }
      }
    );
  }

  getLotteryState() {
    let message = LotteryStateEnum.ACTIVE;

    if (!this.lotterySettings.active) {
      message = LotteryStateEnum.INACTIVE;
    } else if (this.userDraw.registeredForDraw) {
      message = LotteryStateEnum.REGISTERED;
    }

    return message;
  }

}
