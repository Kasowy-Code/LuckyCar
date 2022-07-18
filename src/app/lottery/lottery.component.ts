import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  styleUrls: ['./lottery.component.css']
})
export class LotteryComponent implements OnInit {
  lottery: boolean;
  user: boolean;

  constructor() {
    this.lottery = true;
    this.user = false;
  }

  ngOnInit(): void {
  }

  SendSuccessMessage() {
    alert("Udało ci się zapisać na listę losowania");
    
  }
}
