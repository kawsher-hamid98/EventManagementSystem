import { Component } from '@angular/core';
import { AuthserviceService } from './services/authservice.service';
import { TokenStorageServiceService } from './services/token-storage-service.service';
import { User } from './user';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const TOKEN_KEY = 'AuthToken';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app55';
  currentUser:string;

  
  constructor(private token: TokenStorageServiceService){
  //this.currentUser = JSON.parse(sessionStorage.getItem(TOKEN_KEY));
  this.currentUser = this.token.getUsername();
  }

}
