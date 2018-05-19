import {Component,Input} from '@angular/core';
import {ISkoologicUser} from "./SkoologicApi";



@Component({
  selector : "user-name",
  template : `
    <div *ngIf="userData" class="text-left">
      <span class="font-size-18">{{userData.gender.toLowerCase()=="male" ? "Mr." :"Mrs."}} {{userData.displayName}}</span>
      <br>
      <span class="font-size-13 bold">{{userData.phoneNo}}</span>
    </div>
   
  `,
})
export class UserNameComponent
{
  @Input("user-data") userData : ISkoologicUser;

}

