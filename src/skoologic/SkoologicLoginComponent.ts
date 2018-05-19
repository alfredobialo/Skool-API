import {Component, AfterViewInit,ElementRef, OnInit, OnDestroy, Output, EventEmitter, Directive} from '@angular/core';
import {ISkoologicApiResponse, ISkoologicUser, SkoologicApi} from "./SkoologicApi";
import {Subscription} from "rxjs/Subscription";
import {isNil} from  "lodash";
@Component({
  selector : "skoologic-login",
  template : `
   
      <div class="" >
        <div class=" fix-width-400px  min-h200 shadow-stronger-thick-and-heavy bg-success ui-bg-color border-radius centralize">
          <div class="text-center pad10 bg-primary">
              <img *ngIf="appInfo" [src]="appInfo.appLogoUrl" alt="Skoologic Logo" width="150px" />
            <p *ngIf="appInfo== null" class="font-size-17 margin-t-5">Login To Skoologic</p>
          </div>

          <div class="pad30">

            <form name="frmLogin" class="form-horizontal" role="form"
                  (submit)="login($event ,userId, pwd)"
                  novalidate >
              <div>

                <div class="row">
                  <div class="col-2 text-uppercase">
                    <i class="fa fa-user font-size-20"> </i>
                  </div>
                  <div class="col-10">
                    <input type="text" maxlength="30"
                           focus-input
                           required name="userId"
                           #userId
                           placeholder="Login User Id"
                           class="ui-input ui-required font-size-16"/>


                  </div>

                </div>
                <br />
                <div class="row">
                  <div class="col-2 text-uppercase">
                    <i class="fa fa-lock font-size-20"> </i>
                  </div>
                  <div class="col-10">
                    <input type="password" maxlength="30" required name="password"

                           placeholder="Password"
                           #pwd
                           class="ui-input ui-required font-size-16"/>

                    
                  </div>

                </div>
                <br />
                <div class="row">

                  <div class="col-10">
                    <label><input type="checkbox" ng-model="remember" name="remember" class="font-size-13" /> Keep me Logged in</label>

                  </div>

                </div>
                <br />
                <div class="margin-t-0">


                  <button class="ui-button ui-button-primary ui-button-md ui-button-block"
                          [disabled]  = "loading==true">
                    <span *ngIf="loading" class=""> Processing ...</span>
                    <span *ngIf="!loading">
                                  Login To Continue
                                </span>
                  </button>


                </div>

              </div>

            </form>



          </div>

        </div>
      </div>
   
  `
})
export class SkoologicLoginComponent implements AfterViewInit, OnInit, OnDestroy
{
  @Output() onLoginSuccess : EventEmitter<ISkoologicUser> =  new EventEmitter<ISkoologicUser>();
  @Output() onLoginFailure : EventEmitter<string> =  new EventEmitter<string>();
     res$  : Subscription;
     appInfo  : any = null;
    ngOnInit()
  {
    this.getAppInfo();
  }
    ngOnDestroy()
  {
    this.res$.unsubscribe();
  }
    ngAfterViewInit(): void {


  }
    constructor(private api : SkoologicApi)
    {

    }
    loading : boolean  = false;
    login(evt :Event,userId : HTMLInputElement, pwd: HTMLInputElement)
    {
      evt.preventDefault();
      let u  = userId.value, p = pwd.value;
      this.loading  = true;
      this.res$ = this.api.loginToSkoologic(
        {userId : u, password : p}
      ).subscribe(response  => {
        let res : ISkoologicApiResponse<ISkoologicUser>  = <ISkoologicApiResponse<ISkoologicUser>> response;
        if (res.success)
        {

          // successfull Login
          this.onLoginSuccess.emit(res.data);
        }
        else {
          this.onLoginFailure.emit(res.message);
        }
        this.loading  =false;
      });


    }

    getAppInfo()
    {
        this.res$= this.api.getAppInfo().subscribe(x => {

          const apiRes : ISkoologicApiResponse<any> = <ISkoologicApiResponse<any>>x;
          this.appInfo  = apiRes.data;

      });
    }
}

@Directive({
  selector : "[focus-input]"
})
export class FocusInputDirective implements OnInit
{
  ngOnInit(): void {
    let input : HTMLInputElement   = <HTMLInputElement>this.elemRef.nativeElement;
    if(!isNil(input))
    {
      input.focus();

    }

  }
  constructor(private elemRef : ElementRef)
  {

  }


}
export interface  ILoginCredential
{
    userId  : string;
    password : string;
}
