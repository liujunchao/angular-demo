import {ViewContainerRef,Input,TemplateRef,Directive,Component,EmbeddedViewRef } from '@angular/core';


@Directive({
  selector:"[myIf]"
})
export class MyIf{ 

  private _thenTemplateRef: TemplateRef<any>|null = null;
  private _elseTemplateRef: TemplateRef<any>|null = null;
  private _thenViewRef: EmbeddedViewRef<any>|null = null;
  private _elseViewRef: EmbeddedViewRef<any>|null = null;
  condition = null;  

  constructor(private _viewContainer: ViewContainerRef, templateRef: TemplateRef<any>){ 
    console.log("constructor then templateRef",this._viewContainer,templateRef);
    this._thenTemplateRef = templateRef;
  } 



  @Input()
  set myIf(condition: any) {
    console.log("condition",condition);
    this.condition = condition;
    this.updateView();
  }

  @Input()
  set myIfThen(templateRef: TemplateRef<any>|null) {
    console.log("then templateRef",templateRef);
    this._thenTemplateRef = templateRef;
    this._thenViewRef = null;
    this.updateView();
  }


  @Input()
  set myIfElse(templateRef: TemplateRef<any>|null) {    
    console.log("else templateRef",templateRef);
    this._elseTemplateRef = templateRef;
    this._elseViewRef = null;
    this.updateView();
  }

  
  @Input()
  set myIfFinally(templateRef: TemplateRef<any>|null) {    
    console.log("finally templateRef",templateRef); 
  }

  updateView(){
    if(this.condition === true){
      if(!this._thenViewRef){
        this._elseViewRef = null;
        this._viewContainer.clear();
        if(this._thenTemplateRef){
          this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef);
        }
      } 
    }else {
      if(!this._elseViewRef){
        this._viewContainer.clear();
        this._thenViewRef = null;
        if(this._elseTemplateRef){
          this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef);
        }
      }
    }
  }
  
}

@Component({
  selector: 'ng-demo-component',
  templateUrl: 'template.html'
})
export class DemoComponent {
  show = true;
}
