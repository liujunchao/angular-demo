import {OnInit,Input,Directive, Component, Output, EventEmitter,ElementRef,Renderer2,NgZone,HostBinding,HostListener } from '@angular/core';


@Directive({
  selector:"[colorfulClick]"
})
export class ColorfulClickDirective{
  colors = ["red","blue","gray","orange","yellow"];

  constructor(private element:ElementRef<HTMLInputElement>,private render:Renderer2,private zone:NgZone){ 
    this.bgcolor = this.colors[0];
  }

  index = 0;

  clickCount:number = 0;

  @HostBinding("style.backgroundColor") bgcolor:string;

  @HostListener("click")
  inputClick(){
    this.index ++;
    this.index = this.index%this.colors.length;
    this.bgcolor = this.colors[this.index];
    this.clickCount++;
    this.render.setAttribute(this.element.nativeElement,"value",this.clickCount.toString());
  }

}


@Directive({
  selector:"[sum]"
})
export class SumDirective implements OnInit {
  

  constructor(private element:ElementRef<HTMLInputElement>,private render:Renderer2,private zone:NgZone){ 
     
  } 

  @Input() value; 

  ngOnInit(){
    //if(this.value)
  }

}


@Component({
  selector: 'ng-demo-component',
  templateUrl: 'template.html'
})
export class DemoComponent {
 
}
