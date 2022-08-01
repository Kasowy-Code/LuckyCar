import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
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
import { AdminComponent } from './admin/admin.component';
import {ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './Auth/login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { RegisterComponent } from './Auth/register/register.component';
import { RegisterSuccessComponent } from './Auth/register-success/register-success.component';
import { RegisterPasswordComponent } from './Auth/register-password/register-password.component';
import {LoginService} from "./Auth/login/services/login.service";
import {FormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {ParkingLotDialogComponent} from './lottery/parking-lot-dialog/parking-lot-dialog/parking-lot-dialog.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {AuthGuard} from "./auth.guard";
import {TokenInterceptorService} from "./shared/services/token-interceptor.service";
import { AcceptUserComponent } from './Auth/accept-user/accept-user.component';
import {ParkingComponent} from "./parkings/parking.component";
import {MatListModule} from "@angular/material/list";
import {MatTabsModule} from "@angular/material/tabs";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatChipsModule} from "@angular/material/chips";
import { ParkingDialogComponent } from './parkings/dialog/parking-dialog.component';
import { LotteryDialogComponent } from './lottery/lottery-dialog/lottery-dialog.component';
import {SwiperModule} from "swiper/angular";




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
    AccountComponent,
    AdminComponent
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
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    MatSlideToggleModule,
    MatListModule,
    MatProgressSpinnerModule
  ],
  providers: [LoginService, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})

export class AppModule{ }
