import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { AuthserviceService } from '../../services/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {
  user: User = new User();
  error: '';

  constructor(private authService: AuthserviceService, private router: Router) { }
 
  ngOnInit() {}
  
  register() {
    this.authService.admin(this.user)
    .subscribe(
      res => {
        this.router.navigate(['/list'])
      },
      error => {
        this.error = error
      }
    )      
}
}
