import { Component, OnInit } from '@angular/core';
import { SpecialEventServiceService } from 'src/app/servicesEvent/Special/special-event-service.service';
import { TokenStorageServiceService } from 'src/app/services/token-storage-service.service';
import { Router } from '@angular/router';
import { PageServiceService } from 'src/app/servicesEvent/page-service.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-special-event',
  templateUrl: './special-event.component.html',
  styleUrls: ['./special-event.component.css']
})
export class SpecialEventComponent implements OnInit {
  SpecialEvent: any;
  pager: any = {};
  pagedItems: any[];
  page = 4;
 

  constructor(private eventService: SpecialEventServiceService,
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

    this.eventService.getAllSpecialEvents()
    .subscribe( data => {
      this.SpecialEvent = data;
      this.setPage(1)
    });

    }

  setPage(page: number) {

    this.pager = this.pageService.getPager(this.SpecialEvent.length, page);
    this.pagedItems = this.SpecialEvent.slice(this.pager.startIndex, this.pager.endIndex + 1);
}

  delete(event) {
    this.eventService.deleteEvent(event.id)
    .subscribe( data => {
      this.SpecialEvent.splice(this.SpecialEvent.indexOf(event), 1);
    },error => {
      console.log(error);
    })
  }

  edit(event) {
    this.eventService.updateEvent(event)
    .subscribe(data => {
      this.router.navigate(['/createSpecialEvent'])
    })
  }

  saveEvent() {
    this.router.navigate(['/createSpecialEvent'])
  }
}