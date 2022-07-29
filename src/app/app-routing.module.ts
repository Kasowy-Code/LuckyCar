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
import {AuthGuard} from "./guards/auth.guard";
import {AcceptUserComponent} from "./Auth/accept-user/accept-user.component";
import {DeleteUserComponent} from "./Auth/delete-user/delete-user.component";
import {LoginGuard} from "./guards/login.guard";
import {TokenGuard} from "./guards/token.guard";
import {SetPasswordErrorHandler} from "./errorhandler/SetPasswordErrorHandler";
import {RoleGuard} from "./guards/role.guard";

const routes: Routes = [{path: "lottery", component: LotteryComponent},
  {path: "calendar", component: CalendarComponent, canActivate: [AuthGuard, TokenGuard]},
  {path: "cars", component: CarsComponent},
  {path: "account", component: AccountComponent, canActivate: [AuthGuard]},
  {path: "login", component: LoginComponent, canActivate: [LoginGuard]},
  {path: "register", component: RegisterComponent, canActivate: [LoginGuard]},
  {path: "registered", component: RegisterSuccessComponent},
  {path: "registerPassword/:id", component: RegisterPasswordComponent, canActivate: [LoginGuard]},
  {path: "accept/:id", component: AcceptUserComponent, canActivate: [AuthGuard, RoleGuard]},
  {path: "delete/:id", component: DeleteUserComponent, canActivate: [AuthGuard, RoleGuard]},
  {path: "", pathMatch: "full", redirectTo: "login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
