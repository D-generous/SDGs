import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  constructor(public http:HttpClient) { }
  public baseUrl = environment.apiUrl


  public signUpUser(obj:any){
    return this.http.post<any>(`${this.baseUrl}signup.php`, obj)
  }
  public signInUser(obj:any){
    return this.http.post<any>(`${this.baseUrl}signin.php`, obj)
  }
  public userDashboard(obj:any){
    return this.http.post<any>(`${this.baseUrl}dashboard.php`, obj)
  }

  public getUserDashboard(){
    return this.http.get<any>(`${this.baseUrl}dashboard.php`)
  }
  public getDetails(obj:any){
    return this.http.post<any>(`${this.baseUrl}user.php`, obj)
  }
  public landingPage(){
    return this.http.get<any>(`${this.baseUrl}landingpage.php`)
  }
}
