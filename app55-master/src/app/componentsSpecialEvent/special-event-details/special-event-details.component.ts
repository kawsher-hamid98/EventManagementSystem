import { Component, OnInit } from '@angular/core';
import { SpecialEventServiceService } from 'src/app/servicesEvent/Special/special-event-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageServiceService } from 'src/app/services/token-storage-service.service';
import { SpecialEvent } from '../../special-event'
import { AuthserviceService } from '../../services/authservice.service';

@Component({
  selector: 'app-special-event-details',
  templateUrl: './special-event-details.component.html',
  styleUrls: ['./special-event-details.component.css']
})
export class SpecialEventDetailsComponent implements OnInit {
  specialEvents: SpecialEvent;
  userName: string;
  message: string;
  error: '';
  msg: string = null;
  msg1: string = null
  count = 0;  
  ok:any
  selected: any;
  
  constructor(private specialEventService: SpecialEventServiceService, private authService: AuthserviceService, private eventService: SpecialEventServiceService, 
              private activatedRoute: ActivatedRoute,
              private tokenStorageService: TokenStorageServiceService,
              private router: Router,
              private token: TokenStorageServiceService
              ) {
                  this.userName = this.tokenStorageService.getUsername()
                }


  ngOnInit() {
    this.getSpecialEvent()        
  }

  getSelectedCategories() {
      const selectedSubEvents = this.specialEvents.subEvents;
      this.selected = selectedSubEvents.filter(s => s.selected);
      console.log(this.selected);
      const id = this.activatedRoute.snapshot.paramMap.get('id');      
      this.authService.checkConflict(this.userName, id, this.selected)
        .subscribe(
            res => {
              this.router.navigate(['/payment/' + id])
              console.log('Success', res)
            }, err => {
              this.error = err
              
            }            
        )
  }  

  getSpecialEvent() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.eventService.getSpecialEventsById(id).subscribe(
      event => {
        this.specialEvents = event
         console.log(event)
      },error => {
        console.log(error)
      }
    )
  }

  getTicket() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.eventService.getEventTicket(this.userName, id).subscribe()
    this.msg = 'Ticket has been sent to your mail'
  }
}
