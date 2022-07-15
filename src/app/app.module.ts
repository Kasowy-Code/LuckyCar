import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import { MatNativeDateModule} from "@angular/material/core";
import {MatCardModule} from "@angular/material/card";
import { CalendarComponent } from './calendar/calendar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { LotteryComponent } from './lottery/lottery.component';
import { AccountComponent } from './account/account.component';
import {CarsComponent} from "./cars/cars.component";


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CalendarComponent,
    LotteryComponent,
    CarsComponent,
    AccountComponent
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

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
