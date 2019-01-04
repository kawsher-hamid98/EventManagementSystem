import { Component, OnInit } from '@angular/core';
import { GeneralEventComponent } from '../general-event/general-event.component';
import { TokenStorageServiceService } from 'src/app/services/token-storage-service.service';
import { Router } from '@angular/router';
import { GeneralEventServiceService } from 'src/app/servicesEvent/general/general-event-service.service';
import  { GeneralEvent } from '../../general-event';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  events: GeneralEvent = new GeneralEvent();
  general: any;
  today: number = Date.now();

  constructor(private event: GeneralEventServiceService, private token: TokenStorageServiceService,
     private router: Router ) { }

  ngOnInit() {
  }

  saveEvent() {
    this.event.createEvent(this.events)
    .subscribe(data => {
      this.events = new GeneralEvent()
      this.router.navigate(['/generalEvent'])
    })
  }

  countries = [
    {name: 'Bangladesh'},
    {name: 'India'},
    {name: 'Nepal'},
    {name: 'Srilanka'},
    {name: 'Vhutan'},    
  ]

  categories = [
    {name: "Development"},
    {name: "Educational, Education"},
    {name: "Food"},
    {name: "IT, Technology, Artificial Intelligence, AI, Science"},
    {name: "Science"},
    {name: "Commerce"},
    {name: "Business"},
    {name: "Govnment"},
    {name: "Summit"},
    {name: "Conference"},
    {name: "Trade show"}
  ];

}
