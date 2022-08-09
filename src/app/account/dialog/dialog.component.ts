import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LogoutService} from "../../Auth/services/logout.service";
import {AccountService} from "../services/account.service";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(private router: Router, private logoutService: LogoutService,
              private accountService: AccountService) {
  }

  ngOnInit(): void {
  }

  deleteAccount() {
    this.accountService.deleteAccount().subscribe(() => {
      this.logoutService.logout();

      this.router.navigate(['/login'])
    });
  }
}
