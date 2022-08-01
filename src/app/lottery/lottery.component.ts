import { Component, OnInit } from '@angular/core';
import {LotteryDialogComponent} from "./lottery-dialog/lottery-dialog.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";

@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  styleUrls: ['./lottery.component.css'],
})
export class LotteryComponent implements OnInit {
  user: any;
  lottery: any;
  ngOnInit(): void {}

  constructor(private dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(LotteryDialogComponent);
  }

}
