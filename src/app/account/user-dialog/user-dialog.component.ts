import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {AreYouSureDialogComponent} from "./are-you-sure-dialog/are-you-sure-dialog.component";
import {AccountService} from "../services/account.service";

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {
  give = true;
  giveOrRemove = 'Give admin role';

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
              private dialog:MatDialog,
              private accountService:AccountService) { }

  ngOnInit(): void {
    this.accountService.hasAdmin(this.data.id).subscribe(data =>{
      if(data === 'true'){
        this.give = false;
        this.giveOrRemove = 'Remove admin role';
      }else{
        this.give = true;
        this.giveOrRemove = 'Give admin role';
      }
    })
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
    if(this.give){
      this.openDialog("Do you want to give an admin to this user?", id, "ADMIN");
    }else{
      this.openDialog("Do you want to remove the admin role for this user?", id, "REMOVE");
    }
  }

  deleteAccount(id:any){
    this.openDialog("Do you want to delete this user's account?", id, "DELETE");
  }
}
