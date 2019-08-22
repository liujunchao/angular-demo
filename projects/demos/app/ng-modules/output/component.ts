import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sub-comp',
  template: `
    <div>
      I am a sub component, i can send message to parent component throught
      output eventEmitter, press the button and see what can i do.
      <input
        type="button"
        value="send"
        (click)="messageEvent.emit({ desc: 'hello from sub component' })"
      />
    </div>
  `
})
export class SubComponent {
  @Output()
  messageEvent: EventEmitter<{ desc: string }> = new EventEmitter<{
    desc: string;
  }>();
}

@Component({
  selector: 'ng-demo-component',
  templateUrl: 'template.html'
})
export class DemoComponent {
  message: string;
  messageGot({ desc }) {
    this.message = desc;
  }
}
