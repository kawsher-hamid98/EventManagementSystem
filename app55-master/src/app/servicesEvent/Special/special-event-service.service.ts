import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialEventServiceService {
  private specialEventUrl = 'http://localhost:8080/specialEvent';
  private ticketUrl = 'http://localhost:8080/ticket/make-pdf';
  clientID: string = '1vCWHaC5f2uS3yhpwWbIA6';
  baseUrl: string = 'https://api.spotify.com/v1/search?type=artist&limit=10&client_id=' + this.clientID + '&q=';
  confirm: any;
  
  constructor(private http: HttpClient) { }

  getAllSpecialEvents(): Observable<any> {
    return this.http.get(`${this.specialEventUrl}` + "/getAll")
  }

  deleteEvent(id: string): Observable<any> {
    return this.http.delete(`${this.specialEventUrl}/${id}`, {responseType: 'text'});
  }

  createEvent(generalEvent: Object): Observable<Object> {
    return this.http.post(`${this.specialEventUrl}`, generalEvent , {responseType: 'text'});
  }

  updateEvent(generalEvent: Object): Observable<Object> {
    return this.http.put(`${this.specialEventUrl}`, generalEvent);
  }

  getSpecialEventsById(id: string): Observable<any> {
    const url = `${this.specialEventUrl}` + "/getById/" + `${id}`;
    return this.http.get<any>(url);
  }
  
  getEventTicket(username: string, id: string): Observable<any>{
    return this.http.get<any>(`${this.ticketUrl}/${username}/${id}`);
  }

  saveEventTicket(username: string, id: string, value:any): Observable<any>{
    return this.http.post<any>(`${this.specialEventUrl}/customerEvent/${username}/${id}`, value);
  }


  // saveUserEvent(username: string, id: string): Observable<any>{
  //   return this.http.get<any>(`${this.ticketUrl}/${username}/${id}`);
  // }
//{ "eventId": String('5bfea475ec88791f4cb54c7f') }

  getAllTickets(): Observable<any> {
    return this.http.get(`${this.ticketUrl}`)
  }

  getTicketById(id: string): Observable<any> {
    const url = `${this.ticketUrl}/${id}`;
    return this.http.get<any>(url);
  }

  search(queryString: string) {
    let _URL = this.baseUrl + queryString;
    return this.http.get(_URL);
}

//   saveTicket(ticket: Object): Observable<Object> {
//    return this.http.post(`${this.ticketUrl}`, ticket);
//  }

}
