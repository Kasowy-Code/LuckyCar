import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  styleUrls: ['./lottery.component.scss'],
})
export class LotteryComponent implements OnInit, OnDestroy {

  constructor() {
  }

  ngOnInit(): void {


  }

  ngOnDestroy() {

  }


  onSubmit() {
    console.log("submited");
  }

}
