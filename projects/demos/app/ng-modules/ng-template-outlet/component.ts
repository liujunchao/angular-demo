import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  OnInit,
  Input
} from '@angular/core';

@Component({
  selector: 'ng-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html'
})
export class DemoComponent implements OnInit {
  ngOnInit() {
    this.anotherContext.emitter.subscribe(function() {
      alert('hi from emitter');
    });
  }
  myContext = { $implicit: 'World', localSk: 'Svet' };
  name: string = 'jimmy';
  anotherContext = {
    name: 'jimmy',
    income: 1800,
    skills: ['c++', 'javascript'],
    eventClicked: function() {
      alert('event click');
    },
    emitter: new EventEmitter()
  };
}
