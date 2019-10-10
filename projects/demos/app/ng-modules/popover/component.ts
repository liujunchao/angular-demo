import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ng-demo-component',
  templateUrl: 'template.html',
  styles: [
    `

    `
  ]
})
export class DemoComponent {
  placement = "topLeft";
  visible = false;
  value = "abcde";
  trigger="click";
  change(){
    this.placement = "topRight";
  }
}
