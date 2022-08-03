import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError, tap} from "rxjs";
import {AcceptUserErrorHandler} from "../../../errorhandler/AcceptUserErrorHandler";
import {AcceptUserComponent} from "../accept-user.component";

@Injectable({
  providedIn: 'root'
})
export class AcceptUserService {

  constructor(private http:HttpClient) { }

  acceptUser(id:any) {
    return this.http.patch(`${environment.link}/api/register/accept/`+id, {});
  }
}
