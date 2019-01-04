import { Component, OnInit, NgZone } from '@angular/core';
import { Headers, Http} from '@angular/http';
import { TokenStorageServiceService } from '../services/token-storage-service.service';
import { AuthserviceService } from '../services/authservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AmountFile } from '../amount-file';
import { SpecialEventServiceService } from '../servicesEvent/Special/special-event-service.service';
import { SpecialEvent } from '../special-event';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit{
  userName: string;
  ok:any;
  amount: number;
  payments: AmountFile;
  message: string = null
  specialEvent: any;

  constructor(private eventService:SpecialEventServiceService,private activatedRoute: ActivatedRoute, private authService: AuthserviceService, private tokenStorageService: TokenStorageServiceService, private ngZone: NgZone, private router: Router, private http: Http) {
    this.userName = this.tokenStorageService.getUsername()
  }

  ngOnInit() {
    // this.getAmount();
    this.getSpecialEvent();
  }

  expMonths = [{month: '01'},
                {month: '02'},
                {month: '03'},
                {month: '04'},
                {month: '05'},
                {month: '06'},
                {month: '07'},
                {month: '08'},
                {month: '09'},
                {month: '10'},
                {month: '11'},
                {month: '12'}]

  expYears = [{year: '19'},
              {year: '20'},
              {year: '21'},
              {year: '22'},
              {year: '23'},
              {year: '24'},
              {year: '25'},
              {year: '26'},
              {year: '27'},
              {year: '28'},
              {year: 29}]

  getSpecialEvent() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.eventService.getSpecialEventsById(id).subscribe(
      event => {
        this.specialEvent = event
         console.log(event)
      },error => {
        console.log(error)
      }
    )
  }



  // getAmount() {
  //   const id = this.activatedRoute.snapshot.paramMap.get('id');
  //   return this.authService.getAmount(this.userName, id)
  //     .subscribe(
  //       res => {
  //         this.payments = res          
  //       }, error => {
  //         console.log(error)
  //       }
  //     )

  // }
  

  chargeCreditCard() {
    let form = document.getElementsByTagName("form")[0];
    (<any>window).Stripe.card.createToken({
      number: form.cardNumber.value,
      exp_month: form.expMonth.value,
      exp_year: form.expYear.value,
      cvc: form.cvc.value
    }, (status: number, response: any) => {
      if (status === 200) {
        let token = response.id;
        this.chargeCard(token);
      } else {
        alert('Transaction failed! Try again') 
        console.log("Failed!", response.error.message);     
      }
    })
  }
  
  chargeCard(token: string) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    // this.amount = this.payments.totalAmount;      
    this.amount = this.specialEvent.price;
    const headers = new Headers({'token': token, 'amount': this.amount});
    this.http.post('http://localhost:8080/payment/charge', {}, 
    {headers: headers}).subscribe(
      resp => {
        console.log(resp),     
        console.log(id),
        console.log(this.userName),
        this.authService.sendMail(this.userName, id)
          .subscribe(
            response => {
              this.eventService.saveEventTicket(this.userName, id, this.ok).subscribe()
              this.router.navigate(['/confirmation'])
              console.log("Email Sent", response)
            }, error => {
              console.log("Sending Failed", error)
            }
          )
      }, error => {
        console.log(error)
      }
    )
  }

  

}
