import {NgModule} from '@angular/core';
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
import { AdminComponent } from './admin/admin.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RegisterComponent} from './Auth/register/register.component';
import {RegisterSuccessComponent} from './Auth/register-success/register-success.component';
import {RegisterPasswordComponent} from './Auth/register-password/register-password.component';
import {LoginService} from "./Auth/login/services/login.service";
import {MatDialogModule} from "@angular/material/dialog";
import {SelectUsersComponent} from './lottery/select-users/select-users.component';
import {MatDividerModule} from "@angular/material/divider";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {DeleteUserComponent} from './Auth/delete-user/delete-user.component';
import {LoginGuard} from "./guards/login.guard";
import {
  SignUpToLotteryButtonComponent
} from "./lottery/sign-up-to-lottery/sign-up-to-lottery-button/sign-up-to-lottery-button.component";
import {
  ResigningFromLotteryDialogComponent
} from "./lottery/sign-up-to-lottery/resigning-from-lottery-dialog/resigning-from-lottery-dialog.component";
import {RoleGuard} from "./guards/role.guard";
import {MatMenuModule} from "@angular/material/menu";
import {
  ChangeLotterySettingsMenuComponent
} from "./lottery/change-lottery-settings/change-lottery-settings-menu/change-lottery-settings-menu.component";
import {
  ChangeRegularLotteryDateFormComponent
} from "./lottery/change-lottery-settings/change-lottery-settings-dialog/change-regular-lottery-date-form/change-regular-lottery-date-form.component";
import {
  ChangeTemporaryLotteryDateFormComponent
} from './lottery/change-lottery-settings/change-lottery-settings-dialog/change-temporary-lottery-date-form/change-temporary-lottery-date-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {RestartPasswordComponent} from './Auth/restart-password/restart-password.component';
import {DialogComponent} from './account/dialog/dialog.component';
import {UsersComponent} from './account/users/users.component';
import {UserDialogComponent} from './account/user-dialog/user-dialog.component';
import {AreYouSureDialogComponent} from './account/user-dialog/are-you-sure-dialog/are-you-sure-dialog.component';
import {AuthErrorComponent} from './Auth/auth-error/auth-error.component';
import {
  CalendarButtonToggleGroupComponent
} from './calendar/calendar-button-toggle-group/calendar-button-toggle-group.component';
import {
  FreeTakeButtonComponent
} from './calendar/calendar-button-toggle-group/free-take-button/free-take-button.component';
import {
  ReserveAdminButtonComponent
} from './calendar/calendar-button-toggle-group/reserve-admin-button/reserve-admin-button.component';
import {
  FreePlaceAdminButtonComponent
} from './calendar/calendar-button-toggle-group/free-place-admin-button/free-place-admin-button.component';
import {ForgotPasswordComponent} from './Auth/forgot-password/forgot-password.component';
import {ParkingLotDialogComponent} from './lottery/parking-lot-dialog/parking-lot-dialog/parking-lot-dialog.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {AuthGuard} from "./guards/auth.guard";
import {TokenInterceptorService} from "./shared/services/token/token-interceptor.service";
import { AcceptUserComponent } from './Auth/accept-user/accept-user.component';
import {ParkingComponent} from "./parkings/parking.component";
import {MatListModule} from "@angular/material/list";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { ParkingDialogComponent } from './parkings/dialog/parking-dialog.component';
import { LotteryDialogComponent } from './lottery/lottery-dialog/lottery-dialog.component';





@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CalendarComponent,
    LotteryComponent,
    CarsComponent,
    AccountComponent,
    AdminComponent,
    ParkingComponent,
    ParkingDialogComponent,
    LotteryDialogComponent,
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
    DeleteUserComponent,
    ChangeRegularLotteryDateFormComponent,
    ChangeLotterySettingsMenuComponent,
    ChangeTemporaryLotteryDateFormComponent,
    DeleteUserComponent,
    RestartPasswordComponent,
    DialogComponent,
    UsersComponent,
    UserDialogComponent,
    AreYouSureDialogComponent,
    AuthErrorComponent,
    CalendarButtonToggleGroupComponent,
    FreeTakeButtonComponent,
    ReserveAdminButtonComponent,
    FreePlaceAdminButtonComponent,
    AuthErrorComponent,
    ForgotPasswordComponent
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
    MatSlideToggleModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonToggleModule
  ],
  providers: [LoginService, AuthGuard, LoginGuard, RoleGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})

export class AppModule{ }
