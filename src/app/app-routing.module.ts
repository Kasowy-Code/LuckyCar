import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CalendarComponent} from "./calendar/calendar.component";
import {LotteryComponent} from "./lottery/lottery.component";
import {AccountComponent} from "./account/account.component";
import {ParkingComponent} from "./parkings/parking.component";

import {LoginComponent} from "./Auth/login/login.component";
import {RegisterComponent} from "./Auth/register/register.component";
import {RegisterSuccessComponent} from "./Auth/register-success/register-success.component";
import {RegisterPasswordComponent} from "./Auth/register-password/register-password.component";
import {AuthGuard} from "./guards/auth.guard";
import {AcceptUserComponent} from "./Auth/accept-user/accept-user.component";
import {DeleteUserComponent} from "./Auth/delete-user/delete-user.component";
import {LoginGuard} from "./guards/login.guard";
import {TokenGuard} from "./guards/token.guard";
import {RoleGuard} from "./guards/role.guard";
import {SelectUsersComponent} from "./lottery/select-users/select-users.component";
import {RestartPasswordComponent} from "./Auth/restart-password/restart-password.component";
import {UsersComponent} from "./account/users/users.component";
import {AuthErrorComponent} from "./Auth/auth-error/auth-error.component";
import {ForgotPasswordComponent} from "./Auth/forgot-password/forgot-password.component";

const routes: Routes = [{path: "lottery", component: LotteryComponent, canActivate: [AuthGuard, TokenGuard]},
  {path: "lottery/selectUsers", component: SelectUsersComponent, canActivate: [AuthGuard, TokenGuard]},
  {path: "calendar", component: CalendarComponent, canActivate: [AuthGuard, TokenGuard]},
  {path: "account", component: AccountComponent, canActivate: [AuthGuard, TokenGuard]},
  {path: "parking-lots", component: ParkingComponent, canActivate: [AuthGuard, TokenGuard, RoleGuard]},
  {path: "login", component: LoginComponent, canActivate: [LoginGuard]},
  {path: "register", component: RegisterComponent, canActivate: [LoginGuard]},
  {path: "registered", component: RegisterSuccessComponent},
  {path: "registerPassword/:id", component: RegisterPasswordComponent, canActivate: [LoginGuard]},
  {path: "accept/:id", component: AcceptUserComponent, canActivate: [AuthGuard, RoleGuard, TokenGuard]},
  {path: "delete/:id", component: DeleteUserComponent, canActivate: [AuthGuard, RoleGuard, TokenGuard]},
  {path: "changePassword/:id", component: RestartPasswordComponent},
  {path: "account/users", component: UsersComponent, canActivate: [AuthGuard, TokenGuard, RoleGuard]},
  {path: "auth-error", component: AuthErrorComponent, canActivate: [AuthGuard, TokenGuard, RoleGuard]},
  {path: "forgot-password", component: ForgotPasswordComponent},
  {path: "", pathMatch: "full", redirectTo: "login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
