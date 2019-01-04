import { Component, OnInit } from '@angular/core';
import { SignUpInfo } from '../../sign-up-info';
import { AuthserviceService } from '../../services/authservice.service';
import { Router } from '@angular/router';
import { User } from '../../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = new User();

  constructor(private authService: AuthserviceService, private router: Router) { }
 
  ngOnInit() {}
  
  register() {
    this.authService.registerUser(this.user)
    .subscribe(
      res => {
        this.router.navigate(['/login'])
      },
      err => console.log(err)
    )      
}
}
