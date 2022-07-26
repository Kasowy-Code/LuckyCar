import {Component, OnInit} from '@angular/core';
import {map, Observable, startWith} from "rxjs";
import {FormControl} from "@angular/forms";


export interface User {
  name: string;
  surname: string;
  completed: boolean;
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
    surname: 'Field',
    completed: false,
    subusers: [
      {name: 'Adam', surname: 'Cegła', completed: false},
      {name: 'Tomasz', surname: 'Problem', completed: false},
      {name: 'Waldemar', surname: 'Kostka', completed: false},{name: 'Adam', surname: 'Cegła', completed: false},
      {name: 'Tomasz', surname: 'Problem', completed: false},
      {name: 'Waldemar', surname: 'Kostka', completed: false},{name: 'Adam', surname: 'Cegła', completed: false},
      {name: 'Tomasz', surname: 'Problem', completed: false},
      {name: 'Waldemar', surname: 'Kostka', completed: false},{name: 'Adam', surname: 'Cegła', completed: false},
      {name: 'Tomasz', surname: 'Problem', completed: false},
      {name: 'Waldemar', surname: 'Kostka', completed: false},{name: 'Adam', surname: 'Cegła', completed: false},
      {name: 'Tomasz', surname: 'Problem', completed: false},
      {name: 'Waldemar', surname: 'Kostka', completed: false},{name: 'Adam', surname: 'Cegła', completed: false},
      {name: 'Tomasz', surname: 'Problem', completed: false},
      {name: 'Waldemar', surname: 'Kostka', completed: false},{name: 'Adam', surname: 'Cegła', completed: false},
      {name: 'Tomasz', surname: 'Problem', completed: false},
      {name: 'Waldemar', surname: 'Kostka', completed: false},{name: 'Adam', surname: 'Cegła', completed: false},
      {name: 'Tomasz', surname: 'Problem', completed: false},
      {name: 'Waldemar', surname: 'Kostka', completed: false},{name: 'Adam', surname: 'Cegła', completed: false},
      {name: 'Tomasz', surname: 'Problem', completed: false},
      {name: 'Waldemar', surname: 'Kostka', completed: false},{name: 'Adam', surname: 'Cegła', completed: false},
      {name: 'Tomasz', surname: 'Problem', completed: false},
      {name: 'Waldemar', surname: 'Kostka', completed: false},{name: 'Adam', surname: 'Cegła', completed: false},
      {name: 'Tomasz', surname: 'Problem', completed: false},
      {name: 'Waldemar', surname: 'Kostka', completed: false},{name: 'Adam', surname: 'Cegła', completed: false},
      {name: 'Tomasz', surname: 'Problem', completed: false},
      {name: 'Waldemar', surname: 'Kostka', completed: false},
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
    return this.user.subusers?.filter(option => (option.name.toLowerCase() + " " + option.surname.toLowerCase()).includes(filterValue));
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
