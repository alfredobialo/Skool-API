import {Component,Input, OnInit} from '@angular/core';

@Component({
  selector: 'loading',
  template: `
    <span *ngIf="active" 
          class="fa-2x fa fa-refresh fa-spin color-gray-deep"></span> 
          &nbsp;<span *ngIf="active" class="color-orange font-size-12">Processing...</span>
  `
})

export class LoadingComponent implements OnInit {
  @Input() active : boolean =  false;
  constructor() {
  }

  ngOnInit() {
  }
}
