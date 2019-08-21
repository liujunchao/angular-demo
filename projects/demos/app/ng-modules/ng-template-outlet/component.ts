import { Component, ChangeDetectionStrategy } from '@angular/core'; 

@Component({
  selector: 'ng-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html'
})
export class DemoComponent {
  myContext = {$implicit: 'World', localSk: 'Svet'};
  name:string = "jimmy";
  anotherContext = {name: 'jimmy' ,income : 1800, skills:["c++","javascript"]};
}
