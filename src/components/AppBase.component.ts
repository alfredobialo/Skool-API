import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ISkoologicUser} from '../skoologic/SkoologicApi';

export const konkritNewsFireBaseConfig: any =
  {
    apiKey: 'AIzaSyCvKVho9gdzUH4FQm5xmmfeFDnny4a7qKI',
    authDomain: 'konkrit-news.firebaseapp.com',
    databaseURL: 'https://konkrit-news.firebaseio.com',
    projectId: 'konkrit-news',
    storageBucket: 'konkrit-news.appspot.com',
    messagingSenderId: '828273046079'
  };

///firebase.initializeApp(config);


@Component({
  selector: 'app-base-component',
  template: `
    <div class="bg-success app-nav pad20" [class.bg-primary]="loggedIn" [class.bg-success]="loggedIn == false ">
      <div class="row">
        <div class="col-3">
          Welcome Free Post
        </div>
        <div class="col-9 text-right">
          <span *ngIf="loggedIn">
            <div class="display-inine-block">
            <user-avatar [size]="1" [imageUrl]="userInfo.profilePicture"></user-avatar>
          </div>
            
            {{userInfo?.displayName}}</span>
          <button *ngIf="loggedIn" class="ui-button ui-button-danger ui-button-sm" (click)="loggedIn = false">Logout
          </button>
        </div>
      </div>
    </div>
    <div style="margin-top: 90px;" class="container-fluid">

      <div class="">
        <div class="row">
          <div class="col-12">
            <div class="centralize">
              <div *ngIf="!loggedIn">
                <p *ngIf="errMessage" class="pad20 shadow bg-highlight-red font-size-18 color-red">
                  <span class="fa fa-hourglass-end fa-2x"></span> &nbsp; {{errMessage}}
                </p>
                <div class="margin-t-40 ">
                  <div class="pad10">
                    <animated-text-component text="My Name is Alfred Obialo and Am A Software Developer" cssClass="font-size-20 color-red bold"></animated-text-component>
                  </div>
                  <skoologic-login (onLoginSuccess)="loginSuccess($event)"
                                   (onLoginFailure)="loginFailed($event)">
                  </skoologic-login>

                </div>
              </div>

              <div *ngIf="loggedIn">
                <div class="row ">
                  <div class="col-sm-3">
                    <div class="pad20 bg-white">
                      <div class="row">
                        <div class="col-sm-5">
                          <user-avatar *ngIf="userInfo" [size]="5" [imageUrl]="userInfo.profilePicture"></user-avatar>
                        </div>
                        <div class="col-sm-7">
                          <br><br>
                          <user-name [user-data]="userInfo"></user-name>
                        </div>

                      </div>

                    </div>
                    <div>
                      <student-data [userId]="userInfo.id" (onLoadSuccess)="this.dData = $event">
                        <loading [active]="true"></loading>
                      </student-data>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="pad">
                      <div class="text-left">
                        <skoologic-post-list [criteria]="dData" >
                        </skoologic-post-list>


                      </div>


                    </div>

                  </div>
                  <div class="col-sm-3">
                    <div class="bg-white pad20 min-h700">
                        <news-list-component></news-list-component>
                    </div>
                  </div>
                </div>

              </div>

            </div>


          </div>

        </div>

      </div>

    </div>

  `
})

export class AppBaseComponent implements OnInit {
  userInfo: ISkoologicUser;
  errMessage: string;
  loggedIn: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

  loginSuccess(skoologicUser: ISkoologicUser) {
    this.userInfo = skoologicUser;
    this.errMessage = null;
    this.loggedIn = true;
    // alert("Login Successfull");
  }

  loginFailed(msg: string) {
    this.errMessage = msg;
  }
}


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'login',
  template: `
    <div class="p-4 position-relative">

      <h3>I Love Angular</h3>
      <h5 class="font-weight-bold f">My name is : {{name}}</h5>
      <input type="text"
             (keyup)="txtChanged(txtAddress.value)"
             (change)="txtChanged(txtAddress.value)"
             [value]="address" name="txtAddress" id="" #txtAddress class="form-control">

    </div>

  `
  //templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  name: string = 'Alfred Obialo';
  @Input() address: string;
  @Input() hint: string = 'UI Hint';
  @Output() addressChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(private elemRef: ElementRef) {


  }

  txtChanged(txt: string) {
    this.addressChanged.emit(txt);
    // console.log(txt);
  }


  ngOnInit() {
    // get hold of the elem and do the following
    console.log(this.elemRef);
    let lgUi: HTMLDivElement = <HTMLDivElement>this.elemRef.nativeElement;
    console.log(lgUi);
    let ui: HTMLSpanElement = document.createElement('span');
    ui.innerText = `${this.hint}`;
    ui.style.padding = '7px';
    ui.style.fontSize = '11px';
    ui.style.backgroundColor = '#4b3da8';
    ui.style.color = 'white';
    ui.style.boxShadow = '0 0 4px #ccc';
    ui.style.borderRadius = '7px';
    ui.style.position = 'absolute';
    ui.style.bottom = /*parseInt(lgUi.style.height) -*/ 0 + 'px';
    ui.style.right = /*parseInt(lgUi.style.height) -*/ 40 + 'px';
    lgUi.appendChild(ui);
    console.log(ui);
    if (this.address) {
      this.txtChanged(this.address);
    }
  }
}
