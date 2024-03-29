import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-are-you-sure-dialog',
  templateUrl: './are-you-sure-dialog.component.html',
  styleUrls: ['./are-you-sure-dialog.component.css']
})
export class AreYouSureDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private accountService: AccountService,
              private router: Router,) {
  }

  ngOnInit(): void {
  }

  setOrDel(action: string, id: any) {
    if (action === "ADMIN") {
      this.setAdmin(id)
    }
    if (action === "DELETE") {
      this.delete(id);
    }
    if (action === "REMOVE") {
      this.removeAdmin(id);
    }
  }

  setAdmin(id: any) {
    this.accountService.setAdmin(id).subscribe(() => {
    });
  }

  delete(id: any) {
    this.accountService.deleteAccountById(id).subscribe(() => {
      
    });
  }

  removeAdmin(id: any) {
    this.accountService.removeAdmin(id).subscribe(() => {
    });
  }
}
