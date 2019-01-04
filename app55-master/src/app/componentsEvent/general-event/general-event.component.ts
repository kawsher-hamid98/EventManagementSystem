import { Component, OnInit } from '@angular/core';
import { GeneralEventServiceService } from '../../servicesEvent/general/general-event-service.service';
import  { GeneralEvent } from '../../general-event';
import { TokenStorageServiceService } from 'src/app/services/token-storage-service.service';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import { FormControl } from '@angular/forms';
import { PageServiceService } from 'src/app/servicesEvent/page-service.service';


@Component({
  selector: 'app-general-event',
  templateUrl: './general-event.component.html',
  styleUrls: ['./general-event.component.css']
})
export class GeneralEventComponent implements OnInit {

  generalEvent: any;
  pager: any = {};
  pagedItems: any[];
  myControl = new FormControl();
  filteredOptions: Observable<any>;

  constructor(private event1: GeneralEventServiceService, private pageService:PageServiceService, private token: TokenStorageServiceService, private router: Router ) { }

  ngOnInit() {
    this.event1.getAllGeneralEvents()
    .subscribe( data => {
      this.generalEvent = data;
    });
  }

  setPage(page: number) {
    this.pager = this.pageService.getPager(this.generalEvent.length, page);
    this.pagedItems = this.generalEvent.slice(this.pager.startIndex, this.pager.endIndex + 1);
}


  delete(event) {
    this.event1.deleteEvent(event.id)
    .subscribe( data => {
      this.generalEvent.splice(this.generalEvent.indexOf(event), 1);
    },error => {
      console.log(error);
    })
  }

  edit(event) {
    this.event1.updateEvent(event)
    .subscribe(data => {
      this.router.navigate(['/createGeneralEvent'])
    })
  }

  saveEvent() {
    this.router.navigate(['/createGeneralEvent'])
  }

}
