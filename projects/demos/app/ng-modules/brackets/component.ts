import {
  Component,
  ChangeDetectionStrategy,
  Input,
  TemplateRef
} from '@angular/core';

@Component({
  selector: 'mwl-calendar-week-view',
  template: `
    <ng-template #defaultTemplate let-weekday="weekday">
      <div class="cal-week-view">today is {{ weekday }}</div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        weekday: weekday
      }"
    >
    </ng-template>
  `
})
export class WeekViewComponent {
  @Input() weekday: string;
  @Input() customTemplate: TemplateRef<any>;
}

@Component({
  selector: 'ng-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html'
})
export class DemoComponent {
  view: string = 'month';
  mycolor: string = 'black';
  day: string = 'friday';

  changeColor() {
    this.mycolor = 'red';
  }

  changeWeekday() {
    this.day = 'thursday';
  }
}
