import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {RoleService} from "../role.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();

  constructor(private router: Router, public roleService: RoleService) { }

  ngOnInit(): void {
  }

  hasRoute(route: string) {
    return this.router.url.includes(route);
  }
}
