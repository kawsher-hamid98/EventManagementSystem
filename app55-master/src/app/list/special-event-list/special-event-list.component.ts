import { Component, OnInit, ViewChild } from '@angular/core';
import { SpecialEventServiceService } from 'src/app/servicesEvent/Special/special-event-service.service';
import { TokenStorageServiceService } from 'src/app/services/token-storage-service.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SpecialEvent } from 'src/app/special-event';

@Component({
  selector: 'app-special-event-list',
  templateUrl: './special-event-list.component.html',
  styleUrls: ['./special-event-list.component.css']
})
export class SpecialEventListComponent implements OnInit {

 
  displayedColumns = ['id', 'eventName', 'location','category','#'];
  dataSource = new MatTableDataSource<SpecialEvent>();
  flashMsg: any;
  specialEvent: SpecialEvent[] = []
  data = Object.assign( this.specialEvent);

  constructor(private eventService: SpecialEventServiceService){

  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  rowClicked(row: any): void {
    console.log(row);
  }

  ngOnInit() {
    this.eventService.getAllSpecialEvents().subscribe(
      data => {
        this.dataSource.data = data;
        //this.length = data.result.length;
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
