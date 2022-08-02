import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-change-regular-lottery-date-form',
  templateUrl: './change-regular-lottery-date-form.component.html',
  styleUrls: ['./change-regular-lottery-date-form.component.scss']
})
export class ChangeRegularLotteryDateFormComponent implements OnInit {
  public dateForm = new FormGroup({
    week: new FormControl(''),
    day: new FormControl(''),
  });

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
  }

  changeValue() {
  }

  onSubmit() {
    console.log('submitted values: ' + this.dateForm.value.week + ' ' + this.dateForm.value.day);
  }
}
