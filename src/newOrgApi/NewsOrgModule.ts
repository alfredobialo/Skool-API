import {NgModule} from '@angular/core';
import {SharedModule} from '../SharedModule/SharedModule';
import {NewsListComponent} from './NewsListComponent';

@NgModule({
  imports:[ SharedModule],
  declarations: [NewsListComponent],
  exports : [NewsListComponent],
  providers: []


})
export  class NewsOrgModule
{

}
