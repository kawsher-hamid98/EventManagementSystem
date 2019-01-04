import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtResponse } from '../jwt-response';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  private loginUrl = 'http://localhost:8080/api/auth/signin';
  private signupUrl = 'http://localhost:8080/api/auth/signup';
  private adminUrl = 'http://localhost:8080/api/auth/admin';
  private userUrl = 'http://localhost:8080/rest/admin';
  private restUrl = 'http://localhost:8080/rest';
  private _checkConflict = "http://localhost:8080/ticket/check-conflict";
  private _sendMail = "http://localhost:8080/ticket/send-mail";
  private _amount = "http://localhost:8080/ticket/amount";

  constructor(private http: HttpClient) {
  }

  getAmount(username: string, eventId: string): Observable<any>{
    return this.http.get(`${this._amount}/${username}/${eventId}`)
  }

  checkConflict(username: string, eventId: string, event) {
    return this.http.post(`${this._checkConflict}/${username}/${eventId}`, event, { responseType: 'text' })
  }

  sendMail(username: string, eventId: string) {
    return this.http.get(`${this._sendMail}/${username}/${eventId}`, { responseType: 'text' })
  }
 
  registerUser(user) {
    return this.http.post<any>(this.signupUrl, user, httpOptions)
  }

  admin(user) {
    return this.http.post<any>(this.adminUrl, user, httpOptions)
  }


  loginUser(user): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, user, httpOptions);
  }

   getCustomersList(): Observable<any> {
  return this.http.get(`${this.userUrl}`)
   }

   deleteCustomer(id: string): Observable<any> {
     return this.http.delete(`${this.restUrl}/${id}`, {responseType: 'text'});
   }

}
