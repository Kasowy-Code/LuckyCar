import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DeleteUserService {

  constructor(private http:HttpClient) { }

  deleteUser(id:any) {
    return this.http.delete(`${environment.link}/api/register/delete/`+id, {});
  }
}
