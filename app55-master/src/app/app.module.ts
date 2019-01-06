import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthserviceService } from './services/authservice.service';
import { TokenInterceptorServiceService } from './services/token-interceptor-service.service';
import { FormsModule }   from '@angular/forms';
import { TokenStorageServiceService } from './services/token-storage-service.service';
import { AuthGuard } from './auth.guard';
import { ListComponent } from './components/list/list.component';
import { AdminRegisterComponent } from './components/admin-register/admin-register.component';
import { GeneralEventComponent } from './componentsEvent/general-event/general-event.component';
import { TicketPrintingComponent } from './componentsEvent/ticket-printing/ticket-printing.component';
import { GeneralEventDetailsComponent } from './componentsEvent/general-event-details/general-event-details.component';
import { CreateEventComponent } from './componentsEvent/create-event/create-event.component';
import { CreateSpecialEventComponent } from './componentsSpecialEvent/create-special-event/create-special-event.component';
import { SpecialEventComponent } from './componentsSpecialEvent/special-event/special-event.component';
import { SpecialEventDetailsComponent } from './componentsSpecialEvent/special-event-details/special-event-details.component';
import { FilterpipePipe } from './filterpipe.pipe';
import { GeneralEventListComponent } from './list/general-event-list/general-event-list.component';
import { SpecialEventListComponent } from './list/special-event-list/special-event-list.component';
import { PaymentComponent } from './payment/payment.component';
import { HttpModule } from '@angular/http';
import { PageServiceService } from './servicesEvent/page-service.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule, MatInputModule, MatButtonModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import * as Material from "@angular/material";
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    ListComponent,
    AdminRegisterComponent,
    GeneralEventComponent,
    GeneralEventDetailsComponent,
    TicketPrintingComponent,
    CreateEventComponent,
    CreateSpecialEventComponent,
    SpecialEventComponent,
    SpecialEventDetailsComponent,
    FilterpipePipe,
    GeneralEventListComponent,
    SpecialEventListComponent,
    PaymentComponent,
    ConfirmationComponent
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule, 
    ReactiveFormsModule,
    HttpModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    Material.MatToolbarModule,
    Material.MatGridListModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatRadioModule,
    Material.MatSelectModule,
    Material.MatCheckboxModule,
    Material.MatDatepickerModule,
    Material.MatNativeDateModule,
    Material.MatButtonModule,
    Material.MatSnackBarModule,
    Material.MatTableModule,
    Material.MatIconModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],

  exports:[
    MatAutocompleteModule,
    Material.MatToolbarModule,
    Material.MatGridListModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatRadioModule,
    Material.MatSelectModule,
    Material.MatCheckboxModule,
    Material.MatDatepickerModule,
    Material.MatNativeDateModule,
    Material.MatButtonModule,
    Material.MatSnackBarModule,
    Material.MatTableModule,
    Material.MatIconModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],

  providers: [AuthserviceService,DatePipe,PageServiceService,AuthGuard,TokenStorageServiceService,{
    provide: HTTP_INTERCEPTORS,
    useClass:TokenInterceptorServiceService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
