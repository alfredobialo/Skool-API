import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'animated-text-component',
  template: `
    <span [class]="cssClass">
      {{text}}
    </span>
  `
})

export class AnimatedTextComponent implements OnInit , AfterViewInit, OnDestroy{
  ngOnDestroy(): void {
    if(this.timer != null)
    {
        window.clearInterval(this.timer);
    }

  }


  @Input() cssClass : string = "";
  @Input() delayStart : number  = 1000;  // Number of milliseconds to wait before starting animation;
  @Input() delayEnd : number  = 1000;    // Number of milliseconds to wait after ending animation;
  @Input() interval : number =  100;  // number of milliseconds to wait for the next animation
  @Input() text  : string  =  "Animated Text Component";
  timer : any = null;
  i:number = 0;
  constructor() {
  }
  ngAfterViewInit(): void {
    ///this.text  = "Programming Angular!!";
    this.startAnimation();
  }
  ngOnInit() {
  }

  startAnimation(){
    let oldTxt  = this.text;
      let  len =  oldTxt.length ;
    let res  : string  ="";
    this.timer   = window.setInterval(
        () =>{

          this.i+=1;

          if(this.i <= len)
          {
            res =  oldTxt.substring(0,this.i)+"|";
            this.text   = res;

          }
          else{
            this.i  =  0;
          }

        }
        ,this.interval
      );



  }
}
