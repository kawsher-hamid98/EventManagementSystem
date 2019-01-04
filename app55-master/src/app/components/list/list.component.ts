import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { User } from '../../user';
import { TokenStorageServiceService } from '../../services/token-storage-service.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
//import {FilterPipePipe} from '../../filter-pipe.pipe';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  displayedColumns = ['id', 'name', 'username', 'email', '#'];
  dataSource = new MatTableDataSource<User>();
  selection = new SelectionModel<User>(true, []);
  confirmationService: any;
  user: User[] = []
  data = Object.assign( this.user);
  flashMsg: any;


  constructor(private auth: AuthserviceService){

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
    this.auth.getCustomersList().subscribe(
      data => {
        this.dataSource.data = data;
        //this.length = data.result.length;
      }
    );
  }

  confirmDelete(item) {
 
        this.auth.deleteCustomer(item.id).subscribe(res => {
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
