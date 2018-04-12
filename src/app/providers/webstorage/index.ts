import { NgModule } from '@angular/core';
import { LocalStorageService, SessionStorageService } from './webstorage.service';

export * from './webstorage.utility';
export * from './webstorage.service';

@NgModule({
  providers: [ LocalStorageService, SessionStorageService ]
})
export class WebStorageModule {}