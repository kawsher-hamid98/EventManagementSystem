import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Router, Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ListComponent } from './components/list/list.component';
import { AdminRegisterComponent } from './components/admin-register/admin-register.component';
import { GeneralEventComponent } from './componentsEvent/general-event/general-event.component';
import { CreateEventComponent } from './componentsEvent/create-event/create-event.component';
import { GeneralEventDetailsComponent } from './componentsEvent/general-event-details/general-event-details.component';
import { TicketPrintingComponent } from './componentsEvent/ticket-printing/ticket-printing.component';
import { CreateSpecialEventComponent } from './componentsSpecialEvent/create-special-event/create-special-event.component';
import { SpecialEventComponent } from './componentsSpecialEvent/special-event/special-event.component';
import { SpecialEventDetailsComponent } from './componentsSpecialEvent/special-event-details/special-event-details.component';
import { GeneralEventListComponent } from './list/general-event-list/general-event-list.component';
import { SpecialEventListComponent } from './list/special-event-list/special-event-list.component';
import { PaymentComponent } from './payment/payment.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

const routes: Routes = [

  {path: '', redirectTo: 'generalEvent', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'event-details/:id', component: GeneralEventDetailsComponent},
  {path: 'generalEvent', component: GeneralEventComponent},
  {path: 'generalEventList', component: GeneralEventListComponent},
  //User Guard
  {path: 'dash', component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'specialEvent', component: SpecialEventComponent},
  {path: 'specialEventDetails/:id', component: SpecialEventDetailsComponent},
  {path: 'specialEventList', component: SpecialEventListComponent, canActivate: [AuthGuard]},
  {path: 'ticket/:id', component: TicketPrintingComponent, canActivate: [AuthGuard]},
  {path: 'payment/:id', component: PaymentComponent,  canActivate: [AuthGuard]},
  {path: 'confirmation', component: ConfirmationComponent,  canActivate: [AuthGuard]},
  //Admin Guard
  {path: 'list', component: ListComponent, canActivateChild: [AuthGuard],
  children: [{path: '',component: HomeComponent}]},

  {path: 'admin', component: AdminRegisterComponent, canActivateChild: [AuthGuard],
  children: [{path: '',component: HomeComponent}]},

  {path: 'createSpecialEvent', component: CreateSpecialEventComponent, canActivateChild: [AuthGuard],
  children: [{path: '',component: HomeComponent}]},

  {path: 'createGeneralEvent', component: CreateEventComponent, canActivateChild: [AuthGuard],
  children: [{path: '',component: HomeComponent}]},
  
]


@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports:[RouterModule],
  declarations: []
})
export class AppRoutingModule { }
