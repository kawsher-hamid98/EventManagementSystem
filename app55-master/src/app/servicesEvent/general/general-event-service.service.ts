import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/user';

@Injectable({
  providedIn: 'root'
})

export class GeneralEventServiceService {

  private generalEventUrl = 'http://localhost:8080/generalEvent';
  private ticketUrl = 'http://localhost:8080';
  private ticketAndMailUrl = "http://localhost:8080/generalEvent/send-mail"
  confirm: any;

  constructor(private http: HttpClient) { }

  sendTicketViaEmail(username: string, eventId: string): Observable<any> {
    return this.http.get(`${this.ticketAndMailUrl}/${username}/${eventId}`, {responseType: 'text'});
  }

  getAllGeneralEvents(): Observable<any> {
    return this.http.get(`${this.generalEventUrl}`)
  }

  deleteEvent(id: string): Observable<any> {
    return this.http.delete(`${this.generalEventUrl}/${id}`, {responseType: 'text'});
  }

  createEvent(generalEvent: Object): Observable<Object> {
    return this.http.post(`${this.generalEventUrl}`, generalEvent);
  }

  updateEvent(generalEvent: Object): Observable<Object> {
    return this.http.put(`${this.generalEventUrl}`, generalEvent);
  }

  getGeneralEventById(id: string): Observable<any> {
    const url = `${this.generalEventUrl}/${id}`;
    return this.http.get<any>(url);
  }

  getEventTicket(username: string, id: string): Observable<any>{
    return this.http.get<any>(`${this.ticketUrl}/send-mail/${username}/${id}`);
  }

  getAllTickets(): Observable<any> {
    return this.http.get(`${this.ticketUrl}`)
  }

  getTicketById(id: string): Observable<any> {
    const url = `${this.ticketUrl}/${id}`;
    return this.http.get<any>(url);
  }

  saveTicket(ticket: Object): Observable<Object> {
   return this.http.post(`${this.ticketUrl}`, ticket);
 }
}
