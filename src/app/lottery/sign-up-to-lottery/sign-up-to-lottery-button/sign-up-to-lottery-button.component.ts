import {Component, OnInit} from '@angular/core';
import {ParkingLotDialogComponent} from "../parking-lot-dialog/parking-lot-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ParkingLotsListService} from "../../../shared/services/parking-lots-list.service";
import {UserSignUpActionHttpService} from "../../services/user-sign-up-action-http.service";
import {UserDraw} from "../../../shared/dto/user-draw";
import {LotterySettingsInfoHttpService} from "../../../shared/services/lottery-settings-info-http.service";
import {LotterySettings} from "../../../shared/dto/lottery-settings";
import {forkJoin} from "rxjs";
import {
  ResigningFromLotteryDialogComponent
} from "../resigning-from-lottery-dialog/resigning-from-lottery-dialog.component";
import {UserDrawInfoHttpService} from "../../../shared/services/user-draw-info-http.service";
import {LotteryStateEnum} from "../../lottery-state-enum";
import {LotteryStateEnumService} from "../../services/lottery-state-enum.service";

@Component({
  selector: 'app-sign-up-to-lottery-button',
  templateUrl: './sign-up-to-lottery-button.component.html',
  styleUrls: ['./sign-up-to-lottery-button.component.scss']
})
export class SignUpToLotteryButtonComponent implements OnInit {
  userDraw = <UserDraw>{};
  lotterySettings = <LotterySettings>{};
  LotteryStateEnum = LotteryStateEnum;
  chosenParkingLotName = '';

  constructor(private lotteryPermissionService: LotterySettingsInfoHttpService,
              private parkingLotDialog: MatDialog,
              private confirmResigningFromLotteryDialog: MatDialog,
              private parkingLotsListService: ParkingLotsListService,
              private userActionHttpService: UserSignUpActionHttpService,
              private userDrawInfoHttpService: UserDrawInfoHttpService,
              public lotteryStateEnumService: LotteryStateEnumService) {
  }

  ngOnInit(): void {

    this.setupUserPermissionForLottery();

    this.setChosenParkingLot();
  }

  private setChosenParkingLot() {

    this.userDrawInfoHttpService.getCurrentUserDrawInfo().subscribe(response => {
      if (response.declaredParking !== null) {
        this.userDrawInfoHttpService.getCurrentUserChosenParkingLot(response.declaredParking).subscribe(response => {

          this.chosenParkingLotName = response.name;
        })
      }
    })
  }

  setupUserPermissionForLottery() {

    forkJoin([
      this.userDrawInfoHttpService.getCurrentUserDrawInfo(),
      this.lotteryPermissionService.getLotterySettings()
    ])
      .subscribe(([userDrawInfo, isLotteryOpen]) => {
        this.userDraw = userDrawInfo;
        this.lotterySettings.isActive = isLotteryOpen.isActive;

        console.log(isLotteryOpen.isActive);

        this.lotteryStateEnumService.lotteryState = this.getLotteryState();
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

  getLotteryState(): LotteryStateEnum {
    let result = LotteryStateEnum.ACTIVE;

    if (this.lotterySettings.isActive) {
      result = LotteryStateEnum.INACTIVE;
    } else if (this.userDraw.registeredForDraw) {
      result = LotteryStateEnum.REGISTERED;
    }

    return result;
  }
}
