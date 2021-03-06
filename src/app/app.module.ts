import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';

import { AuthModule } from './auth/auth.module';
import { ClassroomListModule } from './classroom/list/list.module';

import { RequestService } from './providers/request.service';
import { WebStorageModule } from './providers/webstorage'; 
import { AuthGuard } from './guards/auth.guard';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    ClassroomListModule,
    WebStorageModule,
    HttpModule
  ],
  providers: [
    AuthGuard,
    RequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
