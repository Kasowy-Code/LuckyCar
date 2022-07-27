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
import {AuthGuard} from "./auth.guard";
import {AcceptUserComponent} from "./Auth/accept-user/accept-user.component";
import {DeleteUserComponent} from "./Auth/delete-user/delete-user.component";

const routes: Routes = [{path: "lottery", component: LotteryComponent},
  {path: "calendar", component: CalendarComponent, canActivate: [AuthGuard]},
  {path: "cars", component: CarsComponent},
  {path: "account", component: AccountComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "registered", component: RegisterSuccessComponent},
  {path: "registerPassword/:id", component: RegisterPasswordComponent},
  {path: "accept/:id", component: AcceptUserComponent, canActivate: [AuthGuard]},
  {path: "delete/:id", component: DeleteUserComponent},
  {path: "", pathMatch: "full", redirectTo: "login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
