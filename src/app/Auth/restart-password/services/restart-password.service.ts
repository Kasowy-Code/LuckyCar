import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {catchError} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RestartPasswordService {

  constructor(private http:HttpClient) { }

  setNewPassword(id:any, password:string){
    const request = {
      "password": password
    };

    return this.http.patch(`${environment.link}/api/restartPassword/`+id, request, {responseType: 'text' as 'json'})
      .pipe(catchError(error => {
        return error;
      }));
  }
}
