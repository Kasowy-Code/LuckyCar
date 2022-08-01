import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import {MatCardModule} from "@angular/material/card";
import {CalendarComponent} from './calendar/calendar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {LotteryComponent} from './lottery/lottery.component';
import {AccountComponent} from './account/account.component';
import {CarsComponent} from "./cars/cars.component";
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import {LoginComponent} from './Auth/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RegisterComponent} from './Auth/register/register.component';
import {RegisterSuccessComponent} from './Auth/register-success/register-success.component';
import {RegisterPasswordComponent} from './Auth/register-password/register-password.component';
import {LoginService} from "./Auth/login/services/login.service";
import {MatDialogModule} from "@angular/material/dialog";
import {ParkingLotDialogComponent} from './lottery/sign-up-to-lottery/parking-lot-dialog/parking-lot-dialog.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {SelectUsersComponent} from './lottery/select-users/select-users.component';
import {MatDividerModule} from "@angular/material/divider";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {AuthGuard} from "./guards/auth.guard";
import {TokenInterceptorService} from "./shared/services/token-interceptor.service";
import {AcceptUserComponent} from './Auth/accept-user/accept-user.component';
import {DeleteUserComponent} from './Auth/delete-user/delete-user.component';
import {LoginGuard} from "./guards/login.guard";
import {
  SignUpToLotteryButtonComponent
} from "./lottery/sign-up-to-lottery/sign-up-to-lottery-button/sign-up-to-lottery-button.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {SetPasswordErrorHandler} from "./errorhandler/SetPasswordErrorHandler";
import {
  ResigningFromLotteryDialogComponent
} from "./lottery/sign-up-to-lottery/resigning-from-lottery-dialog/resigning-from-lottery-dialog.component";
import {AcceptUserErrorHandler} from "./errorhandler/AcceptUserErrorHandler";
import {RoleGuard} from "./guards/role.guard";
import {DeleteUserErrorHandler} from "./errorhandler/DeleteUserErrorHandler";
import {MatSnackBarModule} from "@angular/material/snack-bar";


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CalendarComponent,
    LotteryComponent,
    CarsComponent,
    AccountComponent,
    LoginComponent,
    RegisterComponent,
    RegisterSuccessComponent,
    RegisterPasswordComponent,
    AccountComponent,
    ParkingLotDialogComponent,
    AcceptUserComponent,
    SelectUsersComponent,
    SignUpToLotteryButtonComponent,
    ResigningFromLotteryDialogComponent,
    ParkingLotDialogComponent,
    AcceptUserComponent,
    DeleteUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDividerModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    MatDividerModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatToolbarModule
  ],
  providers: [LoginService, AuthGuard, LoginGuard, RoleGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  },
    {
      provide: ErrorHandler,
      useClass: SetPasswordErrorHandler
    },
    {
      provide: ErrorHandler,
      useClass: AcceptUserErrorHandler
    },
    {
      provide: ErrorHandler,
      useClass: DeleteUserErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
