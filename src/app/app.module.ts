import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';

import { AuthModule } from './auth/auth.module';
import { ClassroomListModule } from './classroom/list/list.module';

import { RequestService } from './providers/request.service';
import { WebStorageModule } from './providers/webstorage'; 
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    WebStorageModule,
    HttpModule
  ],
  providers: [],
  providers: [
    RequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
