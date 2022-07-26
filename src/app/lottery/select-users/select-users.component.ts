import { Component } from '@angular/core';
import {ThemePalette} from "@angular/material/core";


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
export class SelectUsersComponent  {
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

  allComplete: boolean = false;

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
