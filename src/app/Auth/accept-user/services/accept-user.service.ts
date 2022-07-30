import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs";
import {AcceptUserErrorHandler} from "../../../errorhandler/AcceptUserErrorHandler";

@Injectable({
  providedIn: 'root'
})
export class AcceptUserService {

  constructor(private http:HttpClient, private errorHandler:AcceptUserErrorHandler) { }

  acceptUser(id:any) {
    return this.http.patch(`${environment.link}/api/register/accept/`+id, {})
      .pipe(catchError(error =>{
        this.errorHandler.handleError(error);
        return error;
      }));
  }
}
