import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-resigning-from-lottery-dialog',
  templateUrl: './resigning-from-lottery-dialog.component.html',
  styleUrls: ['./resigning-from-lottery-dialog.component.scss']
})
export class ResigningFromLotteryDialogComponent implements OnInit {
  private resignFromLottery = false;

  constructor(private parkingLotDialogRef: MatDialogRef<ResigningFromLotteryDialogComponent>) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.resignFromLottery = true;
    this.parkingLotDialogRef.close(this.resignFromLottery);
  }

  onCancel() {
    this.parkingLotDialogRef.close(this.resignFromLottery);
  }
}
