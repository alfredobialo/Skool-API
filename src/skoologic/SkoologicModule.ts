///<reference path="../SharedModule/LoadingComponent.ts"/>
///<reference path="../../node_modules/@ng-bootstrap/ng-bootstrap/index.d.ts"/>
import {NgModule } from "@angular/core";
import {FocusInputDirective, SkoologicLoginComponent} from './SkoologicLoginComponent';
import {SkoologicApi} from "./SkoologicApi";
import { UserNameComponent} from "./SkoologicUserProfileComponent";
import {StudentDataComponent} from "./SkoologicStudentDataComponent";
import {PostCommentComponent, PostComponent, PostListComponent, PostMediaComponent} from './SkoologicUserFeedsComponent';
import {SharedModule} from '../SharedModule/SharedModule';

@NgModule({
  imports : [SharedModule],
  declarations : [SkoologicLoginComponent,
    UserNameComponent,
    PostComponent,PostListComponent,PostMediaComponent,PostCommentComponent,
    StudentDataComponent, FocusInputDirective],
  exports : [SkoologicLoginComponent, UserNameComponent, StudentDataComponent,PostListComponent],
  providers : [SkoologicApi ]
})
export  class  SkoologicModule
{

}


