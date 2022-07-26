import {Component, OnInit} from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {map, Observable, startWith} from "rxjs";
import {FormControl} from "@angular/forms";


export interface User {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subusers?: User[];
}

@Component({
  selector: 'app-select-users',
  templateUrl: './select-users.component.html',
  styleUrls: ['./select-users.component.css']
})
export class SelectUsersComponent implements OnInit{
  user: User = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subusers: [
      {name: 'Primary', completed: false, color: 'primary'},
      {name: 'Accent', completed: false, color: 'accent'},
      {name: 'Warn', completed: false, color: 'warn'},
    ],
  };
  filteredUsers: Observable<User[]>|any;
  allComplete: boolean = false;
  employees = new FormControl('');

  ngOnInit() {
    this.filteredUsers = this.employees.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value || '')),
    );
  }

  private filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.user.subusers?.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  updateAllComplete() {
    this.allComplete = this.user.subusers != null && this.user.subusers.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.user.subusers == null) {
      return false;
    }
    return this.user.subusers.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.user.subusers == null) {
      return;
    }
    this.user.subusers.forEach(t => (t.completed = completed));
  }

}
