import {Component, OnInit} from '@angular/core';
import {map, Observable, startWith} from "rxjs";
import {FormControl} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";


interface User {
  name: string;
  surname: string;
  id: number;
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
    id: -1,
    completed: false,
    subusers: [],
  };
  filteredUsers: Observable<User[]>|any;
  allComplete: boolean = false;
  employees = new FormControl('');

  constructor(private http: HttpClient) {}
  ngOnInit() {
      this.http.get<any>(`${environment.link}/api/userdraw/users`)
        .subscribe(Users=>{
          Users = Users.filter((user: any) => user.registeredForDraw);
          console.log(Users);
          for (let response of Users) {
            this.user.subusers?.push({name: response.name, surname: response.surname, id: response.id, completed: false});
          }
          this.filteredUsers = this.employees.valueChanges.pipe(
            startWith(''),
            map(value => this.filter(value || '')),
          );
        });
  }

  startDraw() {
    const deletionList = this.user.subusers?.filter(el => el.completed !== true);
    console.log(deletionList);
    this.http.patch(`${environment.link}/api/userdraw/resignfromdrawlist`, deletionList)
      .subscribe(() => {
          this.http.patch(`${environment.link}/api/draw`, {})
            .subscribe(
              () => {
                console.log("wylosowano");
              }
            )
      })
  }

  private filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.user.subusers?.filter((option: { name: string; surname: string; }) => (option.name.toLowerCase() + " " + option.surname.toLowerCase()).includes(filterValue));
  }
  updateAllComplete() {
    this.allComplete = this.user.subusers != null && this.user.subusers.every((t: { completed: any; }) => t.completed);
  }

  someComplete(): boolean {
    if (this.user.subusers == null) {
      return false;
    }
    return this.user.subusers.filter((t: { completed: any; }) => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {

    this.allComplete = completed;
    if (this.user.subusers == null) {
      return;
    }
    this.user.subusers.forEach((t: { completed: boolean; }) => (t.completed = completed));
  }

}
