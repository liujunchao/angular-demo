import { Component, Output, EventEmitter } from '@angular/core';

 
@Component({
  selector: 'app-overlay-panel',
  templateUrl: 'template.html' ,
  styles:[
    `
    .wu-overlay-pane {
      margin: 0;
      padding: 10px;
      border: 1px solid black;
      background-color: skyblue;
    }
    `
  ]
})
export class OverlayPanelComponent  {
  
}
