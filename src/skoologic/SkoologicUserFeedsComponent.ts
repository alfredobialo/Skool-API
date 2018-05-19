///<reference path="../../node_modules/@angular/core/src/metadata/lifecycle_hooks.d.ts"/>
import {Component, OnInit, Input, Output, ViewChildren, OnChanges, SimpleChanges, OnDestroy} from '@angular/core';
import {ISkoologicApiResponse, SkoologicApi} from './SkoologicApi';
import {IStudentDepartmentData} from './SkoologicStudentDataComponent';
import {isNil} from 'lodash';
// import {memoize} from 'lodash-decorators';
import {IMedia, IPostComment, ISkoologicPostData, SkoologicPostCriteria} from './PostModel';

@Component({
  selector: 'skoologic-post',
  template: `
    <div class=" margin-b-20 bg-white shadow pad30 myhover" [ngStyle]="{'border-top' : post.type == 2 ?'solid 4px #68bdd8':'solid 4px #fb6e8b'}">
      <div class="row">
        <div class="col-1">
          <div class="d-flex justify-content-center flex-column">
            <user-avatar [imageUrl]="post.postedBy.profileUrl" [size]="2"></user-avatar>
          </div>

        </div>
        <div class="col-10">
          <div class="pad">
        <div>    <span class="font-size-14 pad10 bold"
                  [ngStyle]="{'color':post.type==1 ? 'green' : 'blue'}"
                  *ngIf="post.title">{{post.title}} </span>
            <span
              class="pull-right bold font-size-12 text-muted">By: {{post.postedBy.displayName}}</span></div>
            <span class="">
              {{post.details}}
            </span>
            <div class="margin-t-10">
              <post-media *ngIf="currentImage" [image]="currentImage"></post-media>
            </div>
            <div class="margin-t-5">
              <post-comment [comments]="post.comments"></post-comment>
            </div>
          </div>
        </div>
        <div class="col-1">
          <div class="pad5">
            <ng-content>

            </ng-content>
             <div *ngFor="let m of post.media; let index = index;" class="margin-t-10 cursor-pointer" [ngClass]="{'bg-highlight' : currentImage.mediaUrl==m.mediaUrl }" (click)="setImage(m)">
               <user-avatar *ngIf="(index+1) < 6"  [imageUrl]="m.mediaUrl" [size]="2"></user-avatar>
               
             </div>
              <div class="text-center" *ngIf="post.media.length>5">
                  <span class="bold text-muted font-size-28">
                      +{{post.media.length - 5}}
                  </span>
              </div>
          </div>
        </div>
      </div>

    </div>
  `,
  styles : [
    `div.myhover:hover, div.myhover:focus {
      transition: all linear 400ms;
      /*color: #68bdd8;*/
      background-color: #fffff8 !important;
      background-image: linear-gradient(45deg, #fffff8, #ffffff, #f2f7ff);
    }`
  ]
})

export class PostComponent implements OnInit , OnChanges{
  ngOnChanges(changes: SimpleChanges): void {
    if(!isNil(changes["post"].currentValue))
    {
        // check the media and set the current Image
        if(this.post.media.length > 0)
        {
            this.currentImage  = this.post.media[0];
        }
    }

  }
  @Input() post: ISkoologicPostData;
  currentImage : IMedia ;
  constructor() {
  }

  ngOnInit() {

  }
  setImage(img : IMedia)
  {
    this.currentImage  = img;
  }
}

@Component({
  selector: 'skoologic-post-list',
  template: `

    <div class="d-flex justify-content-center  " *ngIf="processing">
      <loading [active]="true"></loading>
    </div>
    <div class="margin-b-20" *ngIf="!processing">
      <button (click)="loadFeeds()" class="ui-button ui-button-flat-default ui-button-block"><i class="fa fa-refresh"></i> &nbsp; Reload
        Post
      </button>
    </div>
    <div *ngFor="let p of data; let i = index;">
      <!--[ngStyle]="{'border-left':p.type==1 ? '3px solid green' : '3px solid blue'}"-->
      <skoologic-post [post]="p">
        <a href="" (click)="deletePost(p,i,$event)" class=""><i class="fa fa-trash color-red"></i></a>

      </skoologic-post>
    </div>
    <div class="d-flex justify-content-center  " *ngIf="processing && data.length>0">
      <loading [active]="true"></loading>
    </div>
  `
})

export class PostListComponent implements OnInit, OnChanges, OnDestroy {
  ngOnDestroy(): void {
    // Cache the existing data if any and reuse
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (!isNil(changes['criteria'].currentValue)) {
      // load post
      this.loadFeeds();
    }
  }

  /// Lets get the User Data
  @Input() criteria: IStudentDepartmentData;
  @Input() useInfiniteScroll: boolean = true;

  response: ISkoologicApiResponse<ISkoologicPostData[]>;
  processing: boolean = false;
  data: ISkoologicPostData[] = [];

  constructor(private api: SkoologicApi) {
  }

  ngOnInit() {
    // Chech if use infinit scroll is enabled
    if (this.useInfiniteScroll) {
      // var that = $(this);
      // var top  = that.scrollTop();
      // // calculate the total available scroll area
      // var height  =   $(document).height();
      //
      //
      // var refreshPos  = ((top >=( (height-that.height())-250)) && scope.loading== false) ;
      //   document.onscroll=((evt:any) => {
      //     console.log(evt.pageY);
      //     // if(evt.pageY>= document.body.offsetHeight-350 && !this.processing)
      //     // {
      //     //    // we can load another page from this section
      //     //
      //     //   this.loadFeeds(this.response.criteria.currentPage + 1);
      //     // }
      //     console.log(document.body.offsetHeight);  // this the height of the body element, so we need it to calculate scroll capacity
      //
      //   });
    }
  }

  loadFeeds(currentPage:number =1) {
    if (!isNil(this.criteria)) {
      this.processing = true;
      this.api.getUserPost(SkoologicPostCriteria.from(this.criteria, currentPage, 15))
        .subscribe(x => {
          this.response = <ISkoologicApiResponse<ISkoologicPostData[]>> x;
          this.data = this.response.data;
        }, x => {
          ///alert('Error Occurred on Server');
          this.processing = false;
        }, () => {
          this.processing = false;
        });

    }
  }

  deletePost(post: ISkoologicPostData, index: number, evt: Event) {
    evt.preventDefault();
    if (confirm(`Are you sure you want to delete the post : ${post.details}`)) {
      // delete
      this.data.splice(index, 1);
    }
  }
}


@Component({
  selector: 'post-media',
  template: `
    <div>
      <img [src]="image.mediaUrl || (medias[0]?.mediaUrl)" width="100%" alt="">
    </div>
  `
})

export class PostMediaComponent implements OnInit {
  @Input() medias: IMedia[];
  @Input() image : IMedia;
  constructor() {
  }

  ngOnInit() {
  }
}


@Component({
  selector: 'post-comment',
  template: `
    <div *ngFor="let c of comments" class="margin-b-20 divider" style="line-height: 18px;">
      <div class="row">
        <div class="col-1">
          <div class="">

            <user-avatar [imageUrl]="c.commentBy.profileUrl" [size]="1"></user-avatar>
          </div>
        </div>
        <div class="col-11">
          <span class="bold font-size-12 color-blue">{{c?.commentBy?.displayName}} </span>
          <br>
          <div class="font-size-14">
            {{c.comment}}
          </div>
          <div class="font-size-12 theme-caption-color text-right">{{c.datePosted}}</div>
        </div>
      </div>
    </div>

  `
})

export class PostCommentComponent implements OnInit {
  @Input() comments: IPostComment[];

  constructor() {
  }

  ngOnInit() {
  }
}
