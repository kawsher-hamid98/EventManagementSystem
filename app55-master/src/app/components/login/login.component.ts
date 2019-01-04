import { Component, OnInit } from '@angular/core';
import { AuthLoginInfo } from '../../auth-login-info';
import { AuthserviceService } from '../../services/authservice.service';
import { TokenStorageServiceService } from 'src/app/services/token-storage-service.service';
import { User } from 'src/app/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  user: User = new User();
  error: '';
  loading = false
  roles: string[] = [];
  constructor(private authService: AuthserviceService, private tokenStorage: TokenStorageServiceService, private router: Router) {

  }
 
  ngOnInit() {
  }

  login() {
    this.loading = true
    this.authService.loginUser(this.user)
    .subscribe(
      res => {
        this.tokenStorage.saveToken(res.accessToken)
        this.tokenStorage.saveUsername(res.username)
        this.tokenStorage.saveAuthorities(res.authorities);
        this.roles = this.tokenStorage.getAuthorities();

        //landing page
        if(this.roles[0] == 'ADMIN'){
        this.router.navigate(['/list']);

        } else if(this.roles[0] == 'USER') {
         // window.location.reload();
          this.router.navigate(['/specialEvent']);
        }
      },
      error => {
        this.error = error
      }
    ) 
}
}
