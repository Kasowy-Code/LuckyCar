import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {AreYouSureDialogComponent} from "./are-you-sure-dialog/are-you-sure-dialog.component";

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private dialog:MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(message:string, id:any, action:string){
    this.dialog.open(AreYouSureDialogComponent, {
      width: '250px',
      data :{
        'message':message,
        'id': id,
        'action': action
      }
    });
  }

  giveAdmin(id:any){
    //TODO: TEN USER MA ADMINROLE TO WYKASUJ PRZYCISK
    this.openDialog("Do you want to give an admin to this user?", id, "ADMIN");
  }

  deleteAccount(id:any){
    this.openDialog("Do you want to delete this user's account?", id, "DELETE");
  }
}
