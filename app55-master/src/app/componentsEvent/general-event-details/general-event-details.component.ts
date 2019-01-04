import { Component, OnInit, ElementRef ,ViewChild} from '@angular/core';  
import { GeneralEventServiceService } from 'src/app/servicesEvent/general/general-event-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageServiceService } from '../../services/token-storage-service.service';
import { GeneralEvent } from '../../general-event';

@Component({
  selector: 'app-general-event-details',
  templateUrl: './general-event-details.component.html',
  styleUrls: ['./general-event-details.component.css']
})
export class GeneralEventDetailsComponent implements OnInit {

  event: GeneralEvent;
  userName: string;
  successMsg: '';
  errorMsg: '';

  constructor(private eventService: GeneralEventServiceService, 
              private activatedRoute: ActivatedRoute,
              private tokenStorageService: TokenStorageServiceService,
              private router: Router
              ) {
                  this.userName = this.tokenStorageService.getUsername()
                }
  
  ngOnInit() {
    this.getEvent()        
  }

  sendTicket() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.eventService.sendTicketViaEmail(this.userName, id)
        .subscribe(
          response => {
            this.successMsg = response
            console.log("Success", response)
          }, error => {
            this.errorMsg = error
            console.log("Failed", error)
          }
        )
  }

  getEvent() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.eventService.getGeneralEventById(id).subscribe(
      event => {this.event = event, console.log(event)}
    )
  }
}
