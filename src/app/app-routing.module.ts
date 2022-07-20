import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CalendarComponent} from "./calendar/calendar.component";
import {LotteryComponent} from "./lottery/lottery.component";
import {CarsComponent} from "./cars/cars.component";
import {AccountComponent} from "./account/account.component";
import {LoginComponent} from "./Auth/login/login.component";
import {RegisterComponent} from "./Auth/register/register.component";
import {RegisterSuccessComponent} from "./Auth/register-success/register-success.component";
import {RegisterPasswordComponent} from "./Auth/register-password/register-password.component";

const routes: Routes = [{path: "Lottery", component: LotteryComponent},
  {path: "Calendar", component: CalendarComponent},
  {path: "Cars", component: CarsComponent},
  {path: "Account", component: AccountComponent},
  {path: "Login", component: LoginComponent},
  {path: "Register", component: RegisterComponent},
  {path: "Registered", component: RegisterSuccessComponent},
  {path: "RegisterPassword", component: RegisterPasswordComponent},
  {path: "", pathMatch: "full", redirectTo: "Calendar"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
