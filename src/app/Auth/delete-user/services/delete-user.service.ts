import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {catchError} from "rxjs";
import {DeleteUserErrorHandler} from "../../../errorhandler/DeleteUserErrorHandler";

@Injectable({
  providedIn: 'root'
})
export class DeleteUserService {

  constructor(private http:HttpClient, private errorHandler:DeleteUserErrorHandler) { }

  deleteUser(id:any) {
    return this.http.delete(`${environment.link}/api/register/delete/`+id, {})
      .pipe(catchError(error => {
        this.errorHandler.handleError(error);
        return error;
      }));
  }
}
