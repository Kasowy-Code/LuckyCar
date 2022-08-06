import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Component, Inject, OnInit} from '@angular/core';
import {ParkingComponent} from "../parking.component";



@Component({
  selector: 'app-dialog',
  templateUrl: './parking-dialog.component.html',
  styles: []
})
export class ParkingDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private parkingDialogRef: MatDialogRef<ParkingComponent>) {}

  ngOnInit(): void {
  }

  delete(){
    this.parkingDialogRef.close({event: 'delete'});
  }

}

