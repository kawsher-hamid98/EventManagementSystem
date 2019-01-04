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
  page = 4;
 

  constructor(private eventService: GeneralEventServiceService,
     private token: TokenStorageServiceService, private router: Router, private pageService:PageServiceService ) {
      // var urlParams = [];
      // window.location.search.replace("?", "").split("&").forEach(function (e, i) {
      //     var p = e.split("=");
      //     urlParams[p[0]] = p[1];
      // });
  
      // console.log(urlParams["loaded"]);
  
      // if(urlParams["loaded"]) {}else{
  
      //     let win = (window as any);
      //     win.location.search = '?loaded=1';
      // }
      }

  ngOnInit() {

    this.eventService.getAllGeneralEvents()
    .subscribe( data => {
      this.generalEvent = data;
      this.setPage(1)
    });

    }

  setPage(page: number) {

    this.pager = this.pageService.getPager(this.generalEvent.length, page);
    this.pagedItems = this.generalEvent.slice(this.pager.startIndex, this.pager.endIndex + 1);
}

  delete(event) {
    this.eventService.deleteEvent(event.id)
    .subscribe( data => {
      this.generalEvent.splice(this.generalEvent.indexOf(event), 1);
    },error => {
      console.log(error);
    })
  }

  // edit(event) {
  //   this.eventService.updateEvent(event)
  //   .subscribe(data => {
  //     this.router.navigate(['/createSpecialEvent'])
  //   })
  // }

  // saveEvent() {
  //   this.router.navigate(['/createSpecialEvent'])
  // }
}