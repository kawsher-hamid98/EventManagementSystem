import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthserviceService } from './authservice.service';
import { TokenStorageServiceService } from './token-storage-service.service';
const TOKEN_HEADER_KEY = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorServiceService implements HttpInterceptor{

  constructor(private token: TokenStorageServiceService) { }
 
  intercept(req: HttpRequest<any>, next: HttpHandler) {
      let authReq = req;
      const token = this.token.getToken();
      if (token != null) {
          authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
      }
      return next.handle(authReq);
  }
}


