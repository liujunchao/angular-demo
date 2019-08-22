import {
  Component,
  Output,
  EventEmitter,
  Directive,
  Input,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[mwlCalendarToday]'
})
export class CalendarTodayDirective {
  /**
   * The current view date
   */
  @Input() viewDate: Date;

  /**
   * Called when the view date is changed
   */
  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();

  constructor() {}

  /**
   * @hidden
   */
  @HostListener('click')
  onClick(): void {
    this.viewDateChange.emit(new Date());
  }
}

@Component({
  selector: 'ng-demo-component',
  templateUrl: 'template.html'
})
export class DemoComponent {
  mydate: Date = new Date(2018, 10, 10);
}
