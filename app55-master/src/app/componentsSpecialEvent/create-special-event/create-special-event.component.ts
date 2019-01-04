import { Component, OnInit } from '@angular/core';
import { SpecialEvent } from 'src/app/special-event';
import { SpecialEventServiceService } from 'src/app/servicesEvent/Special/special-event-service.service';
import { Router } from '@angular/router';
import { TokenStorageServiceService } from 'src/app/services/token-storage-service.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-create-special-event',
  templateUrl: './create-special-event.component.html',
  styleUrls: ['./create-special-event.component.css']
})
export class CreateSpecialEventComponent implements OnInit {

  specialEventForm: FormGroup;
  specialEvent: SpecialEvent = new SpecialEvent();
  private newAttribute: any = {};


  countries = [
    {name: "United States"},
    {name: "Bangladesh"},
    {name: "India"},
    {name: "Pakistan"},
    {name: "Australia"},
    {name: "Canada"},
    {name: "Brazil"},
    {name: "England"}
  ];

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

  constructor(private formBuilder: FormBuilder, private rest: SpecialEventServiceService, private token: TokenStorageServiceService,
              private router: Router ) { }

    ngOnInit() {
      this.specialEventForm = this.formBuilder.group({
        eventName: [''],
        eventAddress: [''],
        eventDescription: [''],
        url: [''],
        organizerName: [''],
        date: [''],
        category: [''],
        country: [''],          
        ticketVacancy: [''],
        price: [''],
        subEvents: this.formBuilder.array([this.formBuilder.group({name: '', startTime: '', endTime: '',vacancy: ''})])    
      })
    }
  
    addSubEvent() {
      this.subEvents.push(this.formBuilder.group({name: '', startTime: '', endTime: '', amount: '', vacancy: ''}))
    }
  
    get subEvents() {
      return this.specialEventForm.get('subEvents') as FormArray;
    }
  
    onSubmit() {
      console.log(this.specialEventForm.value);
      this.rest.createEvent(this.specialEventForm.value)
        .subscribe(
          response => {
            console.log("Success", response),
            this.router.navigate(['/specialEvent'])
          }, error => {
            console.log("Failed!", error)
          }
        )
    }
  
}
