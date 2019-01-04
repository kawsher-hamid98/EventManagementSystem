import { Component, OnInit, ElementRef ,ViewChild} from '@angular/core';  
import * as jsPDF from 'jspdf';   
import { ActivatedRoute } from '@angular/router';
import { GeneralEventServiceService } from '../../servicesEvent/general/general-event-service.service';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { User } from '../../user';
import { TokenStorageServiceService } from 'src/app/services/token-storage-service.service';
import { DOCUMENT } from '@angular/common'; 

@Component({
  selector: 'app-ticket-printing',
  templateUrl: './ticket-printing.component.html',
  styleUrls: ['./ticket-printing.component.css']
})
export class TicketPrintingComponent implements OnInit {

  @ViewChild('content') content: ElementRef
  @ViewChild('myDiv') myDiv: ElementRef;

  event:any;
  currentUser:string;
  users: any;
  id: string;
  inputText: string  = '';
  k: any

  constructor(private auth: AuthserviceService ,private token: TokenStorageServiceService, private eventService: GeneralEventServiceService,
     private activatedRoute: ActivatedRoute) { 
                this.currentUser = this.token.getUsername();
              }

  ngOnInit() {
    this.getEvent();
  }

  getEvent() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.eventService.getGeneralEventById(id).subscribe(
      event => {this.event = event, console.log(event)}
    )
}
   public generatePDF()  
{  
  let doc = new jsPDF();
  
  let specialElementHandlers = {
    '#editor': function(element, renderer) {
      return true;
    }
  };
  let content = this.content.nativeElement;
  doc.fromHTML(content.innerHTML, 15, 15, {
    'width': 190,
    'elementHandlers': specialElementHandlers
  });
  doc.save('test.pdf');
}  
 
}
