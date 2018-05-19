import  {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ILoginCredential} from "./SkoologicLoginComponent";
import {ISkoologicPostData, SkoologicPostCriteria} from './PostModel';
import {environment} from '../environments/environment';

export interface ISkoologicApiResponse<T>
{
    message :string;
    data : T | any ;
    success : boolean,
    criteria : any,
}

export interface ISkoologicUser
{
  id:string;
  displayName : string;
  isActive :boolean;
  profilePicture : string;
  bannerUrl :string;
  phoneNo : string;
  gender : string;
  accountType : string;
  hasProfilePicture : boolean;
  hasBanner : boolean;
  tag : string;
  dateCreated : string;
}

@Injectable()
export class SkoologicApi
{
  postCache : ISkoologicApiResponse<ISkoologicPostData[]>  ;
  private POST_URL :string ="feedschannel/";
  private baseUrl :string ="http://localhost:4000/skoologic/api/";/// environment.production ? "http://skoologic.asomproject.com/api/"  : "http://localhost:4000/skoologic/api/";
    constructor(private http : HttpClient)
    {

    }
    public getAppInfo()
    {
       return this.http.get(`${this.baseUrl}app`);
    }

    public loginToSkoologic(credential : ILoginCredential) //: Observable<ISkoologicApiResponse>
    {

       return this.http.post(
         `${this.baseUrl}userlogin/login?timestamp=${new Date().getMilliseconds()}`,
         {
           userId : credential.userId,
           password : credential.password
         }

       )
    }

    public  getStudentData(userId : string)
    {
      return this.http.get(`${this.baseUrl}userLogin/student-data?userid=${userId}`);
    }
  public getUserPost (postCriteria : SkoologicPostCriteria)
  {
        const url : string = `${this.baseUrl}${this.POST_URL}user-feeds?userId=${postCriteria.studentId}&deptId=${postCriteria.deptId}&levelId=${postCriteria.levelId}&sessionId=${postCriteria.sessionId}&currentPage=${postCriteria.currentPage}&pageSize=${postCriteria.pageSize}`;

        return this.http.get(url);
  //      <ISkoologicApiResponse<ISkoologicPostData[]>
  }

}

