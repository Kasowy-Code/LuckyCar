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
import {SelectUsersComponent} from "./lottery/select-users/select-users.component";
import {AuthGuard} from "./auth.guard";

const routes: Routes = [{path: "lottery", component: LotteryComponent},
  {path: "lottery/selectUsers", component: SelectUsersComponent},
  {path: "calendar", component: CalendarComponent, canActivate: [AuthGuard]},
  {path: "cars", component: CarsComponent},
  {path: "account", component: AccountComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "registered", component: RegisterSuccessComponent},
  {path: "registerPassword/:id", component: RegisterPasswordComponent},
  {path: "", pathMatch: "full", redirectTo: "login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
