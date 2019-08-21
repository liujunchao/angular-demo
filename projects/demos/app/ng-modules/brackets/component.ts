import { Component, ChangeDetectionStrategy } from '@angular/core'; 

@Component({
  selector: 'ng-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html'
})
export class DemoComponent {
  view: string = 'month'; 
}
