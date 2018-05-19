import {IStudentDepartmentData} from './SkoologicStudentDataComponent';



  export interface ICurrentUser {
    id: string;
    displayName: string;
    profileUrl: string;
    hasPicture: boolean;
  }

  export interface ILevel {
    id: string;
    name: string;
    departmentId: string;
  }

  export interface IDepartmentInfo {
    id: string;
    name: string;
    logoUrl?: any;
  }

  export interface IPostedBy {
    id: string;
    displayName: string;
    profileUrl: string;
    hasPicture: boolean;
  }

  export interface IMedia {
    mediaType: string;
    mediaUrl: string;
    mediaTag: string;
    objId: string;
    datePosted: Date;
    isActive: boolean;
    totalLikes?: any;
  }

  export interface ICommentCriteria {
    pubId: string;
    getActiveComments: boolean;
    getBlocked: boolean;
    getDeleted: boolean;
    deptId?: any;
    userId: string;
    studentId?: any;
    tag?: any;
    usePagination: boolean;
    totalPages: number;
    totalRecord: number;
    currentPage: number;
    pageSize: number;
    id?: any;
    dateInterval?: any;
  }

  export interface ISkoologicPostData {
    makePublic: boolean;
    friendlyId: string;
    id: string;
    title: string;
    details: string;
    datePosted: string;
    showComment: boolean;
    tag: string;
    type: number;
    hasImage: boolean;
    imageUrl: string;
    isActive: boolean;
    allowComments: boolean;
    totalComments: number;
    isEditMode: boolean;
    currentUser: ICurrentUser;
    level: ILevel;
    departmentInfo: IDepartmentInfo;
    postedBy: IPostedBy;
    comments: IPostComment[];
    tag1?: any;
    tag2?: any;
    tag3?: any;
    tag4?: any;
    media: IMedia[];
    commentCriteria: ICommentCriteria;
    canEdit: boolean;
    date: Date;
    isDeleted: boolean;
    canDelete: boolean;
  }
/*
  commentBy
id	"peterilo4u"
displayName	"Peter Ilo 2015"
profileUrl	"http://localhost:4000/skoologic/11081980_27092014_05101990/000bner/00upl/40d95ed5-b954-46eb-9075-143785b0fbf0.jpg"
hasPicture	true
canEdit	false
comment	"Iyke you are becoming to Fat, Please take it easy!!!!"
datePosted	"1 wk 2days"
id	"917f445e-0314-407b-ab5b-b43b365808a3"
feedId	"60e3ad32-d138-427e-bfba-b0cc7e1b1225"
*
* */

export interface IPostComment
{
  commentBy : IPostedBy;
  canEdit : boolean;
  comment : string;
  datePosted : string;
  id : string ;
  feedId : string;
}
  export interface Criteria {
    deptId: string;
    studentId: string;
    levelId: string;
    sessionId: string;
    getActivePubs: boolean;
    getPublic: boolean;
    getForDept: boolean;
    usePagination: boolean;
    totalPages: number;
    totalRecord: number;
    currentPage: number;
    pageSize: number;
    tag?: any;
    id?: any;
    dateInterval?: any;
  }
export class SkoologicPostCriteria {
  constructor(
    public studentId  : string,
    public deptId  : string,
    public levelId : string,
    public sessionId : string,
    public pageSize : number   =  6,
    public currentPage : number  = 1,

  )
  {

  }
  public  static  from(studentData : IStudentDepartmentData, currentPage : number = 1, pageSize : number= 6) : SkoologicPostCriteria
  {
    return new SkoologicPostCriteria(
       studentData.studentId,
       studentData.departmentId,
       studentData.levelId,
       studentData.sessionId,
       pageSize,
       currentPage
     );
  }


}
