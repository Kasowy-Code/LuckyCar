import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  styleUrls: ['./lottery.component.css']
})
export class LotteryComponent implements OnInit {
  lottery: boolean;
  user: boolean;
  choosingParkingLotFormIsShowed: boolean;

  constructor() {
    this.lottery = true;
    this.user = false;
    this.choosingParkingLotFormIsShowed = false;
  }

  ngOnInit(): void {
  }

  SendSuccessMessage() {
    alert("Udało ci się zapisać na listę losowania");

  }

  loadChosingParkingLotForm() {
    this.choosingParkingLotFormIsShowed = true;
  }
}
