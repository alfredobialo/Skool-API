import {Component, Input, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import {isEmpty} from "lodash";
import {ISkoologicApiResponse, SkoologicApi} from './SkoologicApi';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'student-data',
  template:`
    <div class="bg-white pad20 margin-t-10  text-left">
      <div>
        <p class="divider pad10" *ngIf="userId">Student Department Info</p>
        <br />
        <ng-content *ngIf="loading">

        </ng-content>
        <div class="font-size-12">
          <p class="divider pad5">
            Department
            <img class="pull-right" [src]="data?.logoUrl" alt="{{data?.name}}" width="70px">
            <br>
            <span class="bold color-blue">{{data?.name}}</span>
            
          </p>
          <p class="divider pad5">
            Level :
            <span class="bold color-blue">{{data?.levelName}}</span>
          </p>
          <p class="divider pad5">
            Session :
            <span class="bold color-blue">{{data?.sessionName}}</span>
          </p>
        </div>
      </div>
     
      
      
    </div>
  `
})
export class StudentDataComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    if(this.res$ != null)
    {
        this.res$.unsubscribe();
    }

  }
  @Output() onLoadSuccess  : EventEmitter<IStudentDepartmentData>  =  new EventEmitter<IStudentDepartmentData>();
  @Input() userId : string  = null;
  loading : boolean  = false;
  constructor(private api : SkoologicApi) {
  }
  res$ : Subscription  ;
  data : IStudentDepartmentData = null;

  ngOnInit() {
    // make a request to the api, accept use data
    this.loadStudentDataFromServer();
  }

  loadStudentDataFromServer() : void
  {
      if (isEmpty(this.userId))
      {
          alert("Please specify the Student Login Id to Continue");
          return;
      }
      this.loading  = true;

      this.res$ = this.api.getStudentData(this.userId)
          .subscribe( response  => {
          let apiRes
              = <ISkoologicApiResponse<IStudentDataResult>> response;

          this.data  = <IStudentDepartmentData> apiRes.data.department;
          if(apiRes.message)
          {
              // emit the event here
              this.onLoadSuccess.emit(this.data);
          }
          this.loading  = false;
          // console.log(this.data);
        });


  }
}
export interface IStudentDataResult
{
  department  : IStudentDepartmentData;
  links  : any;
}
export interface IStudentDepartmentData
{
  name : string;
  departmentId : string;
  logoUrl : string;
  sessionName : string;
  sessionId : string;
  levelName : string;
  levelId : string;
  studentId : string;
  firstSemesterGp? : string | number;
  secondSemesterGp? : string | number;
  dateRegistered? : string | Date;
}
