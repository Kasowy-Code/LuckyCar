import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class APIServiceService {

  constructor(private http: HttpClient) { }

  public Login(username: string | null | undefined, password: string | null | undefined) {
    const headers = new HttpHeaders({Authorization: 'Basic '+btoa(username+'+'+password)});
    return this.http.post(`${environment.link}/login`, {headers, responseType: 'text' as 'json'})
  }
}
