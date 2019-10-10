 
import {Component, ViewContainerRef, Inject,ViewChild, TemplateRef, ChangeDetectorRef,EventEmitter} from '@angular/core';
import {CdkOverlayOrigin, CdkConnectedOverlay, ConnectionPositionPair, ConnectedOverlayPositionChange} from '@angular/cdk/overlay';
import {DOCUMENT} from '@angular/common'; 
import { TooltipTrigger } from "./trigger-types";
import { POSITION_MAP,getPlacementName,DEFAULT_TOOLTIP_POSITIONS } from "./overlay-positions";
import { zoomBigMotion } from "./animations";
@Component({
  selector: 'popover',
  templateUrl:"./popover.component.html",
  animations: [zoomBigMotion],
  styleUrls:["./popover.component.css"]
})
export class PopoverComponent  {

    constructor(
      public cdr: ChangeDetectorRef, 
      public viewContainerRef: ViewContainerRef, 
      @Inject(DOCUMENT) public _document: any
    ){ }

    readonly specificVisibleChange = new EventEmitter<boolean>();

    set specificPlacement(value: string) {
      if (value !== this._placement) {
        this._placement = value; 
        this._positions = [POSITION_MAP[this._placement], ...this._positions]; 
      }
    }

    set specificVisible(value:boolean){
      if(this._visible!=value){
        this._visible = value;
        this.specificVisibleChange.emit(this._visible);
      }
    }

    get specificVisible(){
      return this._visible;
    }

    specificTitle: TemplateRef<void>;
    specificContent: TemplateRef<void>;
    specificTrigger: TooltipTrigger;
    _placement: string = "bottom";
    _classMap = {};
    _positions: ConnectionPositionPair[] = [...DEFAULT_TOOLTIP_POSITIONS]; 
    _visible = false; 
    origin: CdkOverlayOrigin;

    @ViewChild('overlay', { static: false }) overlay: CdkConnectedOverlay; 
      
    updateByDirective(): void {
      this.setClassMap();
      this.cdr.detectChanges();
      Promise.resolve().then(() => {
        this.updatePosition();
      });
    }

    setOverlayOrigin(origin: CdkOverlayOrigin): void {
      this.origin = origin;
      this.cdr.markForCheck();
    }

    updatePosition(): void {
      if (this.origin && this.overlay && this.overlay.overlayRef) {
        this.overlay.overlayRef.updatePosition();
      }
    }

    onPositionChange(position: ConnectedOverlayPositionChange): void { 
      this._placement = getPlacementName(position)!; 
      this.setClassMap();
      this.cdr.detectChanges();
    }
  
  
  setClassMap(): void {
    this._classMap = { 
      [`ant-popover-placement-${this._placement}`]: true
    }; 
    
  } 

  show(){
    if(this._visible) return;
    this.specificVisible = true;
  }

  hide(){
    if(!this._visible) return ;
    this.specificVisible = false;
  }
   
}
