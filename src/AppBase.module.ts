import {NgModule} from '@angular/core';

import {AppBaseComponent, LoginComponent} from './components/AppBase.component';
import {BrowserModule} from '@angular/platform-browser';
import {SkoologicModule} from "./skoologic/SkoologicModule";
import {SharedModule} from './SharedModule/SharedModule';
import {NewsOrgModule} from './newOrgApi/NewsOrgModule';


@NgModule({
  imports: [BrowserModule , SkoologicModule, SharedModule, NewsOrgModule
  ],
  exports: [],
  declarations: [AppBaseComponent, LoginComponent],
  bootstrap :[AppBaseComponent],
  providers: [],
})
export class AppBaseModule {


}
