import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ng-demo-component',
  templateUrl: 'template.html',
  styles: [
    `
      .blue {
        background-color: blue;
        color: white;
      }
      .red {
        background-color: red;
        color: white;
      }
      .yellow {
        background-color: yellow;
        color: white;
      }
    `
  ]
})
export class DemoComponent {
  flag = false;
  change() {
    this.flag = !this.flag;
  }
}
