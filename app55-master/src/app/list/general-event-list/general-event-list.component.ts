import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralEventServiceService } from 'src/app/servicesEvent/general/general-event-service.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { GeneralEvent } from 'src/app/general-event';

@Component({
  selector: 'app-general-event-list',
  templateUrl: './general-event-list.component.html',
  styleUrls: ['./general-event-list.component.css']
})
export class GeneralEventListComponent implements OnInit {

  displayedColumns = ['id', 'eventName', 'location','category','#'];
  dataSource = new MatTableDataSource<GeneralEvent>();
  flashMsg: any;
  generalEvent: GeneralEvent[] = []
  data = Object.assign( this.generalEvent);


  constructor(private eventService: GeneralEventServiceService){

  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.dataSource.filter = filterValue;
  }

  rowClicked(row: any): void {
    console.log(row);
  }

  ngOnInit() {
    this.eventService.getAllGeneralEvents().subscribe(
      data => {
        this.dataSource.data = data;
      }
    );
  }

  confirmDelete(item) {

        this.eventService.deleteEvent(item.id).subscribe(res => {
            const index = this.dataSource.data.indexOf(item);
            this.dataSource.data.splice(index, 1);
            this.dataSource.data = this.dataSource.data.filter(event => event.id != item.id)
            this.dataSource = new MatTableDataSource(this.dataSource.data);
          },
          err => {
            console.log(err)
          });
  }

}
